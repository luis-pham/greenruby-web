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

test('a new language links its own hubs only when they are public (phase 2C), otherwise the English page', () => {
  const closed = travelGuideLinks('ja', labels, [], ['home', 'contact']);
  assert.equal(closed.find((l) => l.key === 'travelJournal')?.href, '/blog');
  assert.equal(closed.find((l) => l.key === 'destinations')?.href, '/destinations');
  const open = travelGuideLinks('ja', labels, [], ['destinations', 'blog']);
  assert.equal(open.find((l) => l.key === 'travelJournal')?.href, '/ja/blog');
  assert.equal(open.find((l) => l.key === 'destinations')?.href, '/ja/destinations');
  assert.deepEqual(travelGuideLinks('vi', labels, [], undefined).map((l) => l.href), travelGuideLinks('vi', labels).map((l) => l.href));
});
