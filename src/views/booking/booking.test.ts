// Unit tests for the booking logic. Run with `npm test` (Node's built-in runner, native TS stripping).
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildBookingPayload,
  buildInquiryBooking,
  buildPaymentInitBody,
  classifyInitFailure,
  methodSupportsCurrency,
  outcomeFromStatus,
  parseReturnParams,
  pollPaymentStatus,
  type PayloadInput,
} from './payment.ts';
import { calculateCabinPrice, displayCabinPrice, formatPrice, guestLimits, normalizePriceMatrix, toCabinPricing, type Guests } from './pricing.ts';
import { validateStep1, validateStep2 } from './validation.ts';

const g = (adults: number, children_6_12 = 0, children_2_5 = 0, infants = 0): Guests => ({ adults, children_6_12, children_2_5, infants });

// Imperial Suite as returned by /api/booking/cabins?cruise_id=3&duration=3
const imperial = toCabinPricing(
  { capacity: 3, over_capacity_adult: 3, over_capacity_child_6_12: 0, over_capacity_child_2_5: 0, over_capacity_infant: 0, prices: { '3': { '1': 100, '2': 100, '3': 6000 } } },
  3,
);
const deluxe = toCabinPricing({ capacity: 2, over_capacity_adult: 0, prices: { '2': { '1': 80, '2': 100 } } }, 2);

describe('pricing', () => {
  it('normalizes the price matrix, including Laravel empty arrays', () => {
    assert.deepEqual(normalizePriceMatrix([]), {});
    assert.deepEqual(normalizePriceMatrix({ '2': { '1': '80', '2': 100 } }), { 2: { 1: 80, 2: 100 } });
  });

  it('applies capacity defaults', () => {
    assert.deepEqual(guestLimits(deluxe), { adults: 3, children_6_12: 2, children_2_5: 2, infants: 2 });
    assert.deepEqual(guestLimits(imperial), { adults: 3, children_6_12: 3, children_2_5: 3, infants: 3 });
    assert.equal(toCabinPricing({ capacity: 0 }, null).capacity, 2);
    assert.equal(toCabinPricing({ capacity: 0 }, null).duration, 2);
  });

  it('uses the matrix price up to capacity', () => {
    const r = calculateCabinPrice(deluxe, g(2), 'usd');
    assert.ok(r.success);
    assert.equal(r.price, 100);
  });

  it('infants are free and not counted', () => {
    const r = calculateCabinPrice(deluxe, g(1, 0, 0, 2), 'usd');
    assert.ok(r.success && r.price === 80);
  });

  it('pro-rates the full-cabin price when a guest count has no price', () => {
    const cabin = toCabinPricing({ capacity: 2, prices: { '2': { '2': 150 } } }, 2);
    const r = calculateCabinPrice(cabin, g(1), 'usd');
    assert.ok(r.success && r.price === 75);
  });

  it('charges extra guests above capacity at 100/75/50%', () => {
    // capacity 2, base 100 → 50 per person. 3 adults + 1 child 6–12 + 1 child 2–5:
    // base 100 + 1 adult 50 + child 37.5 + child 25 = 212.5
    const cabin = toCabinPricing({ capacity: 2, over_capacity_adult: 3, prices: { '2': { '2': 100 } } }, 2);
    const r = calculateCabinPrice(cabin, g(3, 1, 1), 'usd');
    assert.ok(r.success);
    assert.equal(r.price, 212.5);
    assert.deepEqual(r.breakdown.exceeded, { adults: 1, children_6_12: 1, children_2_5: 1 });
  });

  it('fills the base with adults first, then older children', () => {
    const cabin = toCabinPricing({ capacity: 2, prices: { '2': { '2': 100 } } }, 2);
    // 1 adult + 2 children 6–12 + 1 child 2–5: base holds adult + one 6–12 → extras 37.5 + 25
    const r = calculateCabinPrice(cabin, g(1, 2, 1), 'usd');
    assert.ok(r.success && r.price === 162.5);
  });

  it('rejects guests over the limits and empty cabins', () => {
    assert.equal(calculateCabinPrice(deluxe, g(4), 'usd').success, false);
    assert.equal(calculateCabinPrice(deluxe, g(0, 0, 0, 1), 'usd').success, false);
    assert.equal(calculateCabinPrice(imperial, g(1, 4), 'usd').success, false);
  });

  it('fails without a base price above capacity', () => {
    const cabin = toCabinPricing({ capacity: 2, prices: { '2': { '1': 80 } } }, 2);
    const r = calculateCabinPrice(cabin, g(3), 'usd');
    assert.equal(r.success, false);
  });

  it('rounds VND to whole units and USD to cents', () => {
    const cabin = toCabinPricing({ capacity: 3, prices: { '2': { '3': 1000 } } }, 2);
    const usd = calculateCabinPrice(cabin, g(1), 'usd');
    const vnd = calculateCabinPrice(cabin, g(1), 'vnd');
    assert.ok(usd.success && usd.price === 333.33);
    assert.ok(vnd.success && vnd.price === 333);
  });

  it('falls back to the "from" price when the guest mix is invalid', () => {
    assert.equal(displayCabinPrice(deluxe, g(0), 80, 'usd'), 80);
    assert.equal(displayCabinPrice(deluxe, g(2), 80, 'usd'), 100);
  });

  it('formats like the Laravel page', () => {
    assert.equal(formatPrice(1234.5, 'usd'), '$1,234.50');
    assert.equal(formatPrice(4500000, 'vnd'), '4.500.000 VND');
  });
});

describe('validation', () => {
  const m1 = { dateRequired: 'date', voyageRequired: 'voyage', cabinRequired: 'cabin', guestPerCabin: 'guests' };
  const m2 = { fullNameRequired: 'name', phoneRequired: 'phone', phoneNumeric: 'numeric', emailRequired: 'email', emailInvalid: 'invalid' };

  it('step 1 requires a voyage, a cabin and a guest per cabin', () => {
    assert.deepEqual(validateStep1({ date: '', itineraryId: null, rooms: [] }, m1).fieldErrors, { date: 'date', voyage: 'voyage', cabin: 'cabin' });
    const r = validateStep1({ date: '2026-11-01', itineraryId: '1-3', rooms: [{ name: 'Suite', guests: g(0) }, { name: 'Deluxe', guests: g(0, 0, 0, 1) }] }, m1);
    assert.deepEqual(r.fieldErrors, { cabin_0: 'Suite: guests' });
  });

  it('step 2 checks name, phone and email', () => {
    assert.deepEqual(validateStep2({ fullName: ' ', phone: '', email: '' }, m2).fieldErrors, { fullName: 'name', phone: 'phone', email: 'email' });
    assert.deepEqual(validateStep2({ fullName: 'A', phone: '09-12 abc', email: 'x@y' }, m2).fieldErrors, { phone: 'numeric', email: 'invalid' });
    assert.equal(validateStep2({ fullName: 'A', phone: '+84 (90) 123.45-67', email: 'a@b.co' }, m2).valid, true);
  });
});

describe('payloads', () => {
  const input: PayloadInput = {
    date: '2026-03-04',
    itinerary: { id: '1-3', name: 'Ha Long Bay Discovery', cruise_name: 'Green Ruby 1', destination: 'Ha Long bay, Sung Sot Cave' },
    durationLabel: '3 days / 2 nights',
    guest: { fullName: ' Jane Doe ', email: 'jane@example.com ', phone: '+84 90 000 0000' },
    rooms: [
      { cabinId: 24, name: 'Imperial Suite', description: 'Max 3 guests', unitPrice: 100, guests: g(2, 0, 0, 1) },
      { cabinId: 8, name: 'Serenity Deluxe', description: '', unitPrice: 80, guests: g(1) },
    ],
    amenities: [
      { id: 58, name: 'Insurance', unitPrice: 10, quantity: 2 },
      { id: 59, name: 'Beverages', unitPrice: 20, quantity: 0 },
    ],
    currency: 'usd',
  };

  it('builds the booking object with ids, quantities and guest counts', () => {
    const p = buildBookingPayload(input);
    assert.equal(p.itinerary_id, '1-3');
    assert.equal(p.destination, 'Ha Long bay');
    assert.equal(p.full_name, 'Jane Doe');
    assert.equal(p.email, 'jane@example.com');
    assert.equal(p.guests_total, 4);
    assert.deepEqual(p.cabins[0], {
      cabin_name: 'Imperial Suite',
      cabin_description: 'Max 3 guests',
      unit_price: 100,
      quantity: 1,
      adults: 2,
      children_6_12: 0,
      children_2_5: 0,
      infants: 1,
      total_price: 100,
      cabin_id: 24,
    });
    assert.deepEqual(p.amenities, [{ amenity_name: 'Insurance', amenity_id: 58, unit_price: 10, quantity: 2, total_price: 20 }]);
    assert.equal(p.subtotal_cabins, 180);
    assert.equal(p.subtotal_amenities, 20);
    assert.equal(p.total_amount, 200);
  });

  it('inquiry adds the page currency', () => {
    assert.equal(buildInquiryBooking(buildBookingPayload(input), 'usd').currency, 'usd');
  });

  it('payment init sends method, amount, return_base and booking; currency only without cabin ids', () => {
    const booking = buildBookingPayload(input);
    const body = buildPaymentInitBody({ method: 'stripe', booking, currency: 'usd', returnBase: 'https://greenrubycruises.com/booking' });
    assert.deepEqual(Object.keys(body).sort(), ['amount', 'booking', 'method', 'return_base']);
    assert.equal(body.amount, 200);
    assert.equal(body.return_base, 'https://greenrubycruises.com/booking');
    const noIds = buildBookingPayload({ ...input, rooms: input.rooms.map((r) => ({ ...r, cabinId: null })) });
    assert.equal(buildPaymentInitBody({ method: 'sepay', booking: noIds, currency: 'vnd', returnBase: '/vi/booking' }).currency, 'vnd');
  });

  it('never sends an amount below the API minimum', () => {
    const booking = buildBookingPayload({ ...input, rooms: input.rooms.map((r) => ({ ...r, unitPrice: 0 })), amenities: [] });
    assert.equal(buildPaymentInitBody({ method: 'paypal', booking, currency: 'usd', returnBase: '/booking' }).amount, 1);
  });

  it('knows which methods take which currency', () => {
    assert.equal(methodSupportsCurrency('stripe', 'usd'), true);
    assert.equal(methodSupportsCurrency('paypal', 'vnd'), false);
    assert.equal(methodSupportsCurrency('sepay', 'vnd'), true);
    assert.equal(methodSupportsCurrency('sepay', 'usd'), false);
    assert.equal(classifyInitFailure({ code: 'currency_method_mismatch', reason: 'usd_only' }), 'usd_only');
    assert.equal(classifyInitFailure({ code: 'amount_calculation_failed' }), 'amount');
    assert.equal(classifyInitFailure(null), 'generic');
  });
});

describe('payment return', () => {
  const params = (q: string) => new URLSearchParams(q);

  it('parses the callback query, with st as a token fallback', () => {
    assert.equal(parseReturnParams(params('cabin_id=24')), null);
    assert.deepEqual(parseReturnParams(params('token=abc&result=success&tx=tx_1&method=stripe')), { result: 'success', tx: 'tx_1', token: 'abc', method: 'stripe' });
    assert.equal(parseReturnParams(params('st=zz&result=cancel&tx=tx_1'))?.token, 'zz');
  });

  const noSleep = () => Promise.resolve();

  it('polls until the payment succeeds', async () => {
    const seen: number[] = [];
    const statuses = ['pending', 'pending', 'succeeded'];
    const out = await pollPaymentStatus(async (n) => (seen.push(n), { success: true, status: statuses[n - 1] }), { sleep: noSleep });
    assert.equal(out, 'success');
    assert.deepEqual(seen, [1, 2, 3]);
  });

  it('stops on failure and reports pending after 30 attempts', async () => {
    assert.equal(await pollPaymentStatus(async () => ({ success: true, status: 'canceled' }), { sleep: noSleep }), 'error');
    let calls = 0;
    assert.equal(await pollPaymentStatus(async () => (calls++, { success: true, status: 'pending' }), { sleep: noSleep }), 'pending');
    assert.equal(calls, 30);
  });

  it('retries network errors and gives up with an error', async () => {
    let calls = 0;
    const out = await pollPaymentStatus(
      async () => {
        calls++;
        throw new Error('offline');
      },
      { sleep: noSleep },
    );
    assert.equal(out, 'error');
    assert.equal(calls, 30);
  });

  it('maps a single status check', () => {
    assert.equal(outcomeFromStatus(null), 'error');
    assert.equal(outcomeFromStatus({ success: true }), 'pending');
    assert.equal(outcomeFromStatus({ success: true, status: 'succeeded' }), 'success');
    assert.equal(outcomeFromStatus({ success: true, status: 'canceled' }), 'error');
  });
});
