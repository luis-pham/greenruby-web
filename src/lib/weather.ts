import { cacheLife, cacheTag } from 'next/cache';
import { BAYS, parseForecast, type Bay, type BayWeather, type Forecast } from './weather-forecast.ts';

export * from './weather-forecast.ts';

/** Forecast for a bay, cached 30 minutes. null on any failure (the panel is then left out of the page). */
export async function getBayWeather(bay: Bay): Promise<BayWeather | null> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 1800, expire: 86400 });
  cacheTag('weather');
  const { lat, lon } = BAYS[bay];
  try {
    const res = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, {
      headers: { 'User-Agent': 'GreenRubyCruises/1.0 (+https://greenrubycruises.com)', Accept: 'application/json' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    return parseForecast((await res.json()) as Forecast);
  } catch {
    return null;
  }
}
