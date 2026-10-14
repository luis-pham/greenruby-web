'use server';

import { postContent } from '@/lib/api/client';
import { locales, type Locale } from '@/lib/i18n';

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; reason: 'invalid' | 'rate_limit' | 'failed'; fieldErrors: Record<string, string>; values: Record<string, string> };

const FIELDS = ['name', 'email', 'phone', 'message'] as const;

/** Forwards the contact form to Laravel (/api/v1/content/contact), which validates and emails the team. */
export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const rawLocale = String(form.get('locale') ?? 'en');
  const locale: Locale = (locales as readonly string[]).includes(rawLocale) ? (rawLocale as Locale) : 'en';
  const values = Object.fromEntries(FIELDS.map((f) => [f, String(form.get(f) ?? '').trim()]));

  // Honeypot: real visitors never see or fill this field.
  if (String(form.get('website') ?? '') !== '') return { status: 'success' };

  try {
    const { status, data } = await postContent('/contact', { ...values, lang: locale });
    if (status === 201) return { status: 'success' };
    if (status === 422) {
      const errors = (data as { errors?: Record<string, string[]> } | null)?.errors ?? {};
      const fieldErrors = Object.fromEntries(Object.entries(errors).map(([field, messages]) => [field, messages[0] ?? '']));
      return { status: 'error', reason: 'invalid', fieldErrors, values };
    }
    return { status: 'error', reason: status === 429 ? 'rate_limit' : 'failed', fieldErrors: {}, values };
  } catch (error) {
    console.error('contact form: Content API unreachable', error);
    return { status: 'error', reason: 'failed', fieldErrors: {}, values };
  }
}
