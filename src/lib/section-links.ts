import { defaultLocale, homePath, intlSections, isLegacyLocale, sectionPath, type Locale, type Section } from './i18n.ts';

// Links from a page to a section page (phase 2B). en/vi: sectionPath/homePath, unchanged. A new language links to
// its own section page only when the CMS lists it as public for that language (/site `publicSections`, IntlSitemap::
// hubOpen: a hub lists something, a static page is published); otherwise to the English page, never to a 404.

export function sectionHref(locale: Locale, section: Section, publicSections: readonly string[] | undefined): string {
  if (isLegacyLocale(locale) || !(intlSections as readonly string[]).includes(section)) return sectionPath(locale, section);
  return publicSections?.includes(section) ? sectionPath(locale, section) : sectionPath(defaultLocale, section);
}

export function homeHref(locale: Locale, publicSections: readonly string[] | undefined): string {
  if (isLegacyLocale(locale)) return homePath(locale);
  return publicSections?.includes('home') ? homePath(locale) : homePath(defaultLocale);
}
