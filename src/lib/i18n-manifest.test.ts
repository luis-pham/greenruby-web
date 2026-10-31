// Frontend readiness manifest (phases 1B, 1C-5, 1D-b): what this build tells the CMS it can serve. Readiness comes
// from the route trees that exist (build app-paths or the generated registry) and the dictionaries, never from config.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { locales, type Locale } from './i18n.ts';
import { frontendManifest, MANIFEST_SCHEMA, routesFromAppPaths } from './i18n-manifest.ts';
import { intlSections } from './intl-routes.ts';
import { appRoutes } from './routes.generated.ts';

const legacyOnly = (l: Locale) => l === 'en' || l === 'vi';
const all = () => true;
const entry = (routes: readonly string[], dictionary: (l: Locale) => boolean, code: string) =>
  frontendManifest('b', { routes, dictionary }).locales.find((l) => l.code === code)!;
const ready = (l: { routes: boolean; dictionary: boolean }) => l.routes && l.dictionary;

test('lists every compiled locale with the schema and build id', () => {
  const manifest = frontendManifest('build-123', { routes: appRoutes, dictionary: legacyOnly });
  assert.equal(manifest.schema, MANIFEST_SCHEMA);
  assert.equal(manifest.buildId, 'build-123');
  assert.deepEqual(manifest.locales.map((l) => l.code), [...locales]);
});

test('this build: en/vi ready with their sections; ja has routes but no dictionary, so it is not ready', () => {
  const en = entry(appRoutes, legacyOnly, 'en');
  const vi = entry(appRoutes, legacyOnly, 'vi');
  const ja = entry(appRoutes, legacyOnly, 'ja');
  assert.ok(ready(en) && ready(vi));
  for (const section of ['home', 'cruise', 'cabin', 'itinerary', 'experiences', 'destinations', 'blog', 'news', 'faq', 'booking', 'contact']) {
    assert.ok(en.sections.includes(section), `en ${section}`);
    assert.ok(vi.sections.includes(section), `vi ${section}`);
  }
  assert.deepEqual([ja.routes, ja.dictionary], [true, false]);
  assert.deepEqual([...ja.sections].sort(), [...intlSections].sort());
});

test('missing dictionary: routes alone never make a locale ready', () => {
  assert.equal(ready(entry(appRoutes, legacyOnly, 'ja')), false);
  assert.equal(ready(entry(appRoutes, all, 'ja')), true);
});

test('missing route tree: a dictionary alone never makes a locale ready, and lists no section', () => {
  const withoutJa = appRoutes.filter((key) => !key.startsWith('/(ja)'));
  const ja = entry(withoutJa, all, 'ja');
  assert.deepEqual([ja.routes, ja.sections], [false, []]);
  assert.equal(ready(ja), false);
});

test('a section whose tree is incomplete is not served; the rest of the locale is', () => {
  const partial = appRoutes.filter((key) => key !== '/(ja)/ja/blog/[segment]/[sub]' && key !== '/(ja)/ja/cruise/[file]');
  const ja = entry(partial, all, 'ja');
  assert.equal(ready(ja), true);
  assert.equal(ja.sections.includes('blog'), false);
  assert.equal(ja.sections.includes('cruise'), false);
  assert.ok(ja.sections.includes('cabin') && ja.sections.includes('news'));
});

test('a section name in i18n.ts segments is not a route: ja never lists legal or booking terms pages', () => {
  const ja = entry(appRoutes, all, 'ja');
  // Phase 2B: booking is an intl section (its route tree exists); its terms stay English only.
  assert.ok(ja.sections.includes('booking'));
  for (const section of ['bookingTerms', 'legal', 'privacyPolicy', 'guideFirstTime', 'guideTransfer', 'ecoDashboard', 'termsAndConditions']) {
    assert.equal(ja.sections.includes(section), false, section);
  }
});

test('reads the routes of a real build (app-paths-manifest.json keys)', () => {
  const keys = routesFromAppPaths({
    '/(en)/page': 'app/(en)/page.js',
    '/(en)/cruise/[file]/page': 'app/(en)/cruise/[file]/page.js',
    '/(ja)/ja/page': 'app/(ja)/ja/page.js',
    '/api/i18n/manifest/route': 'app/api/i18n/manifest/route.js',
    '/_not-found/page': 'app/_not-found/page.js',
    '/robots.txt/route': 'app/robots.txt/route.js',
  });
  assert.deepEqual(keys, ['/(en)', '/(en)/cruise/[file]', '/(ja)/ja']);
  const ja = entry(keys, all, 'ja');
  assert.equal(ja.routes, true);
  // The English tree has home + cruise; the ja tree only home: cruise is not served.
  assert.deepEqual(ja.sections, ['home']);
});

test('matches the shape the CMS validates (App\\Services\\Locale\\FrontendManifest::parse)', () => {
  const manifest = JSON.parse(JSON.stringify(frontendManifest('b', { routes: appRoutes, dictionary: legacyOnly })));
  assert.equal(manifest.schema, 1);
  assert.equal(typeof manifest.buildId, 'string');
  for (const l of manifest.locales) {
    assert.equal(typeof l.code, 'string');
    assert.equal(typeof l.routes, 'boolean');
    assert.equal(typeof l.dictionary, 'boolean');
    assert.ok(Array.isArray(l.sections) && l.sections.every((x: unknown) => typeof x === 'string'));
  }
});
