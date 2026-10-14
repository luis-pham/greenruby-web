/**
 * Browser client for the Laravel booking and payment API. URLs are relative: Nginx routes /api/booking
 * and /api/payment to Laravel in production, and next.config.ts rewrites them in development.
 * Response shapes: app/Http/Controllers/Api/{BookingApiController,PaymentController}.php.
 */

import type { Locale } from '@/lib/i18n';
import type { BookingPayload, PaymentInitBody } from './payment';

export type Itinerary = {
  /** "{itineraryId}-{cruiseId}", sent back as booking.itinerary_id. */
  id: string;
  itinerary_id: number;
  cruise_id: number;
  name: string;
  cruise_name: string;
  duration: number;
  duration_label: string;
  destination: string;
};

export type ItineraryDetail = { activities: { id: number; name: string }[]; destinations: string[] };

export type Cabin = {
  id: number;
  name: string;
  summary: string | null;
  view: string | null;
  capacity: number;
  over_capacity_adult: number | null;
  over_capacity_child_6_12: number | null;
  over_capacity_child_2_5: number | null;
  over_capacity_infant: number | null;
  area: number | null;
  cruise_id: number | null;
  cruise_name: string | null;
  min_price: number | null;
  image_url: string | null;
  prices: unknown;
};

export type Amenity = { id: number; name: string; description: string | null; price: number | null; image_url: string | null };

export type Suggestion = { cruise_id: number; itinerary_id: number; date: string | null };

/** Booking as returned by GET /api/payment/status when the status token is valid. */
export type ServerBooking = {
  code?: string;
  departure_date?: string | null;
  itinerary_name?: string | null;
  cruise_name?: string | null;
  itinerary_duration_label?: string | null;
  destination?: string | null;
  guests_total?: number;
  currency?: string;
  total_amount?: number;
  cabins?: { cabin_name: string; quantity?: number; adults?: number; children_6_12?: number; children_2_5?: number; infants?: number; total_price?: number }[];
  amenities?: { amenity_name: string; quantity?: number; total_price?: number }[];
};

export type PaymentStatus = { success: boolean; status?: string; booking?: ServerBooking | null };

type Json = Record<string, unknown>;

async function getJson(path: string, params: Record<string, string | number | null | undefined>, signal?: AbortSignal): Promise<Json> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== '') query.set(key, String(value));
  }
  const qs = query.toString();
  const res = await fetch(qs ? `${path}?${qs}` : path, { headers: { Accept: 'application/json' }, signal });
  return (await res.json()) as Json;
}

async function postJson(path: string, body: unknown): Promise<{ ok: boolean; status: number; data: Json | null }> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => null)) as Json | null;
  return { ok: res.ok, status: res.status, data };
}

function items<T>(data: Json): T[] {
  if (!data.success || !Array.isArray(data.items)) throw new Error('Unexpected response');
  return data.items as T[];
}

export const bookingApi = {
  async departureDates(lang: Locale, filter: { cruiseId?: string | null; itineraryId?: string | null }, signal?: AbortSignal): Promise<string[]> {
    const data = await getJson('/api/booking/departure-dates', { lang, cruise_id: filter.cruiseId, itinerary_id: filter.itineraryId }, signal);
    return items<{ start_at: string | null }>(data).flatMap((it) => (it.start_at ? [it.start_at] : []));
  },

  /** Voyages sailing on `date` (Y-m-d), one per itinerary. */
  async itineraries(lang: Locale, date: string, signal?: AbortSignal): Promise<Itinerary[]> {
    return items<Itinerary>(await getJson('/api/booking/itineraries', { lang, unique: 'itinerary', date }, signal));
  },

  async itineraryDetail(itineraryId: number, signal?: AbortSignal): Promise<ItineraryDetail> {
    const data = await getJson(`/api/booking/itinerary/${encodeURIComponent(itineraryId)}`, {}, signal);
    if (!data.success) throw new Error('Unexpected response');
    return {
      activities: Array.isArray(data.activities) ? (data.activities as ItineraryDetail['activities']) : [],
      destinations: Array.isArray(data.destinations) ? (data.destinations as string[]).map(String) : [],
    };
  },

  async cabins(lang: Locale, cruiseId: number, duration: number | null, signal?: AbortSignal): Promise<Cabin[]> {
    return items<Cabin>(await getJson('/api/booking/cabins', { lang, cruise_id: cruiseId, duration: duration && duration > 0 ? duration : null }, signal));
  },

  async amenities(lang: Locale, itineraryId: number | null, signal?: AbortSignal): Promise<Amenity[]> {
    return items<Amenity>(await getJson('/api/booking/amenities', { lang, itinerary_id: itineraryId }, signal));
  },

  /** Earliest upcoming voyage for a cabin (?cabin_id) or a ship (?cruise_id), used to prefill step 1. */
  async suggest(lang: Locale, by: { cabinId?: string | null; cruiseId?: string | null }, signal?: AbortSignal): Promise<Suggestion | null> {
    const data = by.cabinId
      ? await getJson('/api/booking/suggest-by-cabin', { cabin_id: by.cabinId, lang }, signal)
      : by.cruiseId
        ? await getJson('/api/booking/suggest-by-cruise', { cruise_id: by.cruiseId, lang }, signal)
        : null;
    if (!data || !data.success || !data.date) return null;
    return { cruise_id: Number(data.cruise_id) || 0, itinerary_id: Number(data.itinerary_id) || 0, date: String(data.date) };
  },

  inquiry(booking: BookingPayload & { currency: string }) {
    return postJson('/api/booking/inquiry', { booking });
  },

  initPayment(body: PaymentInitBody) {
    return postJson('/api/payment/init', body);
  },

  cancelPayment(internalTxId: string, token: string) {
    return postJson('/api/payment/cancel', { internal_tx_id: internalTxId, token });
  },

  async paymentStatus(params: { internal_tx_id?: string; tx?: string; result?: string; token?: string | null }): Promise<PaymentStatus> {
    const data = await getJson('/api/payment/status', params);
    return { success: Boolean(data.success), status: typeof data.status === 'string' ? data.status : undefined, booking: (data.booking as ServerBooking | null) ?? null };
  },
};
