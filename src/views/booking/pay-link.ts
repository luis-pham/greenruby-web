/**
 * Secure payment links (/booking/pay?t=…), sent by email for the balance of a deposit booking or for a
 * booking arranged with our team (TPX decisions 3 and 6). The CMS decides what is due; this only reads
 * its answer. Only `import type` here so the module runs under `node --test`.
 */

import type { PaymentMethod, PaymentPlan } from './payment';

export type LinkPlan = { plan: PaymentPlan; amountDueNow: number; balanceAmount: number; balanceDueDate: string | null };

export type PaymentLinkInfo = {
  purpose: 'booking' | 'balance';
  booking: {
    code: string;
    fullName: string;
    voyage: string;
    departureDate: string;
    currency: 'usd' | 'vnd';
    total: number;
    paid: number;
    balance: number;
    balanceDueDate: string | null;
  };
  plans: LinkPlan[];
  methods: PaymentMethod[];
  termsRequired: boolean;
};

export type LinkError = 'invalid' | 'nothingDue' | 'unavailable' | 'generic';

const num = (v: unknown) => (typeof v === 'number' ? v : Number(v) || 0);
const str = (v: unknown) => (typeof v === 'string' ? v : '');

export function parseLinkInfo(data: Record<string, unknown> | null): PaymentLinkInfo | null {
  if (!data?.success || (data.purpose !== 'booking' && data.purpose !== 'balance')) return null;
  const b = (data.booking ?? {}) as Record<string, unknown>;
  const methods = (Array.isArray(data.methods) ? data.methods : []).filter((m): m is PaymentMethod => m === 'stripe' || m === 'paypal' || m === 'sepay');
  const plans = (Array.isArray(data.plans) ? data.plans : []).flatMap((p: Record<string, unknown>) =>
    p.plan === 'deposit' || p.plan === 'full'
      ? [{ plan: p.plan, amountDueNow: num(p.amount_due_now), balanceAmount: num(p.balance_amount), balanceDueDate: str(p.balance_due_date) || null } as LinkPlan]
      : [],
  );
  return {
    purpose: data.purpose,
    booking: {
      code: str(b.code),
      fullName: str(b.full_name),
      voyage: [str(b.itinerary_name), str(b.cruise_name)].filter(Boolean).join(' · '),
      departureDate: str(b.departure_date),
      currency: b.currency === 'vnd' ? 'vnd' : 'usd',
      total: num(b.total_amount),
      paid: num(b.amount_paid),
      balance: num(b.balance_amount),
      balanceDueDate: str(b.balance_due_date) || null,
    },
    plans,
    methods,
    termsRequired: data.terms_required === true,
  };
}

/** Maps a refused GET or POST to a message key. */
export function linkError(status: number, data: Record<string, unknown> | null): LinkError {
  if (status === 410 || data?.code === 'link_invalid') return 'invalid';
  if (status === 409 && data?.code === 'nothing_due') return 'nothingDue';
  if (status === 503) return 'unavailable';
  return 'generic';
}

/** What the guest pays now: the chosen plan for a new booking, the balance otherwise. */
export function dueNow(info: PaymentLinkInfo, plan: PaymentPlan | null): number {
  if (info.purpose === 'balance') return info.booking.balance;
  return (info.plans.find((p) => p.plan === plan) ?? info.plans[0])?.amountDueNow ?? info.booking.total;
}
