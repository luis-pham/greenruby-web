import assert from 'node:assert/strict';
import { test } from 'node:test';
import { travelGuideLinks } from './guide-links.ts';

const labels = {
  destinations: 'Places to Visit',
  firstTimeGuide: 'First-Time Cruise Guide',
  transferGuide: 'Hanoi to Ha Long Bay',
  bestTime: 'Best Time to Visit',
  bayComparison: 'Ha Long Bay vs Lan Ha Bay',
  travelJournal: 'Travel Journal',
};

test('travel guide menu: one fixed order, real paths per language', () => {
  const en = travelGuideLinks('en', labels);
  assert.deepEqual(en.map((l) => l.key), ['destinations', 'firstTimeGuide', 'transferGuide', 'bestTime', 'bayComparison', 'travelJournal']);
  assert.equal(en[0].href, '/destinations');
  assert.equal(travelGuideLinks('vi', labels)[1].href, '/vi/cam-nang/lan-dau-di-du-thuyen-ha-long');
});

test('hubs switched off in the CMS are left out of the menu', () => {
  const links = travelGuideLinks('en', labels, ['destinations', 'guide-transfer']);
  assert.deepEqual(links.map((l) => l.key), ['firstTimeGuide', 'bestTime', 'bayComparison', 'travelJournal']);
  assert.ok(links.every((l) => !l.href.startsWith('/destinations') && !l.href.includes('hanoi-to-halong-bay')));
});
