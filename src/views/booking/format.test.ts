// Phase 2B: locale-aware booking display, outcome copy, payment guard, Japanese guest data and the language
// handoff. EN/VI output must stay exactly what it was; amounts are never changed, only written differently.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import en from '../../messages/en.ts';
import ja from '../../messages/ja.ts';
import vi from '../../messages/vi.ts';
import { formatAmount, formatDate, fromPriceParts, guestsText, outcomeView, paymentAllowed } from './format.ts';
import { handoffQuery, inventoryOf, restorable, switchTarget, takeHandoff, writeHandoff, HANDOFF_KEY, HANDOFF_TTL_MS, type Handoff } from './handoff.ts';
import { buildBookingPayload, buildInquiryBody, buildPaymentInitBody, classifyInitFailure, parsePolicy, type PayloadInput } from './payment.ts';
import { formatPrice, type Guests } from './pricing.ts';
import { initialState, reducer, type State } from './state.ts';
import { validateStep2 } from './validation.ts';

const g = (adults: number, children_6_12 = 0, children_2_5 = 0, infants = 0): Guests => ({ adults, children_6_12, children_2_5, infants });

/** The pre-2B guest string, verbatim (model.ts before phase 2B). */
function legacyGuestsText(s: typeof en.booking.guestShort, x: Partial<Guests>): string {
  const parts: string[] = [];
  const a = x.adults ?? 0, c612 = x.children_6_12 ?? 0, c25 = x.children_2_5 ?? 0, inf = x.infants ?? 0;
  if (a > 0) parts.push(`${a} ${a > 1 ? s.adults : s.adult}`);
  if (c612 > 0) parts.push(`${c612} ${s.child612}`);
  if (c25 > 0) parts.push(`${c25} ${s.child25}`);
  if (inf > 0) parts.push(`${inf} ${inf > 1 ? s.infants : s.infant}`);
  return parts.join(', ');
}

describe('guest counts', () => {
  const mixes = [g(1), g(2), g(2, 1), g(1, 0, 2, 1), g(3, 2, 1, 2), g(0, 0, 0, 1), {}];
  it('EN and VI are byte-identical to the pre-2B strings', () => {
    for (const mix of mixes) {
      assert.equal(guestsText(en.booking, mix), legacyGuestsText(en.booking.guestShort, mix));
      assert.equal(guestsText(vi.booking, mix), legacyGuestsText(vi.booking.guestShort, mix));
    }
    assert.equal(guestsText(en.booking, g(2, 1)), '2 Adults, 1 Child 6-12');
  });
  it('Japanese counts with 名 after the label and joins with 、', () => {
    assert.equal(guestsText(ja.booking, g(2)), '大人2名');
    assert.equal(guestsText(ja.booking, g(2, 1, 0, 1)), '大人2名、子ども（6〜12歳）1名、乳幼児1名');
    assert.ok(!/\d [^\d]/.test(guestsText(ja.booking, g(3, 2, 1, 2))), 'no half-width space between number and label');
  });
});

describe('amounts and dates', () => {
  it('EN and VI amounts are formatPrice, unchanged', () => {
    for (const v of [0, 1, 99.5, 1234.5, 1250, 1234567.891]) {
      assert.equal(formatAmount(v, 'usd', 'en'), formatPrice(v, 'usd'));
      assert.equal(formatAmount(v, 'vnd', 'vi'), formatPrice(v, 'vnd'));
      assert.equal(formatAmount(v, 'usd', 'vi'), formatPrice(v, 'usd'));
    }
    assert.equal(formatAmount(1234.5, 'usd', 'en'), '$1,234.50');
  });
  it('Japanese shows the same USD amount as US$ with ja-JP grouping', () => {
    assert.equal(formatAmount(1250, 'usd', 'ja'), 'US$1,250.00');
    assert.equal(formatAmount(1234.5, 'usd', 'ja'), 'US$1,234.50');
    assert.equal(formatAmount(1234.567, 'usd', 'ja'), 'US$1,234.57', 'same rounding as formatPrice');
    assert.equal(formatAmount(4500000, 'vnd', 'ja'), '4,500,000 VND');
  });
  it('"from" price: EN/VI keep label, amount, unit; Japanese reads US$1,250.00〜 1室あたり', () => {
    assert.deepEqual(fromPriceParts(en.booking, '$1,250.00'), { label: 'From', amount: '$1,250.00', unit: 'per cabin' });
    assert.deepEqual(fromPriceParts(vi.booking, '1.000 VND'), { label: 'Từ', amount: '1.000 VND', unit: 'mỗi cabin' });
    assert.deepEqual(fromPriceParts(ja.booking, formatAmount(1250, 'usd', 'ja')), { label: '', amount: 'US$1,250.00〜', unit: '1室あたり' });
  });
  it('dates: EN and VI unchanged, Japanese 2027年2月15日', () => {
    assert.equal(formatDate('en', '2026-03-04'), '4 Mar 2026');
    assert.equal(formatDate('vi', '2026-03-04'), '04/03/2026');
    assert.equal(formatDate('ja', '2027-02-15'), '2027年2月15日');
    assert.equal(formatDate('ja', ''), '');
    assert.equal(formatDate('ja', 'nonsense'), 'nonsense');
  });
});

describe('result screen', () => {
  it('a request never shows the payment-success copy in Japanese', () => {
    const o = ja.booking.outcome;
    const paid = outcomeView(o, 'success');
    const requested = outcomeView(o, 'requested');
    assert.notEqual(requested.title, paid.title);
    assert.notEqual(requested.message, paid.message);
    assert.match(requested.title, /リクエスト/);
    assert.match(paid.title, /お支払いが完了/);
    assert.equal(outcomeView(o, 'pending').title, o.pendingTitle);
    assert.deepEqual([outcomeView(o, 'error').title, outcomeView(o, 'error').isError], [o.failedTitle, true]);
  });
  it('EN and VI render exactly what they rendered before (known issue: a request reads as a booking success)', () => {
    for (const o of [en.booking.outcome, vi.booking.outcome]) {
      assert.deepEqual(
        [outcomeView(o, 'requested').title, outcomeView(o, 'requested').message, outcomeView(o, 'requested').emblem],
        [o.successTitle, o.successMessage, '✓'],
      );
      assert.deepEqual([outcomeView(o, 'pending').emblem, outcomeView(o, 'error').emblem], ['⧗', '!']);
    }
  });
});

describe('payment guard', () => {
  const policy = (list: string[] | null) => ({ paymentLocales: list });
  it('the CMS list decides; without it en/vi pay as before and ja is request-only', () => {
    assert.equal(paymentAllowed(null, 'en'), true);
    assert.equal(paymentAllowed(null, 'vi'), true);
    assert.equal(paymentAllowed(null, 'ja'), false);
    assert.equal(paymentAllowed(policy(null), 'ja'), false);
    assert.equal(paymentAllowed(policy(['en', 'vi']), 'ja'), false);
    assert.equal(paymentAllowed(policy(['en', 'vi']), 'en'), true);
    assert.equal(paymentAllowed(policy(['en', 'vi', 'ja']), 'ja'), true);
  });
  it('reads payment_locales from the policy endpoint and the refusal code', () => {
    assert.deepEqual(parsePolicy({ success: true, today: '2026-10-27', payment_locales: ['en', 'vi', 3] })?.paymentLocales, ['en', 'vi']);
    assert.equal(parsePolicy({ success: true, today: '2026-10-27' })?.paymentLocales, null);
    assert.equal(classifyInitFailure({ code: 'payment_locale_not_allowed' }), 'paymentLocale');
  });
  it('a Japanese wizard starts request-only; the policy can open or keep it closed; EN starts as before', () => {
    const jaState = initialState('stripe', false);
    assert.deepEqual([jaState.confirmation, jaState.paymentAllowed], ['inquiry', false]);
    assert.equal(reducer(jaState, { type: 'setConfirmation', value: 'direct' }).confirmation, 'inquiry');
    const closed = reducer(jaState, { type: 'policyLoaded', policy: null, paymentAllowed: false });
    assert.equal(closed.confirmation, 'inquiry');
    const opened = reducer(jaState, { type: 'policyLoaded', policy: null, paymentAllowed: true });
    assert.deepEqual([opened.confirmation, opened.paymentAllowed], ['direct', true]);

    const enState = initialState('stripe');
    assert.deepEqual([enState.confirmation, enState.paymentAllowed], ['direct', true]);
    const enChose = reducer(enState, { type: 'setConfirmation', value: 'inquiry' });
    assert.equal(reducer(enChose, { type: 'policyLoaded', policy: null, paymentAllowed: true }).confirmation, 'inquiry', 'en choice kept');
  });
});

describe('locale in the request bodies (bookings.locale for the mailer)', () => {
  const input: PayloadInput = {
    date: '2026-12-26',
    itinerary: { id: '5-7', name: 'Ha Long', cruise_name: 'Green Ruby', destination: 'Ha Long Bay' },
    durationLabel: '2 days',
    guest: { fullName: '山田 太郎', email: 'taro@example.jp', phone: '＋８１ ９０－１２３４－５６７８' },
    rooms: [{ cabinId: 1, name: 'Suite', description: '', unitPrice: 1000, guests: g(2) }],
    amenities: [],
    currency: 'usd',
  };
  it('sends the page locale at the top level, never instead of terms.locale', () => {
    const payload = buildBookingPayload(input);
    const terms = { accepted: true as const, version: '2027-01-01', locale: 'en' as const };
    assert.deepEqual(buildInquiryBody(payload, 'usd', terms, 'ja'), { booking: { ...payload, currency: 'usd' }, terms, locale: 'ja' });
    assert.deepEqual(buildInquiryBody(payload, 'usd'), { booking: { ...payload, currency: 'usd' } }, 'no locale: as before');
    const init = buildPaymentInitBody({ method: 'stripe', booking: payload, currency: 'usd', returnBase: 'https://x/ja/booking', terms, locale: 'ja' });
    assert.equal(init.locale, 'ja');
    assert.equal(init.terms?.locale, 'en');
    assert.equal('locale' in buildPaymentInitBody({ method: 'stripe', booking: payload, currency: 'usd', returnBase: 'r' }), false);
  });
  it('keeps the kanji name and normalises a full-width phone; ASCII phones are unchanged', () => {
    const payload = buildBookingPayload(input);
    assert.equal(payload.full_name, '山田 太郎');
    assert.equal(payload.phone, '+81 90-1234-5678');
    assert.equal(buildBookingPayload({ ...input, guest: { ...input.guest, phone: ' +84 (90) 123.45-67 ' } }).phone, '+84 (90) 123.45-67');
  });
});

describe('Japanese guest validation', () => {
  const msg = { fullNameRequired: 'name', phoneRequired: 'phone', phoneNumeric: 'numeric', emailRequired: 'email', emailInvalid: 'invalid' };
  const ok = (fullName: string, phone: string) => validateStep2({ fullName, phone, email: 'taro@example.jp' }, msg);
  it('accepts names in kanji/kana and international or full-width numbers', () => {
    for (const name of ['山田 太郎', 'やまだ たろう', 'ヤマダ タロウ', '山田　太郎', 'Nguyễn Văn A']) assert.equal(ok(name, '+81 90-1234-5678').valid, true, name);
    for (const phone of ['+81 90-1234-5678', '+81(3)1234-5678', '090-1234-5678', '０９０－１２３４－５６７８', '＋８１ ９０ １２３４ ５６７８', '090ー1234ー5678'])
      assert.equal(ok('山田 太郎', phone).valid, true, phone);
  });
  it('still refuses empty names, letters in phones and a + in the middle', () => {
    assert.equal(ok('   ', '+81 90').fieldErrors.fullName, 'name');
    for (const phone of ['090-abcd-5678', '81+90', '電話', '++81 90']) assert.equal(ok('山田', phone).fieldErrors.phone, 'numeric', phone);
  });
});

describe('language handoff', () => {
  const storage = () => {
    const m = new Map<string, string>();
    return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m };
  };
  const now = 1_800_000_000_000;
  const h: Handoff = {
    v: 1, at: now, inventory: 'en', date: '2026-12-26', itineraryId: 5, cruiseId: 7,
    rooms: [{ cabinId: 24, guests: g(2, 1) }, { cabinId: 25, guests: g(1) }], amenityQty: { 3: 2 },
    guest: { fullName: '山田 太郎', phone: '+81 90-1234-5678', email: 'taro@example.jp' },
  };
  const none = new URLSearchParams();

  it('recognises links to another language\'s booking page only', () => {
    assert.equal(switchTarget('/booking', 'ja'), 'en');
    assert.equal(switchTarget('https://x.test/vi/booking', 'ja'), 'vi');
    assert.equal(switchTarget('/ja/booking', 'en'), 'ja');
    assert.equal(switchTarget('/ja/booking', 'ja'), null, 'own page');
    assert.equal(switchTarget('/', 'ja'), null, 'home');
    assert.equal(switchTarget('/booking/pay', 'ja'), null);
    assert.equal(switchTarget('/booking/pay', 'ja', '/pay'), 'en');
  });
  it('en and ja share the English inventory; vi has its own', () => {
    assert.deepEqual([inventoryOf('en'), inventoryOf('ja'), inventoryOf('vi')], ['en', 'en', 'vi']);
  });
  it('carries date, voyage and first cabin within the inventory, only the date across it', () => {
    assert.equal(handoffQuery(h, 'ja', 'en', none), '?start_at=2026-12-26&cruise_id=7&itinerary_id=5&cabin_id=24');
    assert.equal(handoffQuery(h, 'en', 'ja', none), '?start_at=2026-12-26&cruise_id=7&itinerary_id=5&cabin_id=24');
    assert.equal(handoffQuery(h, 'ja', 'vi', none), '?start_at=2026-12-26');
    assert.equal(handoffQuery(h, 'vi', 'ja', none), '?start_at=2026-12-26');
  });
  it('without a selection, carries the page\'s own prefill query (ids only within the inventory)', () => {
    const q = new URLSearchParams('cabin_id=24&cruise_id=7&start_at=2026-12-26&result=success');
    assert.equal(handoffQuery(null, 'ja', 'en', q), '?start_at=2026-12-26&cruise_id=7&cabin_id=24');
    assert.equal(handoffQuery(null, 'ja', 'vi', q), '?start_at=2026-12-26');
    assert.equal(handoffQuery(null, 'en', 'ja', none), '');
  });
  it('hands over once, never across inventories for ids, and expires', () => {
    const s = storage();
    writeHandoff(s, h);
    const back = takeHandoff(s, now + 1000);
    assert.deepEqual(back, h);
    assert.equal(s.m.has(HANDOFF_KEY), false, 'one use');
    assert.deepEqual(restorable(h, 'en'), { rooms: h.rooms, amenityQty: h.amenityQty, guest: h.guest });
    assert.deepEqual(restorable(h, 'vi'), { rooms: [], amenityQty: {}, guest: h.guest });
    writeHandoff(s, h);
    assert.equal(takeHandoff(s, now + HANDOFF_TTL_MS + 1), null);
    s.setItem(HANDOFF_KEY, '{bad');
    assert.equal(takeHandoff(s, now), null);
    s.setItem(HANDOFF_KEY, JSON.stringify({ ...h, rooms: [{ cabinId: -1, guests: {} }, { cabinId: 2, guests: { adults: 999 } }] }));
    assert.deepEqual(takeHandoff(s, now)?.rooms, [{ cabinId: 2, guests: g(0) }], 'sanitised');
  });
});

describe('wizard prefill on intl pages and after a handoff', () => {
  const cabin = (id: number) => ({ id, name: `C${id}`, summary: null, view: null, capacity: 2, over_capacity_adult: null, over_capacity_child_6_12: null, over_capacity_child_2_5: null, over_capacity_infant: null, area: null, cruise_id: 7, cruise_name: null, min_price: 100, image_url: null, prices: { 2: { 1: 80, 2: 100 } } });
  const it7 = { id: '5-7', itinerary_id: 5, cruise_id: 7, name: 'V', cruise_name: 'S', duration: 2, duration_label: '', destination: '' };
  const withVoyage = (prefill: State['prefill']): State => ({ ...initialState('stripe'), prefill, itinerary: it7, itineraries: [it7] });

  it('EN keeps the old fallback to the first cabin; an exact prefill adds nothing for an unknown id', () => {
    const items = [cabin(1), cabin(2)];
    const en = reducer(withVoyage({ itineraryId: 5, cruiseId: 7, cabinId: 99 }), { type: 'cabinsLoaded', itineraryId: '5-7', items });
    assert.deepEqual(en.rooms.map((r) => r.cabinId), [1]);
    const exact = reducer(withVoyage({ itineraryId: 5, cruiseId: 7, cabinId: 99, exactCabin: true }), { type: 'cabinsLoaded', itineraryId: '5-7', items });
    assert.deepEqual(exact.rooms, []);
    const known = reducer(withVoyage({ itineraryId: 5, cruiseId: 7, cabinId: 2, exactCabin: true }), { type: 'cabinsLoaded', itineraryId: '5-7', items });
    assert.deepEqual(known.rooms.map((r) => [r.cabinId, r.guests.adults]), [[2, 2]]);
  });
  it('restores carried rooms (clamped to the cabin limits) and amenities', () => {
    const prefill = { itineraryId: 5, cruiseId: 7, cabinId: 1, exactCabin: true, rooms: [{ cabinId: 1, guests: g(3, 1) }, { cabinId: 9, guests: g(1) }], amenityQty: { 4: 2, 8: 1 } };
    let st = reducer(withVoyage(null), { type: 'boot', dates: [], date: '2026-12-26', prefill, guest: { fullName: '山田', phone: '+81', email: 'a@b.jp' } });
    st = { ...st, itinerary: it7 };
    st = reducer(st, { type: 'cabinsLoaded', itineraryId: '5-7', items: [cabin(1)] });
    assert.deepEqual(st.rooms.map((r) => [r.cabinId, r.guests]), [[1, g(3, 1)]]);
    st = reducer(st, { type: 'amenitiesLoaded', itineraryId: '5-7', items: [{ id: 4, name: 'A', description: null, price: 10, image_url: null }] });
    assert.deepEqual(st.amenityQty, { 4: 2 });
    assert.equal(st.guest.fullName, '山田');
  });
});
