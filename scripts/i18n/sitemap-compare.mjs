#!/usr/bin/env node
// Captures or compares the Laravel sitemaps (15-release-checklist.md R-10).
//   node scripts/i18n/sitemap-compare.mjs capture --sitemap http://127.0.0.1:8091/sitemap.xml --out <dir>
//   node scripts/i18n/sitemap-compare.mjs compare <dirA> <dirB>
// Normalisation (documented in docs/i18n-audit/phase-0/03-seo-baseline-report.md): origins reduced to paths,
// <lastmod>, <changefreq> and <priority> are not recorded (lastmod is the newest content edit time, so it moves
// with every CMS save), entries and alternates sorted.
import { get, parseArgs, parseSitemap, readJson, toPath, writeJson } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
const mode = args._[0];

async function capture() {
  const url = String(args.sitemap);
  const origins = [...new Set([String(args.origin ?? 'https://greenrubycruises.com'), new URL(url).origin])];
  const index = await get(url);
  if (index.status !== 200) throw new Error(`${url} -> ${index.status}`);
  const docs = parseSitemap(index.body).filter((e) => e.kind === 'sitemap').map((e) => toPath(e.loc, origins));
  const result = {};
  for (const doc of docs) {
    const res = await get(new URL(doc, new URL(url).origin).toString());
    const entries = parseSitemap(res.body)
      .filter((e) => e.kind === 'url')
      .map((e) => ({
        loc: toPath(e.loc, origins),
        alternates: e.alternates.map(([l, h]) => `${l} ${toPath(h, origins)}`).sort(),
      }))
      .sort((p, q) => p.loc.localeCompare(q.loc));
    result[doc] = { status: res.status, count: entries.length, entries };
  }
  await writeJson(`${args.out}/sitemaps.json`, { index: toPath(url, origins), documents: docs, sitemaps: result });
  const total = Object.values(result).reduce((n, s) => n + s.count, 0);
  console.log(`captured ${docs.length} sitemaps, ${total} <url> entries -> ${args.out}`);
}

async function compare() {
  const [a, b] = args._.slice(1);
  const [x, y] = await Promise.all([readJson(`${a}/sitemaps.json`), readJson(`${b}/sitemaps.json`)]);
  const flat = (s) =>
    new Map(Object.entries(s.sitemaps).flatMap(([doc, v]) => v.entries.map((e) => [`${doc} ${e.loc}`, JSON.stringify(e.alternates)])));
  const X = flat(x);
  const Y = flat(y);
  const diffs = [];
  for (const k of [...new Set([...X.keys(), ...Y.keys()])].sort()) {
    if (X.get(k) !== Y.get(k)) diffs.push({ entry: k, baseline: X.get(k) ?? 'missing', candidate: Y.get(k) ?? 'missing' });
  }
  if (JSON.stringify(x.documents) !== JSON.stringify(y.documents)) diffs.unshift({ entry: '(documents)', baseline: x.documents, candidate: y.documents });
  console.log(`compared ${X.size} vs ${Y.size} sitemap entries: ${diffs.length} differences`);
  for (const d of diffs.slice(0, 50)) console.log(JSON.stringify(d));
  process.exit(diffs.length ? 1 : 0);
}

if (mode === 'capture') await capture();
else if (mode === 'compare') await compare();
else {
  console.error('usage: sitemap-compare.mjs capture --sitemap <url> --out <dir> | compare <dirA> <dirB>');
  process.exit(2);
}
