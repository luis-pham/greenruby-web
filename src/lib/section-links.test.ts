import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { homePath, sectionPath } from './i18n.ts';
import { homeHref, sectionHref } from './section-links.ts';

describe('section links (phase 2B)', () => {
  it('en/vi: exactly sectionPath/homePath', () => {
    for (const locale of ['en', 'vi'] as const) {
      for (const section of ['itinerary', 'faq', 'contact', 'booking', 'privacyPolicy'] as const) assert.equal(sectionHref(locale, section, undefined), sectionPath(locale, section));
      assert.equal(homeHref(locale, undefined), homePath(locale));
    }
  });

  it('ja: its own page only when public, else English', () => {
    assert.equal(sectionHref('ja', 'itinerary', ['itinerary']), '/ja/itinerary');
    assert.equal(sectionHref('ja', 'faq', ['itinerary']), '/faq');
    assert.equal(sectionHref('ja', 'faq', undefined), '/faq');
    assert.equal(sectionHref('ja', 'privacyPolicy', ['privacyPolicy']), sectionPath('ja', 'privacyPolicy'), 'sections without a ja tree: as before (English)');
    assert.equal(homeHref('ja', ['home']), '/ja');
    assert.equal(homeHref('ja', []), '/');
  });
});
