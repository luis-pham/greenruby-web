import assert from 'node:assert/strict';
import { test } from 'node:test';
import { backBy, earliestFlight, leaveBy, toClock, toMinutes } from './transfer.ts';

test('clock helpers', () => {
  assert.equal(toMinutes('10:45'), 645);
  assert.equal(toClock(645), '10:45');
  assert.equal(toClock(-15), '23:45');
});

test('leaveBy uses the long estimate plus a 30 minute buffer', () => {
  assert.equal(leaveBy('hanoi'), '07:15'); // 10:45 - 3h - 30m
  assert.equal(leaveBy('hanoi', true), '06:45'); // shared shuttle: +30m
  assert.equal(leaveBy('catbi'), '09:05');
  assert.equal(leaveBy('ninhbinh'), '06:15');
});

test('earliest flights on the last day', () => {
  // 11:30 + 3h + 30m = 15:00 at Noi Bai; +1h30 domestic, +3h international.
  assert.equal(earliestFlight('noibai', 'domestic'), '16:30');
  assert.equal(earliestFlight('noibai', 'international'), '18:00');
  assert.equal(earliestFlight('catbi', 'domestic'), '14:40'); // 11:30 + 70m + 30m + 1h30
});

test('back in Hanoi', () => {
  assert.equal(backBy('hanoi'), '14:30');
});
