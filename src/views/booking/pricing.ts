/**
 * Display-only cabin pricing, ported from the Laravel booking page
 * (public/assets/frontend/js/modules/booking/cabin-price-calculator.js).
 *
 * The server (app/Payments/BookingPricer.php) recomputes every amount from the database before
 * anything is stored or charged; these numbers only drive what the guest sees. Keep the capacity
 * limits and over-capacity rules identical on both sides.
 *
 * Pure TypeScript with no imports so it runs under `node --test` as well as in the browser.
 */

export type Currency = 'usd' | 'vnd';

export type GuestType = 'adults' | 'children_6_12' | 'children_2_5' | 'infants';
export const GUEST_TYPES: readonly GuestType[] = ['adults', 'children_6_12', 'children_2_5', 'infants'];

export type Guests = Record<GuestType, number>;

/** prices[duration][guestCount] = price per cabin, as returned by GET /api/booking/cabins. */
export type PriceMatrix = Record<number, Record<number, number>>;

export type CabinPricing = {
  capacity: number;
  overCapacityAdult: number;
  overCapacityChild_6_12: number;
  overCapacityChild_2_5: number;
  overCapacityInfant: number;
  prices: PriceMatrix;
  duration: number;
};

/** Raw cabin fields from /api/booking/cabins that matter for pricing. */
export type CabinPricingSource = {
  capacity?: number | string | null;
  over_capacity_adult?: number | string | null;
  over_capacity_child_6_12?: number | string | null;
  over_capacity_child_2_5?: number | string | null;
  over_capacity_infant?: number | string | null;
  prices?: unknown;
};

const toInt = (value: unknown): number => {
  const n = parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) ? n : 0;
};

/** Laravel serialises an empty price list as `[]` and a filled one as `{ "2": { "1": 80 } }`. */
export function normalizePriceMatrix(raw: unknown): PriceMatrix {
  const out: PriceMatrix = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [duration, byGuest] of Object.entries(raw as Record<string, unknown>)) {
    if (!byGuest || typeof byGuest !== 'object') continue;
    const row: Record<number, number> = {};
    for (const [guests, price] of Object.entries(byGuest as Record<string, unknown>)) {
      const value = Number(price);
      if (Number.isFinite(value)) row[Number(guests)] = value;
    }
    out[Number(duration)] = row;
  }
  return out;
}

/** Same defaults as CabinPriceCalculator.setCabinData (capacity 2, duration 2 when missing). */
export function toCabinPricing(cabin: CabinPricingSource, duration: number | null | undefined): CabinPricing {
  return {
    capacity: toInt(cabin.capacity) || 2,
    overCapacityAdult: toInt(cabin.over_capacity_adult),
    overCapacityChild_6_12: toInt(cabin.over_capacity_child_6_12),
    overCapacityChild_2_5: toInt(cabin.over_capacity_child_2_5),
    overCapacityInfant: toInt(cabin.over_capacity_infant),
    prices: normalizePriceMatrix(cabin.prices),
    duration: duration && duration > 0 ? duration : 2,
  };
}

/**
 * Maximum of each guest type in one cabin. An over-capacity value of 0 means "not set", which
 * falls back to 2 × capacity − 1 adults and `capacity` of each child/infant type.
 */
export function guestLimits(cabin: CabinPricing): Guests {
  const { capacity } = cabin;
  const pick = (value: number, fallback: number) => (value > 0 ? value : fallback);
  return {
    adults: pick(cabin.overCapacityAdult, 2 * capacity - 1),
    children_6_12: pick(cabin.overCapacityChild_6_12, capacity),
    children_2_5: pick(cabin.overCapacityChild_2_5, capacity),
    infants: pick(cabin.overCapacityInfant, capacity),
  };
}

export type GuestIssue = { type: GuestType; problem: 'negative' | 'exceeds'; limit: number } | { type: 'total'; problem: 'empty' };

export function validateGuests(cabin: CabinPricing, guests: Guests): { valid: boolean; issues: GuestIssue[]; totalGuests: number } {
  const limits = guestLimits(cabin);
  const issues: GuestIssue[] = [];
  for (const type of GUEST_TYPES) {
    const value = Math.trunc(guests[type] || 0);
    if (value < 0) issues.push({ type, problem: 'negative', limit: 0 });
    if (value > limits[type]) issues.push({ type, problem: 'exceeds', limit: limits[type] });
  }
  // Infants travel free and don't count towards occupancy.
  const totalGuests = (guests.adults || 0) + (guests.children_6_12 || 0) + (guests.children_2_5 || 0);
  if (totalGuests === 0) issues.push({ type: 'total', problem: 'empty' });
  return { valid: issues.length === 0, issues, totalGuests };
}

export function roundPrice(price: number, currency: Currency): number {
  return currency === 'vnd' ? Math.round(price) : Math.round(price * 100) / 100;
}

export type PriceBreakdown = {
  basePrice: number;
  extraCharges: number;
  totalGuests: number;
  capacity: number;
  exceededCapacity: boolean;
  exceeded?: { adults: number; children_6_12: number; children_2_5: number };
};

export type PriceResult =
  | { success: true; price: number; breakdown: PriceBreakdown }
  | { success: false; reason: 'invalid_guests' | 'missing_base_price'; issues?: GuestIssue[] };

/**
 * Price for one cabin.
 * - Up to capacity: the matrix price for that guest count, or a pro-rata share of the full-cabin
 *   price when that count has no price of its own.
 * - Above capacity: the full-cabin price, plus each extra guest at 100% (adult), 75% (child 6–12)
 *   or 50% (child 2–5) of the per-person rate. Adults fill the base first, then older children.
 *   Infants are free.
 */
export function calculateCabinPrice(cabin: CabinPricing, guests: Guests, currency: Currency): PriceResult {
  const check = validateGuests(cabin, guests);
  if (!check.valid) return { success: false, reason: 'invalid_guests', issues: check.issues };

  const { capacity } = cabin;
  const prices = cabin.prices[cabin.duration] ?? {};
  const totalGuests = check.totalGuests;

  if (totalGuests <= capacity) {
    let basePrice = prices[totalGuests] || 0;
    if (!basePrice && totalGuests > 0) {
      const full = prices[capacity] || 0;
      if (full > 0) basePrice = (full / capacity) * totalGuests;
    }
    return {
      success: true,
      price: roundPrice(basePrice, currency),
      breakdown: { basePrice, extraCharges: 0, totalGuests, capacity, exceededCapacity: false },
    };
  }

  const basePrice = prices[capacity] || 0;
  if (basePrice === 0) return { success: false, reason: 'missing_base_price' };

  const perPerson = basePrice / capacity;
  let room = capacity;
  const fill = (count: number) => {
    const inBase = Math.min(count, room);
    room -= inBase;
    return count - inBase;
  };
  const adults = fill(guests.adults);
  const children_6_12 = fill(guests.children_6_12);
  const children_2_5 = fill(guests.children_2_5);
  const extraCharges = adults * perPerson + children_6_12 * perPerson * 0.75 + children_2_5 * perPerson * 0.5;

  return {
    success: true,
    price: roundPrice(basePrice + extraCharges, currency),
    breakdown: {
      basePrice,
      extraCharges: roundPrice(extraCharges, currency),
      totalGuests,
      capacity,
      exceededCapacity: true,
      exceeded: { adults, children_6_12, children_2_5 },
    },
  };
}

/**
 * The fare shown for a selected cabin, as on the Laravel page: the calculated price when the guest
 * mix is valid, otherwise the cabin's "from" price.
 */
export function displayCabinPrice(cabin: CabinPricing, guests: Guests, minPrice: number | null | undefined, currency: Currency): number {
  const result = calculateCabinPrice(cabin, guests, currency);
  if (result.success && result.price > 0) return result.price;
  return result.success ? 0 : Math.max(0, Number(minPrice) || 0);
}

export function formatPrice(price: number, currency: Currency): string {
  const value = Number(price) || 0;
  if (currency === 'vnd') return `${Math.round(value).toLocaleString('vi-VN')} VND`;
  const rounded = Math.round(value * 100) / 100;
  return `$${rounded.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Display currency follows the page language: Vietnamese rates are stored in VND, English in USD. */
export const currencyForLocale = (locale: string): Currency => (locale === 'vi' ? 'vnd' : 'usd');
