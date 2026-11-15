import { byLocale, type Locale } from './i18n';

/** "90 min" in the page's language (activity durations are stored as bare minutes in the CMS). */
const UNIT = byLocale<(n: string) => string>({
  en: (n) => `${n} min`,
  vi: (n) => `${n} phút`,
  ja: (n) => `${n}分`,
  fr: (n) => `${n} min`,
  es: (n) => `${n} min`,
  de: (n) => `${n} Min.`,
  ko: (n) => `${n}분`,
});

/** A CMS duration: bare digits are minutes; anything else ("Half day") is shown as written. */
export const activityDuration = (locale: Locale, value: string): string => (/^\d+$/.test(value) ? UNIT[locale](value) : value);
