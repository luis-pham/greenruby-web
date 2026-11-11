// The homepage "Life on board" icon is picked from the facility name, in every site language.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { facilityKind } from './facility-kind.ts';

test('facility names map to the same icon in every language', () => {
  const cases: [string, string][] = [
    ['Main Restaurant', 'dining'], ['Restaurant principal', 'dining'], ['Restaurante principal', 'dining'], ['メインレストラン', 'dining'],
    ['Sky Bar & Lounge', 'bar'],
    ['Sundeck Pool', 'pool'], ['Piscine du pont soleil', 'pool'], ['Piscina superior', 'pool'], ['サンデッキのプール', 'pool'], ['Hồ bơi', 'pool'],
    ['Spa & Wellness Centre', 'wellness'], ['Spa et centre de bien-être', 'wellness'], ['Spa y bienestar', 'wellness'],
    ['Imperial Suite', 'cabin'], ['Camarote', 'cabin'],
    ['Lower Energy Use', 'default'], ['Menor consumo energético', 'default'],
  ];
  for (const [name, kind] of cases) assert.equal(facilityKind(name), kind, name);
});
