// Static "slippy map" maths: which OpenStreetMap tiles cover a set of points and where each point sits,
// so the map renders as plain HTML (tiles as <img>, pins as links) with no map library or client JS.

export const TILE_SIZE = 256;
export const TILE_URL = 'https://tile.openstreetmap.org';

export type LatLng = { lat: number; lng: number };
export type MapTile = { url: string; left: number; top: number; size: number };
export type MapPin = { left: number; top: number };
export type StaticMap = { zoom: number; width: number; height: number; tiles: MapTile[]; pins: MapPin[] };

/** Web Mercator world pixel coordinates at a zoom level. */
export function project({ lat, lng }: LatLng, zoom: number): { x: number; y: number } {
  const scale = TILE_SIZE * 2 ** zoom;
  const sin = Math.sin((lat * Math.PI) / 180);
  return {
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale,
  };
}

/**
 * Highest zoom (up to maxZoom) at which every point fits inside `fill` of a width × height view,
 * the tiles covering that view, and pin positions. Positions and sizes are percentages of the view,
 * so the map scales with its container.
 */
export function staticMap(points: LatLng[], { width = 960, height = 600, maxZoom = 13, minZoom = 8, fill = 0.78 } = {}): StaticMap | null {
  if (points.length === 0) return null;
  let zoom = maxZoom;
  for (; zoom > minZoom; zoom--) {
    const xs = points.map((p) => project(p, zoom).x);
    const ys = points.map((p) => project(p, zoom).y);
    if (Math.max(...xs) - Math.min(...xs) <= width * fill && Math.max(...ys) - Math.min(...ys) <= height * fill) break;
  }
  const projected = points.map((p) => project(p, zoom));
  const cx = (Math.min(...projected.map((p) => p.x)) + Math.max(...projected.map((p) => p.x))) / 2;
  const cy = (Math.min(...projected.map((p) => p.y)) + Math.max(...projected.map((p) => p.y))) / 2;
  const x0 = cx - width / 2;
  const y0 = cy - height / 2;
  const max = 2 ** zoom - 1;

  const tiles: MapTile[] = [];
  for (let ty = Math.floor(y0 / TILE_SIZE); ty <= Math.floor((y0 + height) / TILE_SIZE); ty++) {
    for (let tx = Math.floor(x0 / TILE_SIZE); tx <= Math.floor((x0 + width) / TILE_SIZE); tx++) {
      if (ty < 0 || ty > max) continue;
      tiles.push({
        url: `${TILE_URL}/${zoom}/${((tx % (max + 1)) + max + 1) % (max + 1)}/${ty}.png`,
        left: ((tx * TILE_SIZE - x0) / width) * 100,
        top: ((ty * TILE_SIZE - y0) / height) * 100,
        size: (TILE_SIZE / width) * 100,
      });
    }
  }
  const pins = projected.map((p) => ({ left: ((p.x - x0) / width) * 100, top: ((p.y - y0) / height) * 100 }));
  return { zoom, width, height, tiles, pins };
}

/** Google Maps search link for a point (opens the app on phones). */
export function mapsLink({ lat, lng }: LatLng): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat.toFixed(6)},${lng.toFixed(6)}`;
}
