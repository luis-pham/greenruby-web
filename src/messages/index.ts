import type { Locale } from '@/lib/i18n';
import en, { type Messages } from './en';
import vi from './vi';

const dictionaries: Record<Locale, Messages> = { en, vi };

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export type { Messages };
