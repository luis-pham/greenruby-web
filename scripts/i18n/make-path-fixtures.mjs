#!/usr/bin/env node
// Builds paths.fixture.json from a capture.mjs run: representative EN/VI URL shapes with their observed status,
// canonical and hreflang, plus every observed redirect. Phase 1 PathBuilder (PHP) and the Next URL helpers must
// reproduce these exactly (15-release-checklist.md U-1). Nothing is invented: every entry comes from the capture.
//   node scripts/i18n/make-path-fixtures.mjs <captureDir> [--out scripts/i18n/paths.fixture.json] [--per 2]
import { fileURLToPath } from 'node:url';
import { parseArgs, readJson, writeJson } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
const dir = args._[0];
if (!dir) {
  console.error('usage: make-path-fixtures.mjs <captureDir> [--out file] [--per n]');
  process.exit(2);
}
const out = String(args.out ?? fileURLToPath(new URL('./paths.fixture.json', import.meta.url)));
const per = Number(args.per ?? 2);
const [rows, meta] = await Promise.all([readJson(`${dir}/urls.json`), readJson(`${dir}/meta.json`)]);

// [category, kind, en pattern, vi pattern]; first match wins. Patterns follow src/lib/i18n.ts + views/blog/paths.ts.
const SHAPES = [
  ['home', 'hub', /^\/$/, /^\/vi$/],
  ['cruise', 'detail', /^\/cruise\/[^/]+-\d+\.html$/, /^\/vi\/du-thuyen\/[^/]+-\d+\.html$/],
  ['cabin', 'detail', /^\/cabin\/[^/]+-\d+\.html$/, /^\/vi\/phong-nghi\/[^/]+-\d+\.html$/],
  ['itinerary', 'hub', /^\/itinerary$/, /^\/vi\/hanh-trinh$/],
  ['itinerary', 'detail', /^\/itinerary\/[^/]+-\d+-\d+\.html$/, /^\/vi\/hanh-trinh\/[^/]+-\d+-\d+\.html$/],
  ['experience', 'hub', /^\/experiences$/, /^\/vi\/hoat-dong-trai-nghiem$/],
  ['experience', 'detail', /^\/experiences\/[^/]+-\d+\.html$/, /^\/vi\/hoat-dong-trai-nghiem\/[^/]+-\d+\.html$/],
  ['destination', 'hub', /^\/destinations$/, /^\/vi\/dia-diem-tham-quan$/],
  ['destination', 'detail', /^\/destinations\/[a-z0-9-]+$/, /^\/vi\/dia-diem-tham-quan\/[a-z0-9-]+$/],
  ['blog', 'hub', /^\/blog$/, /^\/vi\/blog$/],
  ['blog', 'category', /^\/blog\/[a-z0-9-]+$/, /^\/vi\/blog\/[a-z0-9-]+$/],
  ['blog', 'article', /^\/blog\/[^/]+\/[^/]+\.html$/, /^\/vi\/blog\/[^/]+\/[^/]+\.html$/],
  ['guides', 'hub', /^\/guides$/, /^\/vi\/cam-nang$/],
  ['guides', 'detail', /^\/guides\/[a-z0-9-]+$/, /^\/vi\/cam-nang\/[a-z0-9-]+$/],
  ['faq', 'hub', /^\/faq$/, /^\/vi\/cau-hoi-thuong-gap$/],
  ['faq', 'category', /^\/faq\/[a-z0-9-]+$/, /^\/vi\/cau-hoi-thuong-gap\/[a-z0-9-]+$/],
  ['gallery', 'hub', /^\/gallery$/, /^\/vi\/thu-vien$/],
  ['gallery', 'category', /^\/gallery\/[a-z0-9-]+$/, /^\/vi\/thu-vien\/[a-z0-9-]+$/],
  ['legal', 'page', /^\/(legal|privacy-policy|terms-and-conditions|payment-methods|cookie-policy|safety-policies|booking-terms-and-conditions)$/, /^\/vi\/(phap-ly|chinh-sach-bao-mat|dieu-khoan-dieu-kien|phuong-thuc-thanh-toan|chinh-sach-cookie|chinh-sach-an-toan|dieu-khoan-dat-tour)$/],
  ['booking', 'page', /^\/booking(\/pay)?$/, /^\/vi\/booking(\/pay)?$/],
  ['static', 'page', /^\/(contact|services|about-us|about-us\/brand-facts|eco-dashboard)$/, /^\/vi\/(lien-he|dich-vu|gioi-thieu|gioi-thieu\/thong-tin-thuong-hieu|bao-cao-sinh-thai)$/],
];

// Ids per URL shape (src/lib/i18n.ts): itineraries end in -{cruiseId}-{itineraryId}.html, cruise/cabin/experience in
// -{id}.html. Slugs may themselves end in digits ("green-ruby-1-3.html"), so only the shape decides; blog has no id.
const ids = (category, kind, path) => {
  if (kind !== 'detail') return undefined;
  if (category === 'itinerary') {
    const m = /-(\d+)-(\d+)\.html$/.exec(path);
    return m ? { cruiseId: Number(m[1]), itineraryId: Number(m[2]) } : undefined;
  }
  if (['cruise', 'cabin', 'experience'].includes(category)) {
    const m = /-(\d+)\.html$/.exec(path);
    return m ? { id: Number(m[1]) } : undefined;
  }
  return undefined;
};

const shapes = [];
const counts = new Map();
for (const r of [...rows].sort((a, b) => a.path.localeCompare(b.path))) {
  if (r.status !== 200 || !r.pageType) continue;
  for (const [category, kind, en, vi] of SHAPES) {
    const locale = en.test(r.path) ? 'en' : vi.test(r.path) ? 'vi' : null;
    if (!locale) continue;
    const key = `${category}/${kind}/${locale}`;
    if ((counts.get(key) ?? 0) < (kind === 'page' ? 99 : per)) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
      shapes.push({
        category,
        kind,
        locale,
        path: r.path,
        ...(ids(category, kind, r.path) && { ids: ids(category, kind, r.path) }),
        expect: { status: r.status, lang: r.lang, canonical: r.canonical, hreflang: r.hreflang, robots: r.robots },
      });
    }
    break;
  }
}

const redirects = rows
  .filter((r) => [301, 302, 307, 308].includes(r.status))
  .map((r) => ({ from: r.path, status: r.status, to: r.location }))
  .sort((a, b) => a.from.localeCompare(b.from));
const notFound = rows.filter((r) => r.status === 404).map((r) => ({ path: r.path, pageType: r.pageType })).sort((a, b) => a.path.localeCompare(b.path));

const missing = SHAPES.flatMap(([c, k]) => ['en', 'vi'].filter((l) => !counts.get(`${c}/${k}/${l}`)).map((l) => `${c}/${k}/${l}`));
await writeJson(out, {
  description: 'Observed EN/VI URL shapes (Phase 0 baseline). Phase 1 URL builders must reproduce path, canonical and hreflang exactly.',
  source: { capture: dir.split('/').slice(-2).join('/'), urlCount: meta.urlCount, origin: meta.origins[0] },
  shapes,
  redirects,
  notFound,
  shapesNotObserved: missing,
});
console.log(`${shapes.length} shapes, ${redirects.length} redirects, ${notFound.length} 404s -> ${out}`);
if (missing.length) console.log('not observed in this capture:', missing.join(', '));
