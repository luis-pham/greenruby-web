/**
 * Locale-aware display helpers of the booking flow (phase 2B). Formatting only: amounts and currencies are the
 * ones the wizard already computed (pricing.ts) and the server recomputes (BookingPricer); nothing here changes a
 * number. EN and VI keep exactly the output they had before; an intl locale (ja) gets its own date, amount and
 * guest-count forms from the message templates of its dictionary.
 *
 * Only relative .ts imports and `import type` here so the module runs under `node --test`.
 */
import { dateFormatTag, isLegacyLocale, numberFormatTag, type Locale } from '../../lib/i18n.ts';
import type { BookingPolicy, Outcome } from './payment.ts';
import { formatPrice, type Currency, type Guests } from './pricing.ts';

/** Replaces {name} placeholders (same as model.ts fmt; kept here so this module has no '@/…' imports). */
const fill = (template: string, vars: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));

/** "2026-03-04" → "4 Mar 2026" (en), "04/03/2026" (vi), "2026年3月4日" (ja), without timezone shifts. */
export function formatDate(locale: Locale, ymd: string | null | undefined): string {
  if (!ymd) return '';
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return ymd;
  const date = new Date(y, m - 1, d);
  if (locale === 'vi') return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  if (locale === 'en') return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  return new Intl.DateTimeFormat(dateFormatTag(locale), { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

/**
 * An amount for display. en/vi: formatPrice, unchanged ("$1,234.50", "4.500.000 VND"). An intl locale books the
 * English price list in USD (CMS booking.price_list_for_locale): same amount, same currency, written with the
 * locale's digit grouping and an unambiguous "US$" (glossary §2; the prefix is a COMMERCIAL_REVIEW_REQUIRED choice).
 */
export function formatAmount(value: number, currency: Currency, locale: Locale): string {
  if (isLegacyLocale(locale)) return formatPrice(value, currency);
  const amount = Number(value) || 0;
  if (currency === 'vnd') return `${Math.round(amount).toLocaleString(numberFormatTag(locale))} VND`;
  const rounded = Math.round(amount * 100) / 100;
  return `US$${rounded.toLocaleString(numberFormatTag(locale), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** The message templates the guest summary needs (Messages['booking'] fits). */
export type GuestCopy = {
  guestShort: { adult: string; adults: string; child612: string; child25: string; infant: string; infants: string };
  /** '{count} {label}' (en/vi: "2 Adults"), '{label}{count}名' (ja: 大人2名). */
  guestCount: string;
  /** ', ' (en/vi), '、' (ja). */
  listSeparator: string;
};

/** "2 Adults, 1 Child 6-12" (en, as before) / "大人2名、子ども（6〜12歳）1名" (ja). */
export function guestsText(t: GuestCopy, g: Partial<Guests>): string {
  const s = t.guestShort;
  const parts: string[] = [];
  const a = g.adults ?? 0;
  const c612 = g.children_6_12 ?? 0;
  const c25 = g.children_2_5 ?? 0;
  const inf = g.infants ?? 0;
  const count = (n: number, label: string) => fill(t.guestCount, { count: n, label });
  if (a > 0) parts.push(count(a, a > 1 ? s.adults : s.adult));
  if (c612 > 0) parts.push(count(c612, s.child612));
  if (c25 > 0) parts.push(count(c25, s.child25));
  if (inf > 0) parts.push(count(inf, inf > 1 ? s.infants : s.infant));
  return parts.join(t.listSeparator);
}

/** "From $1,250.00 per cabin" pieces: label, amount (with the ja "〜" suffix) and unit; en/vi unchanged. */
export function fromPriceParts(t: { priceFrom: string; priceFromSuffix: string; perCabin: string }, amount: string) {
  return { label: t.priceFrom, amount: amount + t.priceFromSuffix, unit: t.perCabin };
}

// ---------------------------------------------------------------------------------------------
// Outcome: what the result screen may claim.

/**
 * success: the gateway confirmed the payment (GET /api/payment/status → succeeded).
 * requested: a reservation request (POST /api/booking/inquiry) was stored; nothing was charged or confirmed.
 * pending: a payment is still being confirmed. error: the payment failed or was cancelled.
 */
export type ResultOutcome = Outcome | 'requested';

export type OutcomeCopy = {
  successTitle: string;
  successMessage: string;
  requestTitle: string;
  requestMessage: string;
  pendingTitle: string;
  pendingMessage: string;
  failedTitle: string;
  failedMessage: string;
};

/** Title, message and emblem of the result screen. A request never uses the payment-success copy. */
export function outcomeView(o: OutcomeCopy, outcome: ResultOutcome): { title: string; message: string; emblem: string; isError: boolean } {
  switch (outcome) {
    case 'success':
      return { title: o.successTitle, message: o.successMessage, emblem: '✓', isError: false };
    case 'requested':
      return { title: o.requestTitle, message: o.requestMessage, emblem: '✓', isError: false };
    case 'pending':
      return { title: o.pendingTitle, message: o.pendingMessage, emblem: '⧗', isError: false };
    default:
      return { title: o.failedTitle, message: o.failedMessage, emblem: '!', isError: true };
  }
}

// ---------------------------------------------------------------------------------------------
// Payment guard (CMS booking.payment_locales, exposed by GET /api/booking/policy).

/**
 * Whether the page may offer online payment. The CMS list decides when it sent one; otherwise (policy not loaded,
 * or a CMS without the field) en/vi keep offering payment as before and an intl locale offers the request only
 * (fail closed). The CMS refuses a payment init from a locale outside the list either way.
 */
export function paymentAllowed(policy: Pick<BookingPolicy, 'paymentLocales'> | null, locale: Locale): boolean {
  const list = policy?.paymentLocales;
  return list ? list.includes(locale) : isLegacyLocale(locale);
}
