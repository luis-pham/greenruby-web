import assert from 'node:assert/strict';
import { test } from 'node:test';
import { departureWindow, returnWindow, toClock, toMinutes } from './transfer.ts';

test('clock helpers', () => {
  assert.equal(toMinutes('10:45'), 645);
  assert.equal(toClock(645), '10:45');
  assert.equal(toClock(-15), '23:45');
});

test('departure window: long estimate plus a 60/30 minute margin, rounded down to the quarter', () => {
  assert.deepEqual(departureWindow('hanoi'), ['06:45', '07:15']); // 10:45 - 3h - 60/30m
  assert.deepEqual(departureWindow('hanoi', true), ['06:15', '06:45']); // shared van: +30m
  assert.deepEqual(departureWindow('noibai'), ['06:15', '06:45']); // 3.5h long estimate
  assert.deepEqual(departureWindow('ninhbinh'), ['05:45', '06:15']);
});

test('no figures for routes without a published estimate', () => {
  assert.equal(departureWindow('catbi'), null);
  assert.equal(returnWindow('vandon'), null);
});

test('return window spans earliest disembark + typical to latest disembark + long', () => {
  assert.deepEqual(returnWindow('hanoi'), ['13:30', '14:30']);
  assert.deepEqual(returnWindow('noibai'), ['13:30', '15:00']);
});
