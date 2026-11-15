// Wizard state: free entry (no listed departures). Run with `npm test`.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Cabin, Itinerary } from './api';
import { initialState, reducer, type State } from './state.ts';

const voyage = (itinerary_id: number, cruise_id: number, duration: number): Itinerary => ({
  id: `${itinerary_id}-${cruise_id}`,
  itinerary_id,
  cruise_id,
  name: `Voyage ${itinerary_id}`,
  cruise_name: `Green Ruby ${cruise_id - 2}`,
  duration,
  duration_label: '',
  destination: '',
});
const VOYAGES = [voyage(3, 3, 3), voyage(4, 3, 2), voyage(1, 4, 3), voyage(2, 4, 2)];
const cabin = (id: number): Cabin => ({
  id,
  name: `Cabin ${id}`,
  summary: null,
  view: null,
  capacity: 2,
  over_capacity_adult: 0,
  over_capacity_child_6_12: 0,
  over_capacity_child_2_5: 0,
  over_capacity_infant: 0,
  area: null,
  cruise_id: 3,
  cruise_name: 'Green Ruby 1',
  min_price: 500,
  image_url: null,
  prices: {},
});

const start = (): State => initialState('stripe', true);

describe('booking state: free entry (no listed departures)', () => {
  it('boots request-only and loads the voyages without a date', () => {
    const s = reducer(start(), { type: 'boot', dates: [], date: '', prefill: null });
    assert.equal(s.freeEntry, true);
    assert.equal(s.itinerariesStatus, 'loading');
    assert.equal(s.paymentAllowed, false);
    assert.equal(s.confirmation, 'inquiry');
  });

  it('keeps payment closed when the policy arrives later', () => {
    const s = reducer(reducer(start(), { type: 'boot', dates: [], date: '', prefill: null }), { type: 'policyLoaded', policy: null, paymentAllowed: true });
    assert.equal(s.paymentAllowed, false);
    assert.equal(s.confirmation, 'inquiry');
  });

  it('listed departures behave as before', () => {
    const s = reducer(start(), { type: 'boot', dates: ['2027-03-01'], date: '', prefill: null });
    assert.equal(s.freeEntry, false);
    assert.equal(s.itinerariesStatus, 'idle');
    assert.equal(reducer(s, { type: 'policyLoaded', policy: null, paymentAllowed: true }).paymentAllowed, true);
  });

  it('a cabin link selects its voyage and cabin, and a date change keeps them', () => {
    let s = reducer(start(), { type: 'boot', dates: [], date: '', prefill: { itineraryId: 3, cruiseId: 3, cabinId: 24 } });
    s = reducer(s, { type: 'itinerariesLoaded', date: '', items: VOYAGES });
    assert.equal(s.itinerary?.id, '3-3');
    s = reducer(s, { type: 'cabinsLoaded', itineraryId: '3-3', items: [cabin(8), cabin(24)] });
    assert.deepEqual(s.rooms.map((r) => r.cabinId), [24]);
    s = reducer(s, { type: 'setDate', date: '2027-03-10' });
    assert.equal(s.date, '2027-03-10');
    assert.equal(s.itinerary?.id, '3-3');
    assert.equal(s.rooms.length, 1);
  });

  it('a cabin link with only the ship opens its shortest voyage', () => {
    let s = reducer(start(), { type: 'boot', dates: [], date: '', prefill: { itineraryId: null, cruiseId: 4, cabinId: 72 } });
    s = reducer(s, { type: 'itinerariesLoaded', date: '', items: VOYAGES });
    assert.equal(s.itinerary?.id, '2-4');
  });
});
