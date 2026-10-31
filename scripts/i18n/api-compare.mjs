#!/usr/bin/env node
// Content API + booking API baseline for lang=en and lang=vi (15-release-checklist.md R-7, R-8 display part).
//   CONTENT_API_KEY=... node scripts/i18n/api-compare.mjs capture --cms http://127.0.0.1:8091 --out <dir>
//   node scripts/i18n/api-compare.mjs compare <dirA> <dirB> [--ignore-keys alternates,publication,translation,pricing,booking]
// GET requests only. Never point --cms at production: run against a local/staging clone (the key is read from the
// environment and never written to disk). Booking POST endpoints (inquiry, payment) are deliberately not called.
// Detail ids are discovered from the list endpoints, so the set follows the data.
import { get, parseArgs, readJson, sortKeys, writeJson } from './lib.mjs';
import { readdir } from 'node:fs/promises';

const args = parseArgs(process.argv.slice(2));
const mode = args._[0];
const LANGS = ['en', 'vi'];

async function capture() {
  const cms = String(args.cms ?? '').replace(/\/$/, '');
  const key = process.env.CONTENT_API_KEY;
  if (!cms || !args.out || !key) {
    console.error('usage: CONTENT_API_KEY=... api-compare.mjs capture --cms <origin> --out <dir>');
    process.exit(2);
  }
  if (/greenrubycruises\.com/.test(cms) && !args['i-know-this-is-production-read-only']) {
    console.error('refusing to run against production; use a clone');
    process.exit(2);
  }
  const results = {};
  // Normalisation: the booking API builds absolute image URLs from the request host, so the CMS origin is replaced
  // by "{cms}" (documented in phase-0/03-seo-baseline-report.md). Nothing else is rewritten.
  const normalise = (text) => text.split(cms).join('{cms}').split(cms.replace(/\//g, '\\/')).join('{cms}');
  // The public booking API is throttled (HTTP 429); honour Retry-After instead of recording the 429.
  const fetchPaced = async (url, headers) => {
    for (let attempt = 0; ; attempt++) {
      const res = await get(url, headers);
      if (res.status !== 429 || attempt === 5) return res;
      const wait = Number(res.headers.get('retry-after') ?? 10);
      console.error(`429 on ${url.replace(cms, '')}, waiting ${wait}s`);
      await new Promise((r) => setTimeout(r, (wait + 1) * 1000));
    }
  };
  const content = async (path) => {
    const res = await fetchPaced(`${cms}/api/v1/content${path}`, { 'X-Content-Key': key, Accept: 'application/json' });
    results[`content${path}`] = { status: res.status, body: parse(normalise(res.body)) };
    return results[`content${path}`].body;
  };
  const booking = async (path) => {
    const res = await fetchPaced(`${cms}/api${path}`, { Accept: 'application/json' });
    results[`booking${path}`] = { status: res.status, body: parse(normalise(res.body)) };
    return results[`booking${path}`].body;
  };

  for (const lang of LANGS) {
    const q = `lang=${lang}`;
    await content(`/site?${q}`);
    await content(`/pages/homepage?${q}`);
    for (const code of ['contact', 'booking', 'eco-dashboard', 'guide-first-time', 'guide-transfer', 'destinations', 'faq', 'itinerary'])
      await content(`/pages/${code}?${q}`);
    for (const c of (await content(`/cruises?${q}`))?.items ?? []) await content(`/cruises/${c.id}?${q}`);
    for (const c of (await content(`/cabins?${q}`))?.items ?? []) await content(`/cabins/${c.id}?${q}`);
    for (const i of (await content(`/itineraries?${q}`))?.items ?? []) await content(`/itineraries/${i.cruiseId}/${i.itineraryId}?${q}`);
    for (const x of (await content(`/experiences?${q}`))?.items ?? []) await content(`/experiences/${x.id}?${q}`);
    for (const d of (await content(`/destinations?${q}`))?.items ?? []) await content(`/destinations/${d.slug}?${q}`);
    await content(`/services?${q}`);
    await content(`/gallery?${q}`);
    await content(`/faqs?${q}`);
    await content(`/legal?${q}`);
    const articles = await content(`/articles?${q}`);
    for (const a of articles?.items ?? []) if (a.categorySlug && a.slug) await content(`/articles/${a.categorySlug}/${a.slug}?${q}`);

    // Booking display data (GET only). Prices/currency per language are part of R-8.
    const its = await booking(`/booking/itineraries?${q}`);
    await booking(`/booking/itineraries?${q}&unique=itinerary`);
    await booking(`/booking/departure-dates?${q}`);
    await booking(`/booking/policy?${q}`);
    for (const d of [1, 2, 3]) await booking(`/booking/cabins?${q}&duration=${d}`);
    const list = Array.isArray(its) ? its : (its?.data ?? its?.items ?? []);
    for (const it of list) {
      const id = it.id ?? it.itinerary_id;
      if (id) {
        await booking(`/booking/amenities?${q}&itinerary_id=${id}`);
        await booking(`/booking/itinerary/${id}`);
      }
    }
  }
  // Behaviour probes recorded for later phases (not EN/VI baseline content):
  await content('/cruises?lang=ja'); // today: 200 with EN content (02 C-01)
  await content('/cruises?lang=xx');

  const files = Object.entries(results).sort(([a], [b]) => a.localeCompare(b));
  const throttled = files.filter(([, v]) => v.status === 429);
  if (throttled.length) {
    console.error(`${throttled.length} responses still throttled (429); capture not written`);
    process.exit(1);
  }
  for (const [name, value] of files) await writeJson(`${args.out}/${fileName(name)}.json`, sortKeys(value));
  const statuses = files.reduce((m, [, v]) => ({ ...m, [v.status]: (m[v.status] ?? 0) + 1 }), {});
  console.log(`captured ${files.length} API responses -> ${args.out}`, statuses);
}

function parse(body) {
  try {
    return JSON.parse(body);
  } catch {
    return { nonJsonBody: body.slice(0, 200) };
  }
}

const fileName = (name) => name.replace(/[^A-Za-z0-9=._-]+/g, '_');

function strip(value, keys) {
  if (Array.isArray(value)) return value.map((v) => strip(v, keys));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).filter(([k]) => !keys.has(k)).map(([k, v]) => [k, strip(v, keys)]));
  }
  return value;
}

async function compare() {
  const [a, b] = args._.slice(1);
  const keys = new Set(String(args['ignore-keys'] ?? '').split(',').filter(Boolean));
  const [fa, fb] = await Promise.all([readdir(a), readdir(b)]);
  const diffs = [];
  for (const f of [...new Set([...fa, ...fb])].sort()) {
    if (!fa.includes(f) || !fb.includes(f)) {
      diffs.push({ file: f, issue: fa.includes(f) ? 'missing in candidate' : 'new in candidate' });
      continue;
    }
    const [x, y] = await Promise.all([readJson(`${a}/${f}`), readJson(`${b}/${f}`)]);
    if (JSON.stringify(strip(x, keys)) !== JSON.stringify(strip(y, keys))) diffs.push({ file: f, issue: 'content differs' });
  }
  console.log(`compared ${fa.length} vs ${fb.length} API responses: ${diffs.length} differences`);
  for (const d of diffs.slice(0, 50)) console.log(JSON.stringify(d));
  process.exit(diffs.length ? 1 : 0);
}

if (mode === 'capture') await capture();
else if (mode === 'compare') await compare();
else {
  console.error('usage: api-compare.mjs capture --cms <origin> --out <dir> | compare <dirA> <dirB> [--ignore-keys k1,k2]');
  process.exit(2);
}
