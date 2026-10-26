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
  assert.match(en, /Onboard extras .* can be paid in cash \(VND or USD\) or by card at check-out/);
  assert.match(vi, /dịch vụ phát sinh trên tàu .* tiền mặt \(VND hoặc USD\) hoặc thẻ khi làm thủ tục trả phòng/);
  assert.match(en, /choose to pay the full amount/);
  assert.match(vi, /chọn thanh toán toàn bộ/);
  assert.match(en, /change of departure date<\/strong> or a <strong>full refund of the affected cruise booking/);
  assert.match(vi, /đổi ngày khởi hành<\/strong> hoặc <strong>hoàn toàn bộ số tiền/);
  assert.match(en, /fair adjustment/);
  assert.match(en, /force majeure\)\. This does not affect the date change and refund options/);
  assert.match(vi, /bất khả kháng\)\. Quy định này không ảnh hưởng/);
  assert.match(en, /Nothing in these terms excludes or limits liability where such exclusion or limitation is prohibited by law/);
});

test('owner-confirmed operations (27/10): roles, lounge, tender, contact address', () => {
  const en = bookingTerms.en.sections.map((s) => s.html(paths)).join(' ');
  const vi = bookingTerms.vi.sections.map((s) => s.html(paths)).join(' ');
  assert.match(en, /Operations Manager or the Head of Service/);
  assert.match(vi, /Quản lý vận hành hoặc Trưởng bộ phận phục vụ/);
  assert.doesNotMatch(en + vi, /Cruise Manager|Guest Relations|another pier|bến khác/);
  assert.match(en, /both Green Ruby 1 and Green Ruby 2 .*Green Ruby Lounge, No\. 27, Terminal Building 2/);
  assert.match(en, /by tender/);
  assert.match(vi, /tàu trung chuyển/);
  assert.match(en, /Contact address: Green Ruby Lounge, No\. 27, Terminal Building 2, Tuan Chau International Passenger Port, Quang Ninh, Vietnam/);
  assert.match(vi, /Địa chỉ liên hệ: Green Ruby Lounge, Số 27, Nhà ga số 2/);
});

test('TPX decisions of 27/10: 45-day deposit rule, balance process, non-payment, team bookings, refunds, groups, effective date', () => {
  const en = bookingTerms.en.sections.map((s) => s.html(paths)).join(' ');
  const vi = bookingTerms.vi.sections.map((s) => s.html(paths)).join(' ');
  // Decision 2
  assert.match(en, /more than 45 calendar days before departure<\/strong>, a deposit of <strong>30% of the total booking value/);
  assert.match(en, /45 calendar days or less before departure, full payment is required/);
  assert.match(vi, /hơn 45 ngày theo lịch<\/strong>, khoản đặt cọc/);
  assert.doesNotMatch(en + vi, /more than 30 calendar days|hơn 30 ngày theo lịch/);
  assert.deepEqual(bookingTerms.en.glance.items.map(([k]) => k).slice(0, 3), ['More than 45 days before departure', 'Balance', '45 days or less before departure']);
  // Decision 3: request ~D-45, due D-30, written notice + 48 hours, never automatic
  assert.match(en, /About 45 days before departure we will email you a secure link to pay the balance/);
  assert.match(en, /written notice and allow a further <strong>48 hours<\/strong>/);
  assert.match(en, /We never cancel a booking automatically/);
  assert.match(vi, /48 giờ<\/strong>.*không bao giờ tự động hủy/);
  // Decision 4: at most the deposit, nothing more, ordinary rights unaffected
  assert.match(en, /retain up to the deposit already received \(at most 30% of the total booking value\), and no further cancellation charge/);
  assert.match(en, /This does not affect your own right to cancel under section 5/);
  assert.match(vi, /giữ lại tối đa khoản đặt cọc đã nhận \(không quá 30% tổng giá trị đặt chỗ\)/);
  // Decision 6: same rules, guest accepts personally through a secure link
  assert.match(en, /same deposit and payment rules as bookings made on our website/);
  assert.match(en, /accept these terms yourself and pay/);
  assert.match(vi, /tự xác nhận đồng ý với các điều khoản này/);
  // Decision 5 and 7
  assert.match(en, /Refunds are approved by our finance team/);
  assert.match(en, /not available through our standard online checkout/);
  assert.match(vi, /không áp dụng quy trình thanh toán trực tuyến thông thường/);
  // Decision 1
  assert.match(en, /take effect on the date Green Ruby Cruises first accepts binding, paid online bookings/);
  assert.match(bookingTerms.en.effectivePending, /first accepts paid online bookings/);
  assert.match(bookingTerms.vi.effectivePending, /bắt đầu nhận đặt chỗ trực tuyến có thanh toán/);
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
