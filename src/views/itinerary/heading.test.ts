// Vietnamese itinerary H1 (SEO pass 2026-11-15): composed for vi only, the CMS name (slug source) untouched.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { itineraryHeading } from './heading.ts';

// Bay names carry a no-break space; compare as plain text.
const plain = (s: string) => s.replace(/\u00a0/g, ' ');

describe('itineraryHeading', () => {
  it('adds the cruise keyword to the four production vi names, one dash style, lower-case duration', () => {
    assert.equal(plain(itineraryHeading('vi', { name: '2 ngày 1 đêm – Một Thoáng Hạ Long', bay: 'ha-long', duration: 2 })), 'Du thuyền Hạ Long 2 ngày 1 đêm – Một Thoáng Hạ Long');
    assert.equal(plain(itineraryHeading('vi', { name: '3 ngày 2 đêm – Dấu Ấn Hạ Long', bay: 'ha-long', duration: 3 })), 'Du thuyền Hạ Long 3 ngày 2 đêm – Dấu Ấn Hạ Long');
    assert.equal(plain(itineraryHeading('vi', { name: '2 Ngày 1 Đêm - Một Thoáng Lan Hạ', bay: 'lan-ha', duration: 2 })), 'Du thuyền Lan Hạ 2 ngày 1 đêm – Một Thoáng Lan Hạ');
    assert.equal(plain(itineraryHeading('vi', { name: '3 ngày 2 đêm - Dấu Ấn Lan Hạ', bay: 'lan-ha', duration: 3 })), 'Du thuyền Lan Hạ 3 ngày 2 đêm – Dấu Ấn Lan Hạ');
  });

  it('keeps a renamed vi itinerary readable (no duration prefix to strip)', () => {
    assert.equal(plain(itineraryHeading('vi', { name: 'Một Thoáng Hạ Long', bay: 'ha-long', duration: 2 })), 'Du thuyền Hạ Long 2 ngày 1 đêm – Một Thoáng Hạ Long');
  });

  it('returns the CMS name unchanged for every other language and for vi rows without a bay', () => {
    for (const locale of ['en', 'ja', 'fr', 'es', 'de', 'ko'] as const) {
      assert.equal(itineraryHeading(locale, { name: 'The Ha Long Escape – 2 Days 1 Night', bay: 'ha-long', duration: 2 }), 'The Ha Long Escape – 2 Days 1 Night');
    }
    assert.equal(plain(itineraryHeading('vi', { name: '2 ngày 1 đêm – Một Thoáng Hạ Long', bay: null, duration: 2 })), '2 ngày 1 đêm – Một Thoáng Hạ Long');
  });
});
