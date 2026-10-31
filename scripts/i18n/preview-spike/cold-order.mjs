// Cold server: the FIRST request to /ja/cruise/pub-1 is a preview; then anonymous HTML + RSC must be the published version.
import { createHmac, randomUUID } from 'node:crypto';
const BASE = 'http://127.0.0.1:3997';
const sign = (b) => createHmac('sha256', 'spike-local-secret').update(b).digest('base64url');
const body = Buffer.from(JSON.stringify({ slug: 'pub-1', exp: Math.floor(Date.now() / 1000) + 900, nonce: randomUUID() })).toString('base64url');
const r = await fetch(`${BASE}/api/preview?token=${body}.${sign(body)}`, { redirect: 'manual' });
const cookie = r.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ');
const p = await (await fetch(`${BASE}/ja/cruise/pub-1`, { headers: { cookie } })).text();
const a = await (await fetch(`${BASE}/ja/cruise/pub-1`)).text();
const rsc = await (await fetch(`${BASE}/ja/cruise/pub-1`, { headers: { RSC: '1' } })).text();
const leak = (s) => /改訂版/.test(s);
console.log('preview shows draft:', leak(p));
console.log('anonymous HTML published & no leak:', a.includes('公開版タイトル') && !leak(a));
console.log('anonymous RSC no leak:', !leak(rsc));
process.exit(leak(p) && a.includes('公開版タイトル') && !leak(a) && !leak(rsc) ? 0 : 1);
