#!/usr/bin/env node
// Phase 0 SEO baseline: crawls every sitemap URL + extra-urls.txt on a site and records status, redirects
// and head facts per URL (docs/i18n-audit/15-release-checklist.md §2). GET only; redirects not followed.
//
//   node scripts/i18n/capture.mjs --base http://127.0.0.1:3131 --sitemap http://127.0.0.1:8091/sitemap.xml \
//     --out <dir> [--origin https://greenrubycruises.com] [--extra scripts/i18n/extra-urls.txt] [--concurrency 4]
//
// --sitemap defaults to {base}/sitemap.xml (production: Nginx sends it to Laravel).
// Absolute URLs on --origin, --base and the sitemap host are reduced to paths so runs on different hosts compare.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { extractHtml, get, parseArgs, parseSitemap, pool, sha, toPath, writeJson } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
const base = String(args.base ?? '').replace(/\/$/, '');
const out = args.out;
if (!base || !out) {
  console.error('usage: capture.mjs --base <url> --out <dir> [--sitemap <url>] [--origin <url>] [--extra <file>]');
  process.exit(2);
}
const sitemapUrl = String(args.sitemap ?? `${base}/sitemap.xml`);
const origins = [...new Set([String(args.origin ?? 'https://greenrubycruises.com'), base, new URL(sitemapUrl).origin])];
const extraFile = String(args.extra ?? fileURLToPath(new URL('./extra-urls.txt', import.meta.url)));
const concurrency = Number(args.concurrency ?? 4);

async function sitemapPaths() {
  const index = await get(sitemapUrl);
  if (index.status !== 200) throw new Error(`sitemap index ${sitemapUrl} -> ${index.status}`);
  const children = parseSitemap(index.body).filter((e) => e.kind === 'sitemap');
  const docs = children.length ? children.map((c) => toPath(c.loc, origins)) : [new URL(sitemapUrl).pathname];
  const paths = new Set();
  for (const doc of docs) {
    const res = await get(new URL(doc, new URL(sitemapUrl).origin).toString());
    if (res.status !== 200) throw new Error(`sitemap ${doc} -> ${res.status}`);
    for (const e of parseSitemap(res.body)) if (e.kind === 'url') paths.add(toPath(e.loc, origins));
  }
  return { docs, paths: [...paths] };
}

const extras = (await readFile(extraFile, 'utf8'))
  .split('\n')
  .map((l) => l.replace(/#.*/, '').trim())
  .filter(Boolean);

const { docs, paths: fromSitemaps } = await sitemapPaths();
const all = [...new Set([...fromSitemaps, ...extras])].sort();

const results = await pool(all, concurrency, async (path) => {
  const res = await get(`${base}${path}`);
  const location = res.headers.get('location');
  const isHtml = (res.headers.get('content-type') ?? '').includes('text/html');
  return {
    path,
    source: fromSitemaps.includes(path) ? 'sitemap' : 'extra',
    status: res.status,
    location: location ? toPath(new URL(location, base).toString(), origins) : null,
    xRobotsTag: res.headers.get('x-robots-tag'),
    ...(isHtml && res.status !== 308 && res.status !== 301 && res.status !== 307 ? extractHtml(res.body, origins) : {}),
    // robots.txt / llms*.txt: whole-body hash (R-11)
    ...(!isHtml && res.status === 200 ? { contentType: res.headers.get('content-type'), bodyHash: sha(res.body) } : {}),
  };
});

await writeJson(`${out}/urls.json`, results);
await writeJson(`${out}/meta.json`, {
  base,
  sitemap: sitemapUrl,
  sitemapDocuments: docs,
  origins,
  urlCount: results.length,
  fromSitemaps: fromSitemaps.length,
  extras: extras.length,
  capturedAt: new Date().toISOString(),
});
const byStatus = results.reduce((m, r) => ({ ...m, [r.status]: (m[r.status] ?? 0) + 1 }), {});
console.log(`captured ${results.length} URLs (${fromSitemaps.length} from ${docs.length} sitemaps, ${extras.length} extra) -> ${out}`, byStatus);
