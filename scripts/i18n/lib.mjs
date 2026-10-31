// Shared helpers for the Phase 0 i18n baseline scripts (no dependencies; Node >= 20).
// Everything here is read-only: GET requests only, redirects never followed.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

export function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      args[k] = v ?? (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true);
    } else args._.push(a);
  }
  return args;
}

export async function writeJson(file, data) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

export async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

/** Recursively sorts object keys so JSON output is stable. */
export function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sortKeys(value[k])]));
  }
  return value;
}

/** Runs async fn over items with bounded concurrency, preserving order. */
export async function pool(items, size, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i], i);
      }
    }),
  );
  return out;
}

export async function get(url, headers = {}) {
  const res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'gr-i18n-baseline/1', ...headers } });
  return { status: res.status, headers: res.headers, body: await res.text() };
}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x2F;/g, '/');

/** Maps any of the given origins to a bare path; other absolute URLs are kept. */
export function toPath(url, origins) {
  if (!url) return url;
  for (const o of origins) if (url.startsWith(o)) return url.slice(o.length) || '/';
  return url;
}

/** <loc> entries plus xhtml:link alternates of one sitemap document. */
export function parseSitemap(xml) {
  const entries = [];
  for (const block of xml.match(/<(url|sitemap)>[\s\S]*?<\/\1>/g) ?? []) {
    const loc = decode(/<loc>\s*([^<]+?)\s*<\/loc>/.exec(block)?.[1] ?? '');
    const alternates = [...block.matchAll(/<xhtml:link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)].map((m) => [m[1], decode(m[2])]);
    entries.push({ kind: block.startsWith('<sitemap>') ? 'sitemap' : 'url', loc, alternates });
  }
  return entries;
}

const attr = (tag, name) => decode(new RegExp(`\\b${name}="([^"]*)"`, 'i').exec(tag)?.[1] ?? '');

/** Head/SEO facts of an HTML document. Only real tags match: RSC payload strings are JSON-escaped (\"). */
export function extractHtml(html, origins) {
  const tags = (re) => html.match(re) ?? [];
  const metaName = (n) => tags(new RegExp(`<meta[^>]+name="${n}"[^>]*>`, 'gi')).map((t) => attr(t, 'content'));
  const metaProp = (p) => tags(new RegExp(`<meta[^>]+property="${p}"[^>]*>`, 'gi')).map((t) => attr(t, 'content'));
  const htmlTag = /<html[^>]*>/i.exec(html)?.[0] ?? '';
  const links = tags(/<link[^>]+>/gi);
  const canonical = links.filter((t) => /rel="canonical"/i.test(t)).map((t) => toPath(attr(t, 'href'), origins));
  const hreflang = links
    .filter((t) => /rel="alternate"/i.test(t) && /hreflang=/i.test(t))
    .map((t) => `${attr(t, 'hreflang')} ${toPath(attr(t, 'href'), origins)}`)
    .sort();
  const jsonLd = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => sha(m[1]));
  const main = /<main[\s\S]*?<\/main>/i.exec(html)?.[0];
  const text = (main ?? /<body[\s\S]*<\/body>/i.exec(html)?.[0] ?? '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const switcher = tags(/<a[^>]+hrefLang="[^"]+"[^>]*>/g).map((t) => `${attr(t, 'hrefLang')} ${toPath(attr(t, 'href'), origins)}`);
  let pageType = 'page';
  if (/id="__next_error__"/.test(htmlTag)) pageType = 'next-error-document';
  else if (/<title>404 ·/.test(html)) pageType = 'global-404';
  return {
    lang: attr(htmlTag, 'lang') || null,
    title: decode(/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '') || null,
    description: metaName('description')[0] ?? null,
    robots: metaName('robots')[0] ?? null,
    canonical: canonical.length === 1 ? canonical[0] : canonical,
    hreflang,
    ogLocale: metaProp('og:locale')[0] ?? null,
    ogLocaleAlternate: metaProp('og:locale:alternate').sort(),
    jsonLd,
    mainSource: main ? 'main' : 'body',
    mainHash: sha(text),
    mainChars: text.length,
    switcher: [...new Set(switcher)].sort(),
    pageType,
  };
}
