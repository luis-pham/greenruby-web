// Deposit or full payment and Booking Terms acceptance (rules 1-3 and 8). The server decides and charges;
// these helpers must agree with PaymentPlan.php so the guest sees what will be charged.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildBookingPayload,
  buildInquiryBody,
  buildPaymentInitBody,
  classifyInitFailure,
  dateBefore,
  daysBetween,
  effectivePlan,
  parsePolicy,
  planOptions,
  splitAmount,
  type BookingPolicy,
  type PayloadInput,
} from './payment.ts';
import { BOOKING_TERMS, bookingTermsVersion } from '../legal/booking-terms.ts';

const policy = (over: Partial<BookingPolicy> = {}): BookingPolicy => ({
  depositEnabled: true,
  depositPercent: 30,
  depositMinDays: 45,
  balanceDaysBefore: 30,
  termsRequired: false,
  termsVersion: null,
  today: '2026-10-27',
  ...over,
});

const input: PayloadInput = {
  date: '2026-12-26',
  itinerary: { id: '5-7', name: 'Ha Long 2D1N', cruise_name: 'Green Ruby 1', destination: 'Ha Long Bay' },
  durationLabel: '2 days 1 night',
  guest: { fullName: 'Test Guest', email: 'guest@example.test', phone: '0900000000' },
  rooms: [{ cabinId: 1, name: 'Suite', description: '', unitPrice: 1000, guests: { adults: 2, children_6_12: 0, children_2_5: 0, infants: 0 } }],
  amenities: [],
  currency: 'usd',
};

describe('booking policy', () => {
  it('reads the policy endpoint and treats anything else as "switches off"', () => {
    assert.deepEqual(
      parsePolicy({ success: true, deposit_enabled: true, deposit_percent: 30, deposit_min_days: 45, balance_days_before: 30, terms_required: true, terms_version: '2027-01-01', today: '2026-10-27' }),
      policy({ termsRequired: true, termsVersion: '2027-01-01' }),
    );
    assert.equal(parsePolicy(null), null);
    assert.equal(parsePolicy({ success: false }), null);
    assert.equal(parsePolicy({ success: true, deposit_enabled: 'yes', today: '2026-10-27' })?.depositEnabled, false);
  });

  it('counts calendar days without timezone drift', () => {
    assert.equal(daysBetween('2026-10-27', '2026-11-26'), 30);
    assert.equal(daysBetween('2026-10-27', '2026-10-26'), -1);
    assert.equal(daysBetween('2027-03-01', '2027-03-31'), 30); // across the end of February
    assert.equal(dateBefore('2026-12-26', 30), '2026-11-26');
    assert.equal(dateBefore('2027-03-01', 30), '2027-01-30');
  });

  it('offers a deposit only more than 45 days before departure (decision 2)', () => {
    assert.equal(planOptions(policy({ depositEnabled: false }), '2026-12-26'), null);
    assert.equal(planOptions(null, '2026-12-26'), null);
    assert.equal(planOptions(policy(), ''), null);
    assert.deepEqual(planOptions(policy(), '2026-11-27'), ['full']); // 31 days
    assert.deepEqual(planOptions(policy(), '2026-12-11'), ['full']); // exactly 45 days
    assert.deepEqual(planOptions(policy(), '2026-12-12'), ['deposit', 'full']); // 46 days
    assert.deepEqual(planOptions(policy(), '2026-10-27'), ['full']); // today
  });

  it('defaults to the deposit and falls back to full payment when a deposit is not allowed', () => {
    assert.equal(effectivePlan(['deposit', 'full'], 'deposit'), 'deposit');
    assert.equal(effectivePlan(['deposit', 'full'], 'full'), 'full');
    assert.equal(effectivePlan(['full'], 'deposit'), 'full');
    assert.equal(effectivePlan(null, 'deposit'), undefined);
  });

  it('splits amounts like the server: deposit rounded, balance is the exact remainder (rule 3)', () => {
    assert.deepEqual(splitAmount(1000, 'usd', 'deposit', 30), { dueNow: 300, balance: 700 });
    assert.deepEqual(splitAmount(1234.57, 'usd', 'deposit', 30), { dueNow: 370.37, balance: 864.2 });
    assert.deepEqual(splitAmount(1234567, 'vnd', 'deposit', 30), { dueNow: 370370, balance: 864197 });
    assert.deepEqual(splitAmount(1234.57, 'usd', 'full', 30), { dueNow: 1234.57, balance: 0 });
  });
});

describe('request bodies', () => {
  const booking = buildBookingPayload(input);
  const base = { method: 'stripe' as const, booking, currency: 'usd' as const, returnBase: 'https://example.test/booking' };

  it('are unchanged while the switches are off (backwards compatible)', () => {
    const body = buildPaymentInitBody(base);
    assert.deepEqual(Object.keys(body).sort(), ['amount', 'booking', 'method', 'return_base']);
    assert.deepEqual(Object.keys(buildInquiryBody(booking, 'usd')), ['booking']);
  });

  it('carry the plan and the accepted terms version when the policy asks for them', () => {
    const terms = { accepted: true, version: '2027-01-01', locale: 'en' } as const;
    const body = buildPaymentInitBody({ ...base, plan: 'deposit', terms });
    assert.equal(body.payment_plan, 'deposit');
    assert.deepEqual(body.terms, terms);
    assert.deepEqual(buildInquiryBody(booking, 'usd', terms).terms, terms);
    // The charged amount is always computed by the server; the body still sends the estimate only.
    assert.equal(body.amount, 1000);
  });

  it('map server refusals to messages', () => {
    assert.equal(classifyInitFailure({ code: 'terms_required' }), 'terms');
    assert.equal(classifyInitFailure({ code: 'terms_version_mismatch' }), 'termsUpdated');
    assert.equal(classifyInitFailure({ code: 'terms_not_configured' }), 'unavailable');
    assert.equal(classifyInitFailure({ code: 'departure_date_unknown' }), 'departure');
    assert.equal(classifyInitFailure({ code: 'departure_date_past' }), 'departure');
    assert.equal(classifyInitFailure({ code: 'payment_init_error' }), 'generic');
  });
});

describe('terms version', () => {
  it('is the effective date once published, and nothing while a draft', () => {
    assert.equal(bookingTermsVersion({ status: 'draft', effectiveDate: null, updated: '2026-10-26' }), null);
    assert.equal(bookingTermsVersion({ status: 'published', effectiveDate: '2027-01-01', updated: '2026-12-01' }), '2027-01-01');
    if (BOOKING_TERMS.status === 'draft') assert.equal(bookingTermsVersion(), null);
  });
});
