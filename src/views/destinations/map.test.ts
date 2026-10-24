import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mapsLink, project, staticMap } from './map.ts';

test('project: Greenwich/equator is the centre of the world', () => {
  const { x, y } = project({ lat: 0, lng: 0 }, 1);
  assert.equal(x, 256);
  assert.ok(Math.abs(y - 256) < 1e-9);
});

const bay = [
  { lat: 20.844753, lng: 107.090432 }, // Sung Sot
  { lat: 20.858053, lng: 107.081012 }, // Ti Top
  { lat: 20.801367, lng: 107.125097 }, // Cua Van
  { lat: 20.800882, lng: 107.040609 }, // Viet Hai
];

test('staticMap: every pin is inside the view and tiles cover it', () => {
  const map = staticMap(bay)!;
  assert.equal(map.zoom, 13);
  for (const pin of map.pins) {
    assert.ok(pin.left > 0 && pin.left < 100, `left ${pin.left}`);
    assert.ok(pin.top > 0 && pin.top < 100, `top ${pin.top}`);
  }
  const minLeft = Math.min(...map.tiles.map((t) => t.left));
  const maxRight = Math.max(...map.tiles.map((t) => t.left + t.size));
  assert.ok(minLeft <= 0 && maxRight >= 100);
  assert.ok(map.tiles.every((t) => t.url.startsWith('https://tile.openstreetmap.org/13/')));
});

test('staticMap: zooms out for far-apart points and returns null without points', () => {
  const wide = staticMap([...bay, { lat: 21.028, lng: 105.854 }])!; // + Hanoi
  assert.ok(wide.zoom < 13);
  assert.equal(staticMap([]), null);
});

test('mapsLink uses 6 decimals', () => {
  assert.equal(mapsLink({ lat: 20.8, lng: 107.1 }), 'https://www.google.com/maps/search/?api=1&query=20.800000,107.100000');
});
