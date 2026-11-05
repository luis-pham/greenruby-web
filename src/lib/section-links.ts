import { defaultLocale, homePath, intlSectionOf, isLegacyLocale, sectionPath, type Locale, type Section } from './i18n.ts';

// Links from a page to a section page (phase 2B). en/vi: sectionPath/homePath, unchanged. A new language links to
// its own section page only when the CMS lists it as public for that language (/site `publicSections`, IntlSitemap::
// hubOpen: a hub lists something, a static page is published); otherwise to the English page, never to a 404.

export function sectionHref(locale: Locale, section: Section, publicSections: readonly string[] | undefined): string {
  if (isLegacyLocale(locale) || !intlSectionOf(section)) return sectionPath(locale, section);
  return publicSections?.includes(section) ? sectionPath(locale, section) : sectionPath(defaultLocale, section);
}

/** What a new language appends to a link label whose page exists only in English (glossary §10). */
const ENGLISH_ONLY: Partial<Record<Locale, string>> = { ja: '（英語版）', fr: ' (en anglais)' };

/**
 * `label` for a link to `href`: a new language's link that goes to an English page says so（英語版）, unless the label
 * already does. en/vi labels are returned unchanged.
 */
export function linkLabel(locale: Locale, href: string, label: string): string {
  const mark = englishOnlyMark(locale, href);
  return !mark || label.includes(mark.trim()) ? label : `${label}${mark}`; // fr marks start with a no-break space, labels may not
}

/** The（英語版）mark alone, for a layout that sets it apart from the label; '' when the link needs none. */
export function englishOnlyMark(locale: Locale, href: string): string {
  const mark = ENGLISH_ONLY[locale];
  if (!mark || !href.startsWith('/')) return '';
  const own = `/${locale}`;
  return href === own || href.startsWith(`${own}/`) || href.startsWith(`${own}#`) ? '' : mark;
}

export function homeHref(locale: Locale, publicSections: readonly string[] | undefined): string {
  if (isLegacyLocale(locale)) return homePath(locale);
  return publicSections?.includes('home') ? homePath(locale) : homePath(defaultLocale);
}
