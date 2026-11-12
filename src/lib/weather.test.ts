import assert from 'node:assert/strict';
import { test } from 'node:test';
import { condition, parseForecast, showsWeather } from './weather-forecast.ts';

const entry = (time: string, temp: number, opts: { s1?: string; s6?: string; p1?: number; p6?: number } = {}) => ({
  time,
  data: {
    instant: { details: { air_temperature: temp, wind_speed: 5, wind_from_direction: 40, relative_humidity: 80 } },
    ...(opts.s1 && { next_1_hours: { summary: { symbol_code: opts.s1 }, details: { precipitation_amount: opts.p1 ?? 0 } } }),
    ...(opts.s6 && { next_6_hours: { summary: { symbol_code: opts.s6 }, details: { precipitation_amount: opts.p6 ?? 0 } } }),
  },
});

test('MET symbol codes map to conditions', () => {
  assert.equal(condition('clearsky_day'), 'clear');
  assert.equal(condition('fair_night'), 'partly');
  assert.equal(condition('lightrainshowers_day'), 'lightRain');
  assert.equal(condition('heavyrain'), 'heavyRain');
  assert.equal(condition('rainandthunder'), 'thunder');
  assert.equal(condition('rainshowers_day'), 'rain');
  assert.equal(condition(undefined), null);
});

test('current conditions and the next Vietnam calendar days', () => {
  // 2026-11-12 14:00Z = 21:00 in Vietnam; the next day starts at 17:00Z.
  const series = [
    entry('2026-11-12T14:00:00Z', 21.7, { s1: 'rain', s6: 'heavyrain', p1: 0.5, p6: 7 }),
    entry('2026-11-12T15:00:00Z', 21.2, { s1: 'rain', s6: 'rain', p1: 1 }),
    // 13 Nov (VN): hourly 17:00Z..., then six-hourly
    entry('2026-11-12T17:00:00Z', 20, { s1: 'cloudy', s6: 'cloudy', p1: 0.2 }),
    entry('2026-11-12T18:00:00Z', 19, { s1: 'cloudy', s6: 'cloudy', p1: 0.3 }),
    entry('2026-11-13T00:00:00Z', 22, { s1: 'fair_day', s6: 'fair_day' }),
    entry('2026-11-13T06:00:00Z', 26.4, { s1: 'rainshowers_day', s6: 'lightrain', p6: 2 }),
    entry('2026-11-13T12:00:00Z', 23, { s6: 'cloudy', p6: 0 }),
    entry('2026-11-13T18:00:00Z', 18.6, { s6: 'clearsky_night' }),
  ];
  const w = parseForecast({ properties: { meta: { updated_at: '2026-11-12T13:18:47Z' }, timeseries: series } }, Date.parse('2026-11-12T14:20:00Z'));
  assert.ok(w);
  assert.deepEqual(w.now, { temp: 22, wind: 18, windFrom: 40, humidity: 80, condition: 'rain', rain6h: 7 });
  // Today (12 Nov) is not in the outlook; 13 Nov takes its most severe summary (lightrain); 14 Nov has too few entries.
  assert.equal(w.days.length, 1);
  assert.deepEqual(w.days[0], { date: '2026-11-13', min: 19, max: 26, rain: 2.2, condition: 'lightRain' });
});

test('unusable data gives null', () => {
  assert.equal(parseForecast({ properties: { meta: { updated_at: 'x' }, timeseries: [] } }), null);
});

test('only the listed articles show the panel', () => {
  assert.equal(showsWeather('vi', 'di-ha-long-mua-nao-dep'), true);
  assert.equal(showsWeather('vi', 'best-time-to-visit-halong-bay'), false);
  assert.equal(showsWeather('en', null), false);
});
