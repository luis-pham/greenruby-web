import assert from 'node:assert/strict';
import { test } from 'node:test';
import { caveVisit, destinationMessages, otherPlaces } from './messages.ts';

test('other places: same entries in both languages, each with an official source', () => {
  assert.deepEqual(
    otherPlaces.en.map((p) => p.key),
    otherPlaces.vi.map((p) => p.key),
  );
  for (const p of [...otherPlaces.en, ...otherPlaces.vi]) {
    assert.ok(p.sources.length > 0, `${p.key} has no source`);
    for (const s of p.sources) assert.match(s.url, /^https:\/\/(halongbay\.com\.vn|www\.quangninh\.gov\.vn)\//);
  }
});

test('other places are labelled as not Green Ruby stops', () => {
  assert.match(destinationMessages.en.others.notStop, /not a green ruby stop/i);
  assert.match(destinationMessages.en.others.lede, /do not stop here/i);
  assert.match(destinationMessages.vi.others.lede, /không ghé/);
});

test('Lan Ha kayaking is never presented as available', () => {
  const lanHa = [destinationMessages.en.thingsToDo.kayakNote, caveVisit.en['dark-bright-cave']].join(' ');
  assert.match(lanHa, /suspended/);
  assert.match([destinationMessages.vi.thingsToDo.kayakNote, caveVisit.vi['hang-sang-toi']].join(' '), /tạm dừng/);
});

test('hub metadata stays within search-result lengths', () => {
  for (const m of Object.values(destinationMessages)) {
    assert.ok(m.metaTitle.length <= 60, m.metaTitle);
    assert.ok(m.metaDescription.length <= 155, m.metaDescription);
  }
});
