// Preview / Cache Components security tests (Phase 0, 15-release-checklist.md §5). Run: node preview-tests.mjs
import { createHmac, randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'http://127.0.0.1:3997';
const SECRET = 'spike-local-secret';
const LEAKS = ['下書き秘密', '改訂版ドラフト', '改訂版SEO秘密', '下書きSEO秘密', 'spike-local-preview-key', 'spike-local-secret'];
const results = [];
const check = (id, name, pass, detail = '') => {
  results.push({ id, name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${name}${detail ? ` — ${detail}` : ''}`);
};

const sign = (b) => createHmac('sha256', SECRET).update(b).digest('base64url');
const token = (slug, { exp = Math.floor(Date.now() / 1000) + 900, nonce = randomUUID(), secret } = {}) => {
  const body = Buffer.from(JSON.stringify({ slug, exp, nonce })).toString('base64url');
  return `${body}.${secret ? createHmac('sha256', secret).update(body).digest('base64url') : sign(body)}`;
};

async function req(path, { jar, headers = {} } = {}, hops = 0) {
  const h = { ...headers };
  if (jar?.size) h.Cookie = [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
  const res = await fetch(BASE + path, { redirect: 'manual', headers: h });
  const setCookies = res.headers.getSetCookie();
  if (jar) for (const c of setCookies) { const [kv] = c.split(';'); const i = kv.indexOf('='); const k = kv.slice(0, i); const v = kv.slice(i + 1); if (v) jar.set(k, v); else jar.delete(k); }
  // RSC requests are redirected to a ?_rsc cache-busting URL first; follow like the client router does.
  const loc = res.headers.get('location');
  if (headers.RSC && res.status === 307 && loc?.includes('_rsc') && hops < 3) return req(loc, { jar, headers }, hops + 1);
  return { status: res.status, headers: res.headers, setCookies, body: await res.text() };
}
const leaks = (r) => LEAKS.filter((s) => r.body.includes(s) || [...r.headers.values()].some((v) => v.includes(s)));
const RSC = { RSC: '1' };

async function previewSession(slug) {
  const jar = new Map();
  const r = await req(`/api/preview?token=${encodeURIComponent(token(slug))}`, { jar });
  return { jar, r };
}

// --- token handling (P-1, P-2, P-9) ---
for (const [name, t] of [
  ['no token', ''],
  ['malformed token', 'abc'],
  ['wrong secret', token('draft-1', { secret: 'attacker' })],
  ['expired token', token('draft-1', { exp: Math.floor(Date.now() / 1000) - 1 })],
]) {
  const jar = new Map();
  const r = await req(`/api/preview?token=${encodeURIComponent(t)}`, { jar });
  check('P-1', `rejects ${name}`, r.status === 401 && !jar.has('__prerender_bypass'), `status ${r.status}, cookies ${[...jar.keys()].join(',') || 'none'}`);
}
{
  const t = token('draft-1');
  const a = await req(`/api/preview?token=${encodeURIComponent(t)}`, { jar: new Map() });
  const b = await req(`/api/preview?token=${encodeURIComponent(t)}`, { jar: new Map() });
  check('P-2', 'token replay rejected', a.status === 307 && b.status === 401, `first ${a.status}, second ${b.status}`);
  const bypass = a.setCookies.find((c) => c.startsWith('__prerender_bypass='));
  const scope = a.setCookies.find((c) => c.startsWith('gr_preview_scope='));
  check('P-9', 'draft cookie flags (Next __prerender_bypass)', Boolean(bypass) && /HttpOnly/i.test(bypass) && /Secure/i.test(bypass), bypass?.replace(/=[^;]+/, '=<redacted>'));
  check('P-9b', 'scope cookie flags', Boolean(scope) && /HttpOnly/i.test(scope) && /Secure/i.test(scope) && /Max-Age=1800/.test(scope), scope?.replace(/=[^;]+/, '=<redacted>'));
}

// --- order 1: preview first, anonymous second (draft-only page) ---
{
  const { jar } = await previewSession('draft-1');
  const p = await req('/ja/cruise/draft-1', { jar });
  check('PV-1', 'editor sees draft page', p.status === 200 && p.body.includes('下書き秘密タイトル'), `status ${p.status}`);
  check('P-6', 'preview response Cache-Control private, no-store', /private/.test(p.headers.get('cache-control') ?? '') && /no-store/.test(p.headers.get('cache-control') ?? ''), p.headers.get('cache-control'));
  check('P-6b', 'preview response X-Robots-Tag noindex, nofollow', /noindex/.test(p.headers.get('x-robots-tag') ?? '') && /nofollow/.test(p.headers.get('x-robots-tag') ?? ''), p.headers.get('x-robots-tag'));
  check('P-6c', 'preview has no hreflang alternates', !/hrefLang=|hreflang=/.test(p.body.split('<body')[0]), '');
  for (const [label, headers] of [['HTML', {}], ['RSC', RSC], ['Googlebot', { 'User-Agent': 'Googlebot/2.1' }]]) {
    const a = await req('/ja/cruise/draft-1', { headers });
    // RSC (client navigation) responses for unknown params are 404 on first request and 200 afterwards (Next caches the
    // not-found fallback; same for slugs that never existed), so for RSC the criterion is the 404 fallback marker.
    const notFound = label === 'RSC' ? a.body.includes('NEXT_HTTP_ERROR_FALLBACK;404') : a.status === 404;
    check('P-7', `anonymous after preview (${label}) -> not found, no leak`, notFound && leaks(a).length === 0, `status ${a.status}, leaks ${leaks(a).join('|') || 'none'}`);
  }
}

// --- order 2: public cached first, preview second, anonymous third (published page with a draft revision) ---
{
  const a1 = await req('/ja/cruise/pub-1');
  check('PV-2', 'anonymous sees published version', a1.status === 200 && a1.body.includes('公開版タイトル') && leaks(a1).length === 0, `status ${a1.status}`);
  const { jar } = await previewSession('pub-1');
  const p = await req('/ja/cruise/pub-1', { jar });
  check('P-8', 'preview of a cached public page shows the draft revision', p.status === 200 && p.body.includes('改訂版ドラフト秘密') && p.body.includes('改訂版SEO秘密'), `status ${p.status}`);
  const pr = await req('/ja/cruise/pub-1', { jar, headers: RSC });
  check('P-8b', 'preview RSC request also served as draft (editor navigation)', pr.status === 200, `status ${pr.status}`);
  for (const [label, headers] of [['HTML', {}], ['RSC', RSC]]) {
    const a2 = await req('/ja/cruise/pub-1', { headers });
    check('P-7b', `anonymous after preview of published page (${label}) still published, no leak`, a2.status === 200 && (label === 'RSC' || a2.body.includes('公開版タイトル')) && leaks(a2).length === 0, `leaks ${leaks(a2).join('|') || 'none'}`);
  }
}

// --- scope: a token for pub-1 must not unlock draft-1 (P-3) ---
{
  const { jar } = await previewSession('pub-1');
  const r = await req('/ja/cruise/draft-1', { jar });
  check('P-3', 'preview scope: other draft stays 404', r.status === 404 && leaks(r).length === 0, `status ${r.status}, leaks ${leaks(r).join('|') || 'none'}`);
}

// --- forged draft cookie without scope (draft mode cookie value is per build, but test an invalid one) ---
{
  const jar = new Map([['__prerender_bypass', 'forged'], ['gr_preview_scope', 'forged.forged']]);
  const r = await req('/ja/cruise/draft-1', { jar });
  check('P-1b', 'forged cookies -> 404, no leak', r.status === 404 && leaks(r).length === 0, `status ${r.status}`);
}

// --- revalidation (P-7 after revalidateTag) ---
{
  await fetch(`${BASE}/api/revalidate`, { method: 'POST', body: JSON.stringify({ tag: 'content' }) });
  const { jar } = await previewSession('pub-1');
  await req('/ja/cruise/pub-1', { jar }); // preview render right after revalidation
  const a = await req('/ja/cruise/pub-1');
  const b = await req('/ja/cruise/pub-1');
  check('P-7c', 'after revalidateTag + preview render, anonymous still published (2 requests)', [a, b].every((r) => r.status === 200 && r.body.includes('公開版タイトル') && leaks(r).length === 0), `${a.status}/${b.status}`);
  const d = await req('/ja/cruise/draft-1');
  check('P-7d', 'after revalidation, draft-only page still 404 anonymously', d.status === 404 && leaks(d).length === 0, `status ${d.status}`);
}

// --- exit (P-10) ---
{
  const { jar } = await previewSession('draft-1');
  await req('/api/preview/exit', { jar });
  const r = await req('/ja/cruise/draft-1', { jar });
  check('P-10', 'after exit the draft is gone for that browser', r.status === 404 && !jar.has('__prerender_bypass'), `status ${r.status}`);
}

// --- preview key never sent on anonymous traffic (P-4/P-5 Next side) ---
{
  const log = JSON.parse(await (await fetch('http://127.0.0.1:3998/log')).text());
  const bad = log.filter((e) => e.keySent && !e.preview);
  check('P-4', 'preview key only ever sent with preview=1 requests', bad.length === 0, `${log.filter((e) => e.keySent).length} keyed requests, ${bad.length} on public reads`);
  const unauth = await fetch('http://127.0.0.1:3998/cruise/draft-1?lang=ja&preview=1');
  check('P-5', 'mock CMS refuses preview=1 without key', unauth.status === 401, `status ${unauth.status}`);
}

// --- secrets not in client bundles (P-12) ---
{
  const files = [];
  const walk = async (d) => { for (const e of await readdir(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) await walk(p); else files.push(p); } };
  await walk(new URL('./.next/static', import.meta.url).pathname);
  let hits = 0;
  for (const f of files) { const s = await readFile(f, 'utf8').catch(() => ''); if (LEAKS.some((x) => s.includes(x)) || s.includes('X-Preview-Key')) hits++; }
  check('P-12', 'no secret, preview header name or draft text in client bundles', hits === 0, `${files.length} files scanned, ${hits} hits`);
}

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
