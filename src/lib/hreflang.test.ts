// hreflang and language switcher (phase 1D-b): EN/VI output identical to before, intl members only when open,
// reciprocal sets, no switcher entry for a language without a translation.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { OpenAlternates } from './api/contract.ts';
import { hreflangPaths, ogAlternates, switcherLinks } from './hreflang.ts';
import type { Locale } from './i18n.ts';

/** The pre-1D-b formula from seo.ts, kept verbatim as the reference. */
function before(locale: 'en' | 'vi', path: string, alternatePath?: string): Record<string, string> {
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  return alternatePath
    ? { [locale]: path, [other]: alternatePath, 'x-default': locale === 'en' ? path : alternatePath }
    : { [locale]: path, 'x-default': path };
}
const ordered = (map: Record<string, string>) => Object.entries(map);

const EN = '/cruise/green-ruby-1-3.html';
const VI = '/vi/du-thuyen/green-ruby-1-1.html';
const JA = '/ja/cruise/green-ruby-1-1003.html';
const group = (...langs: ('en' | 'vi' | 'ja')[]): OpenAlternates => ({
  entries: langs.map((lang) => ({ lang, path: { en: EN, vi: VI, ja: JA }[lang] })),
  xDefault: langs.includes('en') ? EN : langs.includes('vi') ? VI : JA,
});

describe('EN/VI pages', () => {
  it('without intl members: exactly the pre-1D-b output, keys in the same order', () => {
    for (const [locale, path, alt] of [['en', EN, VI], ['vi', VI, EN], ['en', EN, undefined], ['vi', VI, undefined]] as const) {
      assert.deepEqual(ordered(hreflangPaths(locale, path, alt)), ordered(before(locale, path, alt)));
      assert.deepEqual(ordered(hreflangPaths(locale, path, alt, undefined)), ordered(before(locale, path, alt)));
      // A CMS group with only EN/VI members changes nothing either.
      const legacy = alt ? group('en', 'vi') : group(locale);
      assert.deepEqual(ordered(hreflangPaths(locale, path, alt, legacy)), ordered(before(locale, path, alt)));
    }
  });

  it('an open ja member is added before x-default when the resolver lists the same EN/VI group', () => {
    assert.deepEqual(ordered(hreflangPaths('en', EN, VI, group('en', 'vi', 'ja'))), [['en', EN], ['vi', VI], ['ja', JA], ['x-default', EN]]);
    assert.deepEqual(ordered(hreflangPaths('vi', VI, EN, group('en', 'vi', 'ja'))), [['vi', VI], ['en', EN], ['ja', JA], ['x-default', EN]]);
    assert.deepEqual(ordered(hreflangPaths('en', EN, undefined, group('en', 'ja'))), [['en', EN], ['ja', JA], ['x-default', EN]]);
  });

  it('a resolver group that disagrees with the legacy pair keeps the legacy output (no one-sided ja link)', () => {
    // Legacy says EN↔VI, the resolver lost VI (e.g. unpublished): no ja added rather than a non-reciprocal set.
    assert.deepEqual(hreflangPaths('en', EN, VI, group('en', 'ja')), before('en', EN, VI));
    assert.deepEqual(hreflangPaths('en', EN, VI, { ...group('en', 'vi', 'ja'), xDefault: null }), before('en', EN, VI));
  });
});

describe('intl pages', () => {
  it('render the resolver group, their own entry at the canonical path, x-default from the CMS', () => {
    assert.deepEqual(hreflangPaths('ja', JA, undefined, group('en', 'vi', 'ja')), { en: EN, vi: VI, ja: JA, 'x-default': EN });
    assert.deepEqual(hreflangPaths('ja', JA, '/ignored', group('vi', 'ja')), { vi: VI, ja: JA, 'x-default': VI });
  });

  it('only themselves when the CMS lists no group (or the page itself is not in it)', () => {
    assert.deepEqual(hreflangPaths('ja', JA, '/ignored'), { ja: JA });
    assert.deepEqual(hreflangPaths('ja', JA, undefined, group('en', 'vi')), { ja: JA });
  });

  it('every member renders the identical set (reciprocal)', () => {
    const g = group('en', 'vi', 'ja');
    const en = hreflangPaths('en', EN, VI, g);
    const vi = hreflangPaths('vi', VI, EN, g);
    const ja = hreflangPaths('ja', JA, undefined, g);
    const sorted = (m: Record<string, string>) => Object.entries(m).sort();
    assert.deepEqual(sorted(en), sorted(ja));
    assert.deepEqual(sorted(vi), sorted(ja));
  });
});

describe('og:locale:alternate', () => {
  it('the other languages of the set, by og locale', () => {
    assert.deepEqual(ogAlternates('en', before('en', EN, VI)), ['vi_VN']);
    assert.deepEqual(ogAlternates('en', before('en', EN)), []);
    assert.deepEqual(ogAlternates('ja', { en: EN, vi: VI, ja: JA, 'x-default': EN }), ['en_US', 'vi_VN']);
  });
});

describe('language switcher', () => {
  it('EN/VI: unchanged (the other language at alternateHref) while no intl member is open', () => {
    assert.deepEqual(switcherLinks('en', VI), { vi: VI });
    assert.deepEqual(switcherLinks('vi', '/'), { en: '/' });
    assert.deepEqual(switcherLinks('en', VI, group('en', 'vi')), { vi: VI });
  });

  it('EN/VI: an open ja translation is offered at its exact page', () => {
    assert.deepEqual(switcherLinks('en', VI, group('en', 'vi', 'ja')), { vi: VI, ja: JA });
  });

  it('intl page: only languages with a translation; none → English home, never another language under a wrong name', () => {
    assert.deepEqual(switcherLinks('ja', '/vi', group('en', 'ja')), { en: EN });
    assert.deepEqual(switcherLinks('ja', '/vi/du-thuyen/x-1.html'), { en: '/' });
  });
});
