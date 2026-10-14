import type { Locale } from '@/lib/i18n';
import type { LegalPageKey, LegalSectionKey } from './data';

/** The four policies, in the order the hub shows them. `page` is also the i18n Section of its URL. */
export const POLICIES = [
  { key: 'safety', page: 'safetyPolicies', anchor: 'safety' },
  { key: 'terms', page: 'termsAndConditions', anchor: 'terms' },
  { key: 'privacy', page: 'privacyPolicy', anchor: 'privacy' },
  { key: 'paymentMethods', page: 'paymentMethods', anchor: 'payment' },
] as const satisfies readonly { key: LegalSectionKey; page: LegalPageKey; anchor: string }[];

export type Policy = (typeof POLICIES)[number];

export const policyByPage = (page: LegalPageKey): Policy => POLICIES.find((p) => p.page === page) as Policy;

/** "March 2026" / "tháng 3 năm 2026" in the CMS timezone. */
export function formatUpdated(iso: string | null, locale: Locale): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(date);
}
