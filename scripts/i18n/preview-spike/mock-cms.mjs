// Mock Content API: published data for everyone, drafts only with X-Preview-Key (the CMS contract of 12 §8).
import http from 'node:http';
const KEY = process.env.SPIKE_PREVIEW_KEY;
const PUBLISHED = { 'pub-1': { title: '公開版タイトル', body: '公開版本文', seo: '公開版SEO' } };
const DRAFTS = {
  'pub-1': { title: '改訂版ドラフト秘密', body: '改訂版ドラフト本文秘密', seo: '改訂版SEO秘密' },
  'draft-1': { title: '下書き秘密タイトル', body: '下書き秘密本文', seo: '下書きSEO秘密' },
};
export const log = [];
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const slug = url.pathname.split('/').pop();
  const preview = url.searchParams.get('preview') === '1';
  const keyOk = req.headers['x-preview-key'] === KEY;
  log.push({ slug, preview, keySent: Boolean(req.headers['x-preview-key']) });
  if (url.pathname === '/log') { res.end(JSON.stringify(log)); return; }
  const data = preview && keyOk ? DRAFTS[slug] ?? PUBLISHED[slug] : PUBLISHED[slug];
  if (preview && !keyOk) { res.writeHead(401); res.end('{"error":"unauthorized"}'); return; }
  if (!data) { res.writeHead(404); res.end('{"error":"not_found"}'); return; }
  res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(data));
}).listen(3998, '127.0.0.1');
