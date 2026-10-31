import { byLocale, type LegacyCopy, type Locale } from '@/lib/i18n';
import en, { type Messages } from './en';
import ja from './ja';
import vi from './vi';

// One dictionary per language that has its own copy. A compiled locale without one renders English and is not
// ready: hasDictionary() is false, so the readiness manifest and the intl route gate keep it closed.
const own: LegacyCopy<Messages> = { en, vi, ja };
const dictionaries = byLocale(own);

export const hasDictionary = (locale: Locale): boolean => Object.hasOwn(own, locale);

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export type { Messages };
