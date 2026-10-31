// Content API contract (i18n phase 1D-a): old payloads and the additive multilingual fields both parse, the new fields
// change nothing EN/VI pages render, and no registry code outside the compiled locales can reach them.
// Fixtures are real local CMS responses (docs/i18n-audit/phase-1/1a-report.md), before and after phase 1A;
// prices are hidden in them (pricing.showPublic false).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { alternates, cabinBooking, hasIntlMember, isLocale, localeCode, localesSchema, openAlternates, publication, servedAlternates } from './contract.ts';
import { cabinSchema, cruiseSchema, itinerarySchema, siteSchema } from './schemas.ts';

const fixture = (name: string) => JSON.parse(readFileSync(new URL(`./fixtures/${name}.json`, import.meta.url), 'utf8'));
const without = <T extends object>(value: T, key: string) => Object.fromEntries(Object.entries(value).filter(([k]) => k !== key));

describe('Phase 1A payloads (real EN/VI responses)', () => {
  for (const [name, schema] of [
    ['cabin-en-24', cabinSchema],
    ['cabin-vi-38', cabinSchema],
    ['itinerary-en-3-3', itinerarySchema],
    ['itinerary-vi-1-8', itinerarySchema],
  ] as const) {
    it(`${name}: old and new shapes parse to the same page data, plus booking`, () => {
      const before = schema.parse(fixture(`${name}.before`));
      const after = schema.parse(fixture(`${name}.after`));
      assert.equal('booking' in before && before.booking !== undefined, false);
      assert.deepEqual(without(after, 'booking'), without(before, 'booking'));
    });
  }

  it('keeps the booking inventory ids instead of stripping them', () => {
    assert.deepEqual(cabinSchema.parse(fixture('cabin-en-24.after')).booking, { cabinId: 24 });
    assert.deepEqual(cabinSchema.parse(fixture('cabin-vi-38.after')).booking, { cabinId: 38 });
    assert.deepEqual(itinerarySchema.parse(fixture('itinerary-en-3-3.after')).booking, { itineraryId: 3, cruiseId: 3 });
    assert.deepEqual(itinerarySchema.parse(fixture('itinerary-vi-1-8.after')).booking, { itineraryId: 8, cruiseId: 1 });
  });

  it('price-list currency is unchanged: USD for EN rows, VND for VI rows', () => {
    assert.equal(cabinSchema.parse(fixture('cabin-en-24.after')).pricing.currency, 'USD');
    assert.equal(cabinSchema.parse(fixture('cabin-vi-38.after')).pricing.currency, 'VND');
    assert.equal(itinerarySchema.parse(fixture('itinerary-en-3-3.after')).currency, 'USD');
    assert.equal(itinerarySchema.parse(fixture('itinerary-vi-1-8.after')).currency, 'VND');
  });

  it('a payload untouched by phase 1A still parses (cruise)', () => {
    const cruise = cruiseSchema.parse(fixture('cruise-en-3'));
    assert.equal(cruise.alternates, undefined);
    assert.equal(cruise.publication, undefined);
  });
});

describe('planned 1B/1C fields (alternates, publication, pricing.priceList)', () => {
  const cabin = fixture('cabin-en-24.after');

  it('parses N-language alternates and publication', () => {
    const parsed = cabinSchema.parse({
      ...cabin,
      alternates: [
        { lang: 'en', path: '/cabin/imperial-suite-24.html' },
        { lang: 'vi', path: '/vi/phong-nghi/imperial-suite-38.html' },
        { lang: 'ja', path: '/ja/cabin/imperial-suite-90.html' },
        { lang: 'zh-Hant', path: '/zh-tw/cabin/imperial-suite-91.html' },
      ],
      publication: { visible: true },
      pricing: { ...cabin.pricing, priceList: 'en' },
    });
    assert.equal(parsed.alternates?.length, 4);
    assert.deepEqual(parsed.publication, { visible: true });
    assert.equal(parsed.pricing.priceList, 'en');
  });

  it('only compiled locales can be linked: zh-Hant is data, not a served language; x-default is kept apart', () => {
    const parsed = alternates.parse([
      { lang: 'en', path: '/a' },
      { lang: 'vi', path: '/vi/a' },
      { lang: 'ja', path: '/ja/a' },
      { lang: 'zh-Hant', path: '/zh-tw/a' },
      { lang: 'x-default', path: '/a' },
    ]);
    assert.equal(parsed?.length, 5);
    assert.deepEqual(servedAlternates(parsed).map((a) => a.lang), ['en', 'vi', 'ja']);
    assert.deepEqual(servedAlternates(undefined), []);
    assert.equal(isLocale('ja'), true, 'compiled since 1D-b');
    assert.equal(isLocale('zh-Hant'), false);
    assert.equal(isLocale('x-default'), false);
  });

  it('compiling a language never makes it linkable: only languages `open` accepts are kept (1D-b)', () => {
    const parsed = alternates.parse([
      { lang: 'en', path: '/a' },
      { lang: 'ja', path: '/ja/a' },
      { lang: 'vi', path: '/vi/a' },
      { lang: 'x-default', path: '/a' },
    ]);
    const closed = openAlternates(parsed, (l) => l === 'en' || l === 'vi');
    assert.deepEqual(closed, { entries: [{ lang: 'en', path: '/a' }, { lang: 'vi', path: '/vi/a' }], xDefault: '/a' });
    const open = openAlternates(parsed, () => true);
    assert.deepEqual(open.entries.map((e) => e.lang), ['en', 'ja', 'vi']);
    // x-default only when it points at a kept member.
    assert.equal(openAlternates(parsed, (l) => l === 'ja').xDefault, null);
    assert.deepEqual(openAlternates(undefined, () => true), { entries: [], xDefault: null });
    assert.equal(hasIntlMember(parsed), true);
    assert.equal(hasIntlMember([{ lang: 'en', path: '/a' }, { lang: 'x-default', path: '/a' }, { lang: 'zh-Hant', path: '/zh/a' }]), false);
  });

  it('drops malformed alternates instead of failing the page', () => {
    const parsed = alternates.parse([
      { lang: 'EN', path: '/a' },
      { lang: 'ja', path: 'https://evil.example/ja' },
      { lang: '../x', path: '/x' },
      { path: '/no-lang' },
      'junk',
      { lang: 'vi', path: '/vi/a' },
    ]);
    assert.deepEqual(parsed, [{ lang: 'vi', path: '/vi/a' }]);
    assert.equal(alternates.parse({ not: 'an array' }), undefined);
  });

  it('ignores malformed booking, publication and priceList values', () => {
    assert.equal(cabinBooking.parse({ cabinId: -1 }), undefined);
    assert.equal(cabinBooking.parse('24'), undefined);
    assert.deepEqual(cabinBooking.parse({ cabinId: null }), { cabinId: null });
    assert.equal(publication.parse({ visible: 'yes' }), undefined);
    const parsed = cabinSchema.parse({ ...cabin, pricing: { ...cabin.pricing, priceList: 'English' } });
    assert.equal(parsed.pricing.priceList, undefined);
    assert.equal(parsed.pricing.currency, 'USD');
  });

  it('localeCode accepts registry tags only', () => {
    for (const ok of ['en', 'vi', 'ja', 'ko', 'zh-Hant', 'zh-Hans', 'fr']) assert.equal(localeCode.safeParse(ok).success, true, ok);
    for (const bad of ['', 'EN', 'j', 'japanese', '../ja', 'ja_JP', 'ja-']) assert.equal(localeCode.safeParse(bad).success, false, bad);
  });
});

describe('legacy EN/VI alternate', () => {
  const cabin = fixture('cabin-en-24.before');

  it('keeps an en/vi counterpart exactly as before', () => {
    assert.deepEqual(cabinSchema.parse(cabin).alternate, cabin.alternate);
    assert.equal(cabinSchema.parse({ ...cabin, alternate: null }).alternate, null);
  });

  it('a counterpart in a language this build does not serve becomes "no alternate", not an error', () => {
    // ja is compiled since 1D-b but is still not a legacy counterpart: the single `alternate` stays EN/VI only.
    const parsed = cabinSchema.parse({ ...cabin, alternate: { lang: 'ja', id: 90 } });
    assert.equal(parsed.alternate, null);
    const itinerary = fixture('itinerary-vi-1-8.before');
    assert.equal(itinerarySchema.parse({ ...itinerary, alternate: { ...itinerary.alternate, lang: 'ko' } }).alternate, null);
  });

  it('still rejects a structurally broken alternate (unchanged)', () => {
    assert.equal(cabinSchema.safeParse({ ...cabin, alternate: { lang: 'vi' } }).success, false);
  });
});

describe('site payload', () => {
  it('a registry listing more languages parses; nothing reads `languages` to build links', () => {
    const site = siteSchema.parse({
      language: { code: 'en' },
      languages: [
        { code: 'en', name: 'English', isDefault: true },
        { code: 'vi', name: 'Tiếng Việt', isDefault: false },
        { code: 'ja', name: '日本語', isDefault: false },
      ],
      config: {},
      menus: { primary: [], footer: [] },
    });
    assert.equal(site.languages.length, 3);
  });
});

describe('GET /locales (phase 1B)', () => {
  it('the real CMS response parses strictly and lists exactly en and vi, both legacy and public', () => {
    const parsed = localesSchema.strict().parse(fixture('locales'));
    assert.equal(parsed.default, 'en');
    assert.deepEqual(
      parsed.locales.map((l) => [l.code, l.urlPrefix, l.routeStyle, l.status, l.effectivePublic, l.priceList, l.xDefaultPriority]),
      [
        ['en', '', 'legacy', 'public', true, 'en', 1],
        ['vi', 'vi', 'legacy', 'public', true, 'vi', 2],
      ],
    );
    for (const l of parsed.locales) assert.equal(isLocale(l.code), true);
    // 1D-b: en/vi serve every section (null); an intl language lists the sections all web instances serve.
    assert.deepEqual(parsed.locales.map((l) => l.sections), [null, null]);
  });

  it('an older CMS without `sections` still parses (the intl gate then treats intl sections as closed)', () => {
    const real = fixture('locales');
    const old = {
      ...real,
      locales: real.locales.map((l: Record<string, unknown>) => Object.fromEntries(Object.entries(l).filter(([k]) => k !== 'sections'))),
    };
    assert.equal(localesSchema.strict().parse(old).locales[0].sections, undefined);
  });

  it('a contract change fails here, not on a page', () => {
    const real = fixture('locales');
    assert.equal(localesSchema.safeParse({ ...real, locales: [{ ...real.locales[0], status: 'live' }] }).success, false);
    assert.equal(localesSchema.safeParse({ ...real, locales: [{ ...real.locales[0], routeStyle: undefined }] }).success, false);
  });
});
