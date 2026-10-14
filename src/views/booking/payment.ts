/**
 * Request bodies for POST /api/booking/inquiry and POST /api/payment/init, the payment-return
 * handling and the "back from the gateway" cancel, ported from the Laravel booking page (index.js).
 *
 * Prices in these payloads are display-only: BookingPricer on the server recomputes every amount
 * from itinerary_id, cabin_id/amenity_id, quantities and guest counts. Only `import type` here so
 * the module runs under `node --test`.
 */

import type { Currency, Guests } from './pricing';

export type PaymentMethod = 'stripe' | 'paypal' | 'sepay';
export const PAYMENT_METHODS: readonly PaymentMethod[] = ['stripe', 'paypal', 'sepay'];

export type BookingCabinLine = {
  cabin_id?: number;
  cabin_name: string;
  cabin_description: string;
  unit_price: number;
  quantity: 1;
  adults: number;
  children_6_12: number;
  children_2_5: number;
  infants: number;
  total_price: number;
};

export type BookingAmenityLine = {
  amenity_id: number | null;
  amenity_name: string;
  unit_price: number;
  quantity: number;
  total_price: number;
};

export type BookingPayload = {
  departure_date: string | null;
  itinerary_id: string | null;
  itinerary_name: string;
  cruise_name: string;
  itinerary_duration_label: string;
  destination: string;
  guests_total: number;
  full_name: string;
  email: string;
  phone: string;
  subtotal_cabins: number;
  subtotal_amenities: number;
  total_amount: number;
  cabins: BookingCabinLine[];
  amenities: BookingAmenityLine[];
};

export type PayloadInput = {
  date: string;
  itinerary: { id: string; name: string; cruise_name: string; destination: string } | null;
  durationLabel: string;
  guest: { fullName: string; email: string; phone: string };
  rooms: { cabinId: number | null; name: string; description: string; unitPrice: number; guests: Guests }[];
  amenities: { id: number; name: string; unitPrice: number; quantity: number }[];
  currency: Currency;
};

const round = (value: number, currency: Currency) => (currency === 'vnd' ? Math.round(value) : Math.round(value * 100) / 100);

/** The `booking` object both endpoints accept (same shape as collectBookingPayload() in index.js). */
export function buildBookingPayload(input: PayloadInput): BookingPayload {
  const { currency } = input;
  const cabins: BookingCabinLine[] = input.rooms.map((room) => {
    const unit = round(room.unitPrice, currency);
    return {
      cabin_name: room.name,
      cabin_description: room.description,
      unit_price: unit,
      quantity: 1,
      adults: room.guests.adults,
      children_6_12: room.guests.children_6_12,
      children_2_5: room.guests.children_2_5,
      infants: room.guests.infants,
      total_price: unit,
      ...(room.cabinId ? { cabin_id: room.cabinId } : {}),
    };
  });
  const amenities: BookingAmenityLine[] = input.amenities
    .filter((a) => a.quantity > 0)
    .map((a) => {
      const unit = round(a.unitPrice, currency);
      return { amenity_name: a.name, amenity_id: a.id || null, unit_price: unit, quantity: a.quantity, total_price: round(unit * a.quantity, currency) };
    });
  const subtotalCabins = round(cabins.reduce((sum, c) => sum + c.total_price * c.quantity, 0), currency);
  const subtotalAmenities = round(amenities.reduce((sum, a) => sum + a.total_price, 0), currency);
  const guestsTotal = cabins.reduce((sum, c) => sum + c.adults + c.children_6_12 + c.children_2_5 + c.infants, 0);

  return {
    departure_date: input.date || null,
    itinerary_id: input.itinerary?.id ?? null,
    itinerary_name: input.itinerary?.name ?? '',
    cruise_name: input.itinerary?.cruise_name ?? '',
    itinerary_duration_label: input.durationLabel,
    // The old page sent only the first stop (the card showed one destination).
    destination: (input.itinerary?.destination ?? '').split(',')[0].trim(),
    guests_total: guestsTotal,
    full_name: input.guest.fullName.trim(),
    email: input.guest.email.trim(),
    phone: input.guest.phone.trim(),
    subtotal_cabins: subtotalCabins,
    subtotal_amenities: subtotalAmenities,
    total_amount: round(subtotalCabins + subtotalAmenities, currency),
    cabins,
    amenities,
  };
}

/** Reservation only: the currency of the page is sent so the server can store unpriced requests. */
export function buildInquiryBooking(payload: BookingPayload, currency: Currency): BookingPayload & { currency: Currency } {
  return { ...payload, currency };
}

export type PaymentInitBody = {
  method: PaymentMethod;
  amount: number;
  return_base: string;
  booking: BookingPayload;
  currency?: Currency;
};

/**
 * Body for POST /api/payment/init. `amount` is required (min 1) by the API but ignored: the server
 * charges what BookingPricer computes. `currency` is only sent when no cabin carries an id, as before.
 * The gateway callback redirects to `return_base?token=…&result=…&tx=…&method=…`.
 */
export function buildPaymentInitBody(args: { method: PaymentMethod; booking: BookingPayload; currency: Currency; returnBase: string }): PaymentInitBody {
  const body: PaymentInitBody = {
    method: args.method,
    amount: Math.max(1, args.booking.total_amount),
    return_base: args.returnBase,
    booking: args.booking,
  };
  if (!args.booking.cabins.some((c) => c.cabin_id)) body.currency = args.currency;
  return body;
}

/** Stripe and PayPal charge USD only; SePay bank transfer charges VND only. */
export function methodSupportsCurrency(method: PaymentMethod, currency: Currency): boolean {
  return method === 'sepay' ? currency === 'vnd' : currency === 'usd';
}

export type InitFailure = 'usd_only' | 'vnd_only' | 'amount' | 'generic';

/** Maps a failed /api/payment/init response to a message key. */
export function classifyInitFailure(data: Record<string, unknown> | null): InitFailure {
  if (data?.code === 'currency_method_mismatch' && (data.reason === 'usd_only' || data.reason === 'vnd_only')) return data.reason;
  if (data?.code === 'amount_calculation_failed') return 'amount';
  return 'generic';
}

// ---------------------------------------------------------------------------------------------
// Payment return

export type Outcome = 'success' | 'pending' | 'error';

/** Query params the gateway callback appends to return_base. `st` is accepted as a fallback for `token`. */
export function parseReturnParams(params: { get(name: string): string | null }): { result: string; tx: string; token: string | null; method: string | null } | null {
  const result = params.get('result');
  const tx = params.get('tx');
  if (!result || !tx) return null;
  return { result, tx, token: params.get('token') || params.get('st') || null, method: params.get('method') };
}

type StatusFetcher = (attempt: number) => Promise<{ success: boolean; status?: string; booking?: unknown }>;

/**
 * Polls the payment status after a successful gateway return, like pollPaymentStatus() in index.js:
 * up to `maxAttempts` requests `interval` ms apart. succeeded → success, failed/canceled → error,
 * still pending after the last attempt → pending; persistent request failures → error.
 */
export async function pollPaymentStatus(
  fetchStatus: StatusFetcher,
  opts: { maxAttempts?: number; interval?: number; sleep?: (ms: number) => Promise<void>; onBooking?: (booking: unknown) => void; isCancelled?: () => boolean } = {},
): Promise<Outcome> {
  const maxAttempts = opts.maxAttempts ?? 30;
  const interval = opts.interval ?? 2000;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (opts.isCancelled?.()) return 'pending';
    let data: Awaited<ReturnType<StatusFetcher>> | null = null;
    try {
      data = await fetchStatus(attempt);
    } catch {
      data = null;
    }
    if (data?.success && data.status) {
      if (data.booking) opts.onBooking?.(data.booking);
      if (data.status === 'succeeded') return 'success';
      if (data.status === 'failed' || data.status === 'canceled') return 'error';
      if (attempt >= maxAttempts) return 'pending';
    } else if (attempt >= maxAttempts) {
      return 'error';
    }
    await sleep(interval);
  }
  return 'pending';
}

/** One status check after a cancelled/other gateway return. */
export function outcomeFromStatus(data: { success: boolean; status?: string } | null): Outcome {
  if (!data?.success) return 'error';
  const status = data.status || 'pending';
  if (status === 'pending') return 'pending';
  return status === 'succeeded' ? 'success' : 'error';
}

// ---------------------------------------------------------------------------------------------
// Session storage: lets the page cancel a payment session when the guest comes back from the
// gateway with the browser's Back button instead of the gateway's own return link.

export const STORAGE_TX = 'bookingCurrentPaymentTx';
export const STORAGE_TOKEN = 'bookingCurrentPaymentToken';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function storePaymentAccess(storage: StorageLike | null, tx: string, token: string | null) {
  try {
    if (tx) storage?.setItem(STORAGE_TX, tx);
    if (token) storage?.setItem(STORAGE_TOKEN, token);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the cancel-on-back is best effort.
  }
}

export function readPaymentAccess(storage: StorageLike | null): { tx: string | null; token: string | null } {
  try {
    return { tx: storage?.getItem(STORAGE_TX) ?? null, token: storage?.getItem(STORAGE_TOKEN) ?? null };
  } catch {
    return { tx: null, token: null };
  }
}

export function clearPaymentAccess(storage: StorageLike | null) {
  try {
    storage?.removeItem(STORAGE_TX);
    storage?.removeItem(STORAGE_TOKEN);
  } catch {
    // ignore
  }
}
