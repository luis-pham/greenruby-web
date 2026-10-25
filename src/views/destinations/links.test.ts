import assert from 'node:assert/strict';
import { test } from 'node:test';
import { placesForExperience, placesOnItineraries, placesOnItinerary, unlinkHiddenPlaces } from './links.ts';

const sungSot = { slug: 'sung-sot-cave', itineraryIds: [3, 4], experienceIds: [] };
const luon = { slug: 'luon-cave', itineraryIds: [3, 4], experienceIds: [8, 38] };
const darkBright = { slug: 'dark-bright-cave', itineraryIds: [1, 2] };
const items = [sungSot, luon, darkBright];

test('itinerary: only the places linked to it in the CMS', () => {
  assert.deepEqual(placesOnItinerary(items, 3).map((d) => d.slug), ['sung-sot-cave', 'luon-cave']);
  assert.deepEqual(placesOnItinerary(items, 99), []);
});

test("ship: places on any of its itineraries, each once", () => {
  assert.deepEqual(placesOnItineraries(items, [3, 4]).map((d) => d.slug), ['sung-sot-cave', 'luon-cave']);
  assert.deepEqual(placesOnItineraries(items, [1, 3]).map((d) => d.slug), ['sung-sot-cave', 'luon-cave', 'dark-bright-cave']);
});

test('experience: places chosen for it; a CMS without the relation links nothing', () => {
  assert.deepEqual(placesForExperience(items, 8).map((d) => d.slug), ['luon-cave']);
  assert.deepEqual(placesForExperience([darkBright], 8), []);
});

test('hidden hub: an empty destination list links nothing', () => {
  assert.deepEqual(placesOnItinerary([], 3), []);
});

test('CMS links to unpublished places become plain text; live ones stay', () => {
  const live = new Set(['/destinations', '/destinations/sung-sot-cave']);
  const html =
    '<p>See <a href="/destinations/luon-cave">Luon Cave</a>, <a href="https://greenrubycruises.com/destinations/sung-sot-cave#map">Sung Sot</a> and <a href="/destinations">all places</a>.</p>';
  assert.equal(
    unlinkHiddenPlaces(html, live),
    '<p>See Luon Cave, <a href="https://greenrubycruises.com/destinations/sung-sot-cave#map">Sung Sot</a> and <a href="/destinations">all places</a>.</p>',
  );
  assert.equal(unlinkHiddenPlaces('<a href="/vi/dia-diem-tham-quan/hang-luon">Hang Luồn</a>', new Set()), 'Hang Luồn');
  assert.equal(unlinkHiddenPlaces('<a href="/itinerary">Itineraries</a>', new Set()), '<a href="/itinerary">Itineraries</a>');
});
