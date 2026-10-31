// Generated intl route trees (phase 1D-b): the registry and the (ja) tree are current, and section readiness
// comes from the routes that exist.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { isMigratedPath, sectionPath } from './i18n.ts';
import { intlRequirements, localeRoutes, routeSections } from './intl-routes.ts';
import { appRoutes } from './routes.generated.ts';

test('src/app matches the generator (scripts/i18n/routes-generate.mjs --check)', () => {
  execFileSync(process.execPath, ['scripts/i18n/routes-generate.mjs', '--check'], { stdio: 'pipe' });
});

test('every generated ja route is an English route of an intl section, under /ja with the English segments', () => {
  const en = localeRoutes(appRoutes, 'en');
  const ja = localeRoutes(appRoutes, 'ja');
  assert.ok(ja.length > 0);
  for (const route of ja) assert.ok(en.includes(route), route);
  assert.deepEqual([...intlRequirements(appRoutes).values()].flat().sort(), [...ja].sort());
  assert.equal(ja.includes('blog/search'), false, 'no intl keyword search');
  assert.equal(ja.some((r) => r.startsWith('booking')), false, 'no ja checkout');
});

test('each generated page wraps the shared factory in the intl gate (no copy of a view)', () => {
  const page = readFileSync('src/app/(ja)/ja/cruise/[file]/page.tsx', 'utf8');
  assert.match(page, /intlRoute\(\{ locale: 'ja', section: 'cruise', hub: false, placeholder: \{ file: '_' \} \}, cruiseRoute\('ja'\)\)/);
  assert.match(readFileSync('src/app/(ja)/ja/itinerary/page.tsx', 'utf8'), /section: 'itinerary', hub: true/);
});

test('legacy sections are read from their own trees (vi uses its segments)', () => {
  const vi = routeSections(appRoutes, 'vi');
  for (const s of ['home', 'cruise', 'cabin', 'faq', 'booking', 'contact', 'destinations']) assert.ok(vi.includes(s), s);
});

test('intl links to sections without an intl route go to the English page; EN/VI links unchanged', () => {
  assert.equal(sectionPath('ja', 'cruise'), '/ja/cruise');
  assert.equal(sectionPath('ja', 'booking'), '/booking');
  assert.equal(sectionPath('ja', 'contact'), '/ja/contact', 'static page with page-level publication (1E-c)');
  assert.equal(sectionPath('ja', 'legal'), '/legal');
  assert.equal(sectionPath('ja', 'brandFacts'), '/about-us/brand-facts');
  assert.equal(sectionPath('vi', 'contact'), '/vi/lien-he');
  assert.equal(sectionPath('en', 'booking'), '/booking');
  assert.equal(isMigratedPath('/ja/cruise/x-1.html'), true);
  assert.equal(isMigratedPath('/japan'), false);
});
