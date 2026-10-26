import { TILE_UPSTREAM, tileAllowed } from '@/views/destinations/map';

/**
 * /map-tiles/{z}/{x}/{y} (no .png: Nginx routes *.png to Laravel): OpenStreetMap tiles for the destinations map, served from our domain (some
 * Vietnamese networks block openstreetmap.org). Limited to the bays region, cached in memory and by browsers,
 * with an identifying User-Agent as the OSM tile usage policy asks. Attribution stays on the map.
 */
const WEEK = 7 * 24 * 60 * 60;
const MAX_ENTRIES = 600;
const cache = new Map<string, { body: ArrayBuffer; at: number }>();

const pngResponse = (body: ArrayBuffer) =>
  new Response(body, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': `public, max-age=${WEEK}, stale-while-revalidate=${4 * WEEK}` },
  });

export async function GET(_req: Request, { params }: { params: Promise<{ z: string; x: string; y: string }> }) {
  const { z, x, y } = await params;
  if (![z, x, y].every((v) => /^\d+$/.test(v)) || !tileAllowed(Number(z), Number(x), Number(y))) {
    return new Response('Not found', { status: 404 });
  }
  const key = `${z}/${x}/${y}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < WEEK * 1000) return pngResponse(hit.body);

  try {
    const res = await fetch(`${TILE_UPSTREAM}/${key}.png`, {
      headers: { 'User-Agent': 'GreenRubyCruises/1.0 (+https://greenrubycruises.com)' },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    });
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) throw new Error(`upstream ${res.status}`);
    const body = await res.arrayBuffer();
    if (cache.size >= MAX_ENTRIES) cache.delete(cache.keys().next().value!);
    cache.set(key, { body, at: Date.now() });
    return pngResponse(body);
  } catch {
    // Serve a stale copy rather than a hole in the map; otherwise let the browser retry later.
    if (hit) return pngResponse(hit.body);
    return new Response('Tile unavailable', { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
