import assert from 'node:assert/strict';
import { test } from 'node:test';
import firstTimeEn from './first-time.en.ts';
import firstTimeVi from './first-time.vi.ts';
import transferEn from './transfer.en.ts';
import transferVi from './transfer.vi.ts';

const guides = { firstTimeEn, firstTimeVi, transferEn, transferVi };

test('every guide lists its sources, as https links with a title', () => {
  for (const [name, g] of Object.entries(guides)) {
    assert.ok(g.sources && g.sources.length > 0, `${name} has no sources`);
    assert.ok(g.sourcesTitle, `${name} has no sources heading`);
    for (const s of g.sources!) {
      assert.match(s.url, /^https:\/\//, `${name}: ${s.url}`);
      assert.ok(s.title.length > 10, `${name}: ${s.url} has no title`);
    }
  }
});

test('EN and VI copies of a guide cite the same number of sources', () => {
  assert.equal(firstTimeEn.sources!.length, firstTimeVi.sources!.length);
  assert.equal(transferEn.sources!.length, transferVi.sources!.length);
});
