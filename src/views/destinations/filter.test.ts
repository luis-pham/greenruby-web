import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fold, matchesFilter } from './filter.ts';

const sungSot = { bay: 'ha-long', category: 'cave', name: 'Hang Sửng Sốt', summary: 'Hang lớn trên đảo Bồ Hòn', categoryLabel: 'Hang động' };
const all = { bay: 'all', category: 'all', query: '' };

test('fold removes Vietnamese diacritics', () => {
  assert.equal(fold('Hang Sửng Sốt, Đảo Ti Tốp'), 'hang sung sot, dao ti top');
});

test('matchesFilter: bay, category and accent-insensitive search', () => {
  assert.ok(matchesFilter(sungSot, all));
  assert.ok(matchesFilter(sungSot, { ...all, query: 'sung sot' }));
  assert.ok(matchesFilter(sungSot, { ...all, query: 'BO HON hang' }));
  assert.ok(!matchesFilter(sungSot, { ...all, query: 'ti top' }));
  assert.ok(!matchesFilter(sungSot, { ...all, bay: 'lan-ha' }));
  assert.ok(matchesFilter(sungSot, { bay: 'ha-long', category: 'cave', query: '' }));
  assert.ok(!matchesFilter(sungSot, { ...all, category: 'village' }));
});
