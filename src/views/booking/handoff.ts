/**
 * Language switching without losing the booking (phase 2B). The wizard keeps its state in memory (useReducer); only
 * the prefill (?cabin_id, ?cruise_id, ?itinerary_id, ?start_at) and the payment return (?result&tx&token) live in
 * the URL. When the guest picks another language in the header switcher on /booking, /vi/booking or /ja/booking:
 *  - the link gets the prefill query of the current selection (date, voyage, first cabin), and
 *  - the selection and guest details are handed over once through sessionStorage (same origin for all three).
 * Inventory: en and ja book the English rows (USD), vi the Vietnamese rows (VND; CMS booking.price_list_for_locale).
 * Ids are only carried to a page of the same inventory; to the other one only the date and the guest details go,
 * and the guest chooses the voyage and cabins again (no id or price is ever translated between price lists).
 * Guest details never go into a URL. The payment-link page (/booking/pay?t=…) carries its token only.
 *
 * Only relative .ts imports here so the module runs under `node --test`.
 */
import { locales, sectionPath, type Locale } from '../../lib/i18n.ts';
import { currencyForLocale, type Guests } from './pricing.ts';

export const HANDOFF_KEY = 'bookingLanguageHandoff';
/** A handoff older than this is ignored (a tab left open, then a new visit). */
export const HANDOFF_TTL_MS = 30 * 60 * 1000;

export type Inventory = 'en' | 'vi';
export const inventoryOf = (locale: Locale): Inventory => (currencyForLocale(locale) === 'vnd' ? 'vi' : 'en');

export type Handoff = {
  v: 1;
  at: number;
  inventory: Inventory;
  date: string;
  itineraryId: number | null;
  cruiseId: number | null;
  rooms: { cabinId: number; guests: Guests }[];
  amenityQty: Record<number, number>;
  guest: { fullName: string; phone: string; email: string };
};

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** The locale whose booking page (plus `suffix`, e.g. '/pay') `href` points to, other than `current`; else null. */
export function switchTarget(href: string, current: Locale, suffix = '', origin = 'http://local'): Locale | null {
  let path: string;
  try {
    path = new URL(href, origin).pathname;
  } catch {
    return null;
  }
  return locales.find((l) => l !== current && path === `${sectionPath(l, 'booking')}${suffix}`) ?? null;
}

const PREFILL_KEYS = ['start_at', 'cruise_id', 'itinerary_id', 'cabin_id'] as const;

/**
 * Query for the target page. With a selection: the selection's date (and, same inventory only, voyage and first
 * cabin). Without one: the current page's prefill parameters, ids again only for the same inventory.
 */
export function handoffQuery(h: Handoff | null, from: Locale, target: Locale, current: { get(name: string): string | null }): string {
  const same = inventoryOf(from) === inventoryOf(target);
  const q = new URLSearchParams();
  if (h && h.date) {
    q.set('start_at', h.date);
    if (same && h.itineraryId && h.cruiseId) {
      q.set('cruise_id', String(h.cruiseId));
      q.set('itinerary_id', String(h.itineraryId));
    }
    if (same && h.rooms[0]) q.set('cabin_id', String(h.rooms[0].cabinId));
  } else {
    for (const key of PREFILL_KEYS) {
      const value = current.get(key) || (key === 'start_at' ? current.get('date') : null);
      if (value && (same || key === 'start_at')) q.set(key, value);
    }
  }
  const qs = q.toString();
  return qs ? `?${qs}` : '';
}

export function writeHandoff(storage: StorageLike | null, h: Handoff) {
  try {
    storage?.setItem(HANDOFF_KEY, JSON.stringify(h));
  } catch {
    // Storage unavailable (private mode): the query still carries date, voyage and cabin.
  }
}

/** Reads and removes the handoff (one use); null when absent, malformed or expired. */
export function takeHandoff(storage: StorageLike | null, now: number): Handoff | null {
  let raw: string | null = null;
  try {
    raw = storage?.getItem(HANDOFF_KEY) ?? null;
    storage?.removeItem(HANDOFF_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const h = JSON.parse(raw) as Handoff;
    if (h?.v !== 1 || typeof h.at !== 'number' || now - h.at > HANDOFF_TTL_MS || now < h.at - 60_000) return null;
    if (h.inventory !== 'en' && h.inventory !== 'vi') return null;
    const str = (v: unknown) => (typeof v === 'string' ? v.slice(0, 200) : '');
    const int = (v: unknown) => (Number.isInteger(v) && (v as number) > 0 ? (v as number) : null);
    const count = (v: unknown) => (Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 20 ? (v as number) : 0);
    return {
      v: 1,
      at: h.at,
      inventory: h.inventory,
      date: /^\d{4}-\d{2}-\d{2}$/.test(str(h.date)) ? h.date : '',
      itineraryId: int(h.itineraryId),
      cruiseId: int(h.cruiseId),
      rooms: (Array.isArray(h.rooms) ? h.rooms : []).slice(0, 20).flatMap((r) => {
        const cabinId = int(r?.cabinId);
        const g = r?.guests ?? ({} as Guests);
        return cabinId ? [{ cabinId, guests: { adults: count(g.adults), children_6_12: count(g.children_6_12), children_2_5: count(g.children_2_5), infants: count(g.infants) } }] : [];
      }),
      amenityQty: Object.fromEntries(
        Object.entries(h.amenityQty && typeof h.amenityQty === 'object' ? h.amenityQty : {}).flatMap(([id, q]) => (int(Number(id)) && count(q) > 0 ? [[Number(id), count(q)]] : [])),
      ),
      guest: { fullName: str(h.guest?.fullName), phone: str(h.guest?.phone), email: str(h.guest?.email) },
    };
  } catch {
    return null;
  }
}

/** What a page in `locale` may restore: the selection only from the same inventory, the guest details always. */
export function restorable(h: Handoff, locale: Locale): { rooms: Handoff['rooms']; amenityQty: Handoff['amenityQty']; guest: Handoff['guest'] } {
  const same = h.inventory === inventoryOf(locale);
  return { rooms: same ? h.rooms : [], amenityQty: same ? h.amenityQty : {}, guest: h.guest };
}
