import type { Locale } from '@/lib/i18n';
import type { Messages } from '@/messages';
import type { ServerBooking } from './api';
import type { BookingPayload, PayloadInput } from './payment';
import { buildBookingPayload } from './payment';
import { displayCabinPrice, roundPrice, toCabinPricing, type Currency, type Guests } from './pricing';
import type { State } from './state';

export type T = Messages['booking'];

/** Replaces {name} placeholders. Messages stay plain strings so they can be passed to the client. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

export function durationLabel(t: T, days: number | null | undefined): string {
  if (!days || days < 1) return '';
  const nights = Math.max(0, days - 1);
  return fmt(nights === 1 ? t.durationOne : t.durationMany, { days, nights });
}

/** "2026-03-04" -> "4 Mar 2026" (en) / "04/03/2026" (vi), without timezone shifts. */
export function formatDate(locale: Locale, ymd: string | null | undefined): string {
  if (!ymd) return '';
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return ymd;
  const date = new Date(y, m - 1, d);
  return locale === 'vi'
    ? new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
    : new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

export function todayYmd(): string {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
}

/** Accepts the ?start_at formats the Laravel page understood: Y-m-d, d-m-Y and d/m/Y. */
export function normalizeQueryDate(raw: string | null): string | null {
  const value = raw?.trim();
  if (!value) return null;
  let m = /^(\d{2})[-/](\d{2})[-/](\d{4})$/.exec(value);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? value : null;
}

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** The API returns absolute asset URLs; /upload paths go through the thumbnail loader instead. */
export function mediaSrc(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const path = new URL(url, 'http://local').pathname;
    return path.startsWith('/upload/') ? path : url;
  } catch {
    return null;
  }
}

export function guestsText(t: T, g: Partial<Guests>): string {
  const s = t.guestShort;
  const parts: string[] = [];
  const a = g.adults ?? 0;
  const c612 = g.children_6_12 ?? 0;
  const c25 = g.children_2_5 ?? 0;
  const inf = g.infants ?? 0;
  if (a > 0) parts.push(`${a} ${a > 1 ? s.adults : s.adult}`);
  if (c612 > 0) parts.push(`${c612} ${s.child612}`);
  if (c25 > 0) parts.push(`${c25} ${s.child25}`);
  if (inf > 0) parts.push(`${inf} ${inf > 1 ? s.infants : s.infant}`);
  return parts.join(', ');
}

export function cabinDescription(t: T, cabin: { capacity: number; view: string | null; area: number | null; summary: string | null }): string {
  const parts: string[] = [];
  if (cabin.capacity > 0) parts.push(fmt(t.maxGuests, { count: cabin.capacity }));
  if (cabin.view) parts.push(cabin.view);
  if (cabin.area && cabin.area > 0) parts.push(fmt(t.roomSize, { area: cabin.area }));
  return parts.length ? parts.join(', ') : (cabin.summary ?? '');
}

/** Selected cabins with their display fare. */
export function pricedRooms(state: State, currency: Currency) {
  return state.rooms.flatMap((room) => {
    const cabin = state.cabins.find((c) => c.id === room.cabinId);
    if (!cabin) return [];
    const unitPrice = displayCabinPrice(toCabinPricing(cabin, state.itinerary?.duration), room.guests, cabin.min_price, currency);
    return [{ room, cabin, unitPrice }];
  });
}

export function selectedAmenities(state: State, currency: Currency) {
  return state.amenities.flatMap((a) => {
    const quantity = state.amenityQty[a.id] ?? 0;
    if (quantity <= 0) return [];
    const unitPrice = roundPrice(a.price ?? 0, currency);
    return [{ amenity: a, quantity, unitPrice, total: roundPrice(unitPrice * quantity, currency) }];
  });
}

export function payloadFromState(state: State, t: T, currency: Currency): BookingPayload {
  const input: PayloadInput = {
    date: state.date,
    itinerary: state.itinerary,
    durationLabel: durationLabel(t, state.itinerary?.duration),
    guest: state.guest,
    rooms: pricedRooms(state, currency).map(({ room, cabin, unitPrice }) => ({
      cabinId: cabin.id,
      name: cabin.name,
      description: cabinDescription(t, cabin),
      unitPrice,
      guests: room.guests,
    })),
    amenities: selectedAmenities(state, currency).map(({ amenity, quantity, unitPrice }) => ({ id: amenity.id, name: amenity.name, unitPrice, quantity })),
    currency,
  };
  return buildBookingPayload(input);
}

export type SummaryModel = {
  voyage: string | null;
  cruise: string | null;
  duration: string | null;
  destination: string | null;
  date: string | null;
  guestsTotal: number;
  cabins: { name: string; count: number; guests: string; total: number }[];
  amenities: { name: string; quantity: number; total: number }[];
  total: number;
  currency: Currency;
  code: string | null;
};

function groupCabins(rows: { name: string; count: number; guests: string; total: number }[]) {
  const grouped = new Map<string, { name: string; count: number; guests: string[]; total: number }>();
  for (const row of rows) {
    const entry = grouped.get(row.name) ?? { name: row.name, count: 0, guests: [], total: 0 };
    entry.count += row.count;
    entry.total += row.total;
    if (row.guests) entry.guests.push(row.guests);
    grouped.set(row.name, entry);
  }
  return [...grouped.values()].map((g) => ({ name: g.name, count: g.count, guests: g.guests.join(' | '), total: g.total }));
}

export function summaryFromState(state: State, t: T, currency: Currency): SummaryModel {
  const rooms = pricedRooms(state, currency);
  const amenities = selectedAmenities(state, currency);
  const cabinsTotal = rooms.reduce((sum, r) => sum + r.unitPrice, 0);
  const amenitiesTotal = amenities.reduce((sum, a) => sum + a.total, 0);
  return {
    voyage: state.itinerary?.name ?? null,
    cruise: state.itinerary?.cruise_name ?? null,
    duration: durationLabel(t, state.itinerary?.duration) || null,
    destination: state.itinerary?.destination || null,
    date: state.date || null,
    guestsTotal: rooms.reduce((sum, { room: { guests: g } }) => sum + g.adults + g.children_6_12 + g.children_2_5 + g.infants, 0),
    cabins: groupCabins(rooms.map(({ cabin, room, unitPrice }) => ({ name: cabin.name, count: 1, guests: guestsText(t, room.guests), total: unitPrice }))),
    amenities: amenities.map((a) => ({ name: a.amenity.name, quantity: a.quantity, total: a.total })),
    total: roundPrice(cabinsTotal + amenitiesTotal, currency),
    currency,
    code: null,
  };
}

/** Summary rebuilt from the booking the server stored, after returning from a payment gateway. */
export function summaryFromBooking(booking: ServerBooking, t: T, fallback: Currency): SummaryModel {
  const currency: Currency = booking.currency === 'vnd' ? 'vnd' : booking.currency === 'usd' ? 'usd' : fallback;
  return {
    voyage: booking.itinerary_name ?? null,
    cruise: booking.cruise_name ?? null,
    duration: booking.itinerary_duration_label ?? null,
    destination: booking.destination ?? null,
    date: booking.departure_date ?? null,
    guestsTotal: booking.guests_total ?? 0,
    cabins: groupCabins(
      (booking.cabins ?? []).map((c) => ({ name: c.cabin_name || 'Cabin', count: c.quantity ?? 1, guests: guestsText(t, c), total: Number(c.total_price) || 0 })),
    ),
    amenities: (booking.amenities ?? []).map((a) => ({ name: a.amenity_name, quantity: a.quantity ?? 0, total: Number(a.total_price) || 0 })),
    total: Number(booking.total_amount) || 0,
    currency,
    code: booking.code ?? null,
  };
}
