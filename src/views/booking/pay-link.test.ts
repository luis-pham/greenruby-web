// Payment link page (/booking/pay): parsing the CMS answer, errors and the amount due now.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { dueNow, linkError, parseLinkInfo } from './pay-link.ts';

const bookingLink = {
  success: true,
  purpose: 'booking',
  booking: { code: 'BK1', full_name: 'Guest', itinerary_name: 'Ha Long 2D1N', cruise_name: 'Green Ruby 1', departure_date: '2026-12-26', currency: 'usd', total_amount: 1000, amount_paid: 0, balance_amount: 0, balance_due_date: null },
  plans: [
    { plan: 'deposit', amount_due_now: 300, balance_amount: 700, balance_due_date: '2026-11-26' },
    { plan: 'full', amount_due_now: 1000, balance_amount: 0, balance_due_date: null },
  ],
  methods: ['stripe', 'paypal', 'cash'],
  terms_required: true,
  terms_version: '2027-03-01',
};

describe('payment link page', () => {
  it('reads a booking link and ignores unknown methods', () => {
    const info = parseLinkInfo(bookingLink);
    assert.ok(info);
    assert.equal(info.purpose, 'booking');
    assert.equal(info.booking.voyage, 'Ha Long 2D1N · Green Ruby 1');
    assert.deepEqual(info.methods, ['stripe', 'paypal']);
    assert.equal(info.termsRequired, true);
    assert.equal(dueNow(info, 'deposit'), 300);
    assert.equal(dueNow(info, 'full'), 1000);
  });

  it('charges the balance on a balance link, whatever plan is selected', () => {
    const info = parseLinkInfo({ ...bookingLink, purpose: 'balance', plans: [], terms_required: false, booking: { ...bookingLink.booking, amount_paid: 300, balance_amount: 700 } });
    assert.ok(info);
    assert.equal(dueNow(info, 'full'), 700);
    assert.equal(info.termsRequired, false);
  });

  it('maps refusals to messages', () => {
    assert.equal(parseLinkInfo({ success: false }), null);
    assert.equal(linkError(410, { code: 'link_invalid' }), 'invalid');
    assert.equal(linkError(409, { code: 'nothing_due' }), 'nothingDue');
    assert.equal(linkError(503, { code: 'terms_not_configured' }), 'unavailable');
    assert.equal(linkError(500, null), 'generic');
  });
});
