import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BOOKING_TERMS, bookingTerms, bookingTermsLinked } from './booking-terms.ts';

const paths = { privacy: '/privacy-policy', contact: '/contact' };

test('EN and VI have the same 20 sections, in the same order, with unique anchors', () => {
  const en = bookingTerms.en.sections.map((s) => s.id);
  assert.equal(en.length, 20);
  assert.deepEqual(bookingTerms.vi.sections.map((s) => s.id), en);
  assert.equal(new Set(en).size, 20);
  for (const id of en) assert.match(id, /^[a-z-]+$/);
});

test('commercial terms match the published FAQ and Brand Facts', () => {
  const en = bookingTerms.en.sections.map((s) => s.html(paths)).join(' ');
  const vi = bookingTerms.vi.sections.map((s) => s.html(paths)).join(' ');
  assert.match(en, /30% of the total booking value/);
  assert.match(en, /30 calendar days before departure/);
  assert.match(vi, /30% tổng giá trị đặt chỗ/);
  for (const row of ['30 calendar days or more', '15–29 calendar days', '50% of the total booking value', '7–14 calendar days', '75% of the total booking value', '0–6 calendar days'])
    assert.ok(en.includes(row), row);
  for (const row of ['Từ 30 ngày trở lên', 'Từ 15 đến 29 ngày', 'Từ 7 đến 14 ngày', 'Từ 0 đến 6 ngày']) assert.ok(vi.includes(row), row);
  assert.match(en, /amended up to two times/);
  assert.match(vi, /tối đa hai lần/);
});

test('TPX rules: optional full payment, real checkout methods, weather options, no blanket liability waiver', () => {
  for (const c of Object.values(bookingTerms)) {
    const text = c.sections.map((s) => s.html(paths)).join(' ');
    for (const provider of ['Stripe', 'PayPal', 'SePay', 'VietQR']) assert.ok(text.includes(provider), provider);
    assert.doesNotMatch(text, /e-wallet|ví điện tử/i); // not offered at checkout
    // Cash and card only for onboard extras, at check-out (owner, 27/10).
    assert.equal((text.match(/cash|tiền mặt/gi) ?? []).length, 1);
  }
  const en = bookingTerms.en.sections.map((s) => s.html(paths)).join(' ');
  const vi = bookingTerms.vi.sections.map((s) => s.html(paths)).join(' ');
  assert.match(en, /Onboard extras .* can be paid in cash or by card at check-out/);
  assert.match(vi, /dịch vụ phát sinh trên tàu .* tiền mặt hoặc thẻ khi làm thủ tục trả phòng/);
  assert.match(en, /choose to pay the full amount/);
  assert.match(vi, /chọn thanh toán toàn bộ/);
  assert.match(en, /change of departure date<\/strong> or a <strong>full refund of the affected cruise booking/);
  assert.match(vi, /đổi ngày khởi hành<\/strong> hoặc <strong>hoàn toàn bộ số tiền/);
  assert.match(en, /fair adjustment/);
  assert.match(en, /force majeure\)\. This does not affect the date change and refund options/);
  assert.match(vi, /bất khả kháng\)\. Quy định này không ảnh hưởng/);
  assert.match(en, /Nothing in these terms excludes or limits liability where such exclusion or limitation is prohibited by law/);
});

test('operator identity and ship routes are stated correctly', () => {
  const en = bookingTerms.en.sections.map((s) => s.html(paths)).join(' ');
  assert.match(bookingTerms.en.operator, /TPX JOINT STOCK COMPANY.*5702096485/);
  assert.match(bookingTerms.vi.operator, /5702096485/);
  assert.match(en, /Green Ruby 1:<\/strong> overnight cruises in Ha Long Bay/);
  assert.match(en, /Green Ruby 2:<\/strong> overnight cruises in Lan Ha Bay/);
});

test('no wording implies the fleet is already sailing', () => {
  for (const c of Object.values(bookingTerms)) {
    const text = [c.heroIntro, c.introHtml, ...c.sections.map((s) => s.html(paths))].join(' ');
    assert.doesNotMatch(text, /since 20\d\d|thousands of guests|award-winning|hàng nghìn khách|từ năm 20\d\d/i);
  }
});

test('draft terms are not linked or dated until approved', () => {
  assert.equal(bookingTermsLinked('draft'), false);
  assert.equal(bookingTermsLinked('published'), true);
  if (BOOKING_TERMS.status === 'draft') assert.equal(BOOKING_TERMS.effectiveDate, null);
  else assert.ok(BOOKING_TERMS.effectiveDate, 'a published version needs its approved effective date');
});

test('metadata stays within search-result lengths', () => {
  for (const c of Object.values(bookingTerms)) {
    assert.ok(c.seoTitle.length <= 60, c.seoTitle);
    assert.ok(c.seoDescription.length <= 160, c.seoDescription);
  }
});
