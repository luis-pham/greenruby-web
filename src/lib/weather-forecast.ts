import type { Locale } from './i18n.ts';

/**
 * Live bay weather (current conditions + three-day outlook) from MET Norway's Locationforecast 2.0
 * (https://api.met.no, free for commercial use, CC BY 4.0 / NLOD: credit "MET Norway"). Their terms require an
 * identifying User-Agent and caching: the page fetches at most once per bay every 30 minutes on the server; visitors
 * never call api.met.no.
 */

export const BAYS = {
  // Open water south-east of Bai Chay, between Sung Sot and Ti Top (Green Ruby 1's area).
  halong: { lat: 20.88, lon: 107.1, ship: 'Green Ruby 1' },
  // Lan Ha Bay, east of Cat Ba Island (Green Ruby 2's area).
  lanha: { lat: 20.77, lon: 107.08, ship: 'Green Ruby 2' },
} as const;
export type Bay = keyof typeof BAYS;

/**
 * Journal articles that show the live weather panel, by language and article slug (app_article.slug, stable when a
 * title is edited). The panel heading carries each language's "weather today" query.
 */
const WEATHER_ARTICLES: ReadonlySet<string> = new Set([
  'en/best-time-to-visit-halong-bay',
  'en/best-time-to-visit-lan-ha-bay', // unpublished as of 2026-11-12
  'vi/di-ha-long-mua-nao-dep',
  'ja/best-time-to-visit-halong-bay',
  'fr/quand-partir-en-baie-d-halong',
  'es/mejor-epoca-para-visitar-la-bahia-de-halong',
]);

export const showsWeather = (locale: Locale, slug: string | null | undefined): boolean => !!slug && WEATHER_ARTICLES.has(`${locale}/${slug}`);

/** Simplified condition, enough for a label and an icon. Ordered from mildest to most severe. */
export const CONDITIONS = ['clear', 'partly', 'cloudy', 'fog', 'lightRain', 'rain', 'heavyRain', 'thunder'] as const;
export type Condition = (typeof CONDITIONS)[number];

export type DayForecast = { date: string; min: number; max: number; rain: number; condition: Condition };
export type BayWeather = {
  /** ISO time of the forecast run (MET's updated_at). */
  updatedAt: string;
  now: { temp: number; wind: number; windFrom: number; humidity: number; condition: Condition; rain6h: number };
  days: DayForecast[];
};

/** MET symbol_code ("lightrainshowers_day", "partlycloudy_night", ...) to a condition. */
export function condition(symbol: string | undefined): Condition | null {
  if (!symbol) return null;
  const s = symbol.replace(/_(day|night|polartwilight)$/, '');
  if (s.includes('thunder')) return 'thunder';
  if (s === 'clearsky') return 'clear';
  if (s === 'fair' || s === 'partlycloudy') return 'partly';
  if (s === 'cloudy') return 'cloudy';
  if (s === 'fog') return 'fog';
  if (s.startsWith('heavy')) return 'heavyRain';
  if (s.startsWith('light')) return 'lightRain';
  return 'rain'; // rain, rainshowers, sleet, snow
}

const VN_OFFSET_MS = 7 * 3600_000; // Asia/Ho_Chi_Minh, no daylight saving
const vnDate = (iso: string) => new Date(Date.parse(iso) + VN_OFFSET_MS).toISOString().slice(0, 10);

type Entry = {
  time: string;
  data: {
    instant: { details: { air_temperature?: number; wind_speed?: number; wind_from_direction?: number; relative_humidity?: number } };
    next_1_hours?: { summary?: { symbol_code?: string }; details?: { precipitation_amount?: number } };
    next_6_hours?: { summary?: { symbol_code?: string }; details?: { precipitation_amount?: number } };
  };
};
export type Forecast = { properties: { meta: { updated_at: string }; timeseries: Entry[] } };

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Current conditions and the next three Vietnam calendar days (tomorrow on). null when the data is unusable. */
export function parseForecast(json: Forecast, nowMs = Date.now()): BayWeather | null {
  const series = json?.properties?.timeseries?.filter((e) => typeof e.data?.instant?.details?.air_temperature === 'number') ?? [];
  // The first entry is the current hour; skip anything older than an hour (stale cache upstream).
  const current = series.find((e) => Date.parse(e.time) > nowMs - 3600_000);
  if (!current) return null;
  const d = current.data.instant.details;
  const nowCondition = condition(current.data.next_1_hours?.summary?.symbol_code ?? current.data.next_6_hours?.summary?.symbol_code);
  if (!nowCondition) return null;

  const today = vnDate(new Date(nowMs).toISOString());
  const byDay = new Map<string, { temps: number[]; rain: number; symbols: Map<number, string> }>();
  series.forEach((e, i) => {
    const date = vnDate(e.time);
    if (date <= today) return;
    const day = byDay.get(date) ?? { temps: [] as number[], rain: 0, symbols: new Map<number, string>() };
    day.temps.push(e.data.instant.details.air_temperature as number);
    // Rain: integrate over the step to the next entry (hourly for ~2.5 days, then six-hourly).
    const next = series[i + 1];
    const step = next ? (Date.parse(next.time) - Date.parse(e.time)) / 3600_000 : 0;
    if (step === 1) day.rain += e.data.next_1_hours?.details?.precipitation_amount ?? 0;
    else if (step === 6) day.rain += e.data.next_6_hours?.details?.precipitation_amount ?? 0;
    // The four six-hour summaries of the day: from 01:00, 07:00, 13:00 and 19:00 Vietnam time (18, 00, 06, 12 UTC).
    const utcHour = new Date(e.time).getUTCHours();
    const symbol = e.data.next_6_hours?.summary?.symbol_code;
    if (symbol && utcHour % 6 === 0) day.symbols.set(utcHour, symbol);
    byDay.set(date, day);
  });

  const days: DayForecast[] = [];
  for (const [date, day] of byDay) {
    // The most severe of the day's summaries, so a day with rain is never labelled "partly cloudy".
    const c = [...day.symbols.values()].map(condition).reduce<Condition | null>(
      (worst, x) => (x && (!worst || CONDITIONS.indexOf(x) > CONDITIONS.indexOf(worst)) ? x : worst),
      null,
    );
    // A day needs most of its hours (the last day of the series is cut short).
    if (!c || day.temps.length < 3) continue;
    days.push({ date, min: Math.round(Math.min(...day.temps)), max: Math.round(Math.max(...day.temps)), rain: round1(day.rain), condition: c });
    if (days.length === 3) break;
  }

  return {
    updatedAt: json.properties.meta.updated_at,
    now: {
      temp: Math.round(d.air_temperature as number),
      wind: Math.round((d.wind_speed ?? 0) * 3.6),
      windFrom: Math.round(d.wind_from_direction ?? 0),
      humidity: Math.round(d.relative_humidity ?? 0),
      condition: nowCondition,
      rain6h: round1(current.data.next_6_hours?.details?.precipitation_amount ?? 0),
    },
    days,
  };
}
