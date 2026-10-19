import 'server-only';
import { cacheLife } from 'next/cache';
import { getCruise, getItinerary, listItineraries } from '@/lib/api/content';
import type { Locale } from '@/lib/i18n';

/** One bookable voyage (ship + itinerary) as the booking widget needs it. */
export type BookingOption = {
  cruiseId: number;
  itineraryId: number;
  name: string;
  cruiseName: string | null;
  duration: number;
  bay: 'ha-long' | 'lan-ha' | null;
  /** YYYY-MM-DD, future only, ascending (Content API, max 60). */
  departures: string[];
  fromPrice: number | null;
  currency: 'USD' | 'VND';
};

export type BookingData = { options: BookingOption[]; demo: boolean };

/**
 * BOOKING_DEMO=1 fills missing departures and prices with sample data so the widget can be reviewed
 * before the real schedule and rates are in the CMS. Never set it on production: guests would see
 * dates that cannot be booked. The widget shows a "Demo data" badge whenever it is on.
 */
const DEMO = process.env.BOOKING_DEMO === '1';

async function optionFor(cruiseId: number, itineraryId: number, locale: Locale): Promise<BookingOption | null> {
  const it = await getItinerary(cruiseId, itineraryId, locale);
  if (!it) return null;
  return {
    cruiseId: it.canonical.cruiseId,
    itineraryId: it.canonical.itineraryId,
    name: it.name,
    cruiseName: it.cruise.name,
    duration: it.duration,
    bay: it.bay,
    departures: it.departures,
    fromPrice: it.fromPrice,
    currency: it.currency,
  };
}

/** Sample departures (about every third day for four months) and rates, stable for a day. */
async function demoFill(options: BookingOption[]): Promise<BookingOption[]> {
  'use cache';
  cacheLife('days');
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  const rate = { USD: { 2: 480, 3: 890 }, VND: { 2: 12_500_000, 3: 23_000_000 } } as const;
  return options.map((o) => {
    const departures = o.departures.length
      ? o.departures
      : Array.from({ length: 120 }, (_, i) => new Date(start.getTime() + (i + 2) * 86_400_000))
          .filter((d) => (d.getUTCDate() + o.itineraryId) % 3 === 0)
          .map((d) => d.toISOString().slice(0, 10));
    const base = rate[o.currency][o.duration === 3 ? 3 : 2];
    // Lan Ha sample rates sit a little above Ha Long.
    const fromPrice = o.fromPrice ?? (o.bay === 'lan-ha' ? Math.round(base * 1.1) : base);
    return { ...o, departures, fromPrice };
  });
}

async function finish(options: (BookingOption | null)[]): Promise<BookingData> {
  const list = options.filter((o): o is BookingOption => o !== null).sort((a, b) => (a.bay ?? '').localeCompare(b.bay ?? '') || a.duration - b.duration);
  return DEMO ? { options: await demoFill(list), demo: true } : { options: list, demo: false };
}

/** The voyage of an itinerary page. */
export async function bookingForItinerary(cruiseId: number, itineraryId: number, locale: Locale): Promise<BookingData> {
  return finish([await optionFor(cruiseId, itineraryId, locale)]);
}

/** Every voyage a ship sails (cruise and cabin pages). */
export async function bookingForCruise(cruiseId: number, locale: Locale): Promise<BookingData> {
  const cruise = await getCruise(cruiseId, locale);
  if (!cruise) return { options: [], demo: DEMO };
  return finish(await Promise.all(cruise.itineraries.map((it) => optionFor(it.cruiseId, it.itineraryId, locale))));
}

/** Every voyage of every ship (homepage search). */
export async function bookingForAll(locale: Locale): Promise<BookingData> {
  const list = await listItineraries(locale);
  return finish(await Promise.all(list.items.map((it) => optionFor(it.cruiseId, it.itineraryId, locale))));
}
