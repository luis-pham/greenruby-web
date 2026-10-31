import type { OpenAlternates } from './api/contract.ts';
import { defaultLocale, homePath, isLegacyLocale, localeInfo, type LegacyLocale, type Locale } from './i18n.ts';

// hreflang and language-switcher targets of a page (phase 1D-b), as site paths. `open` is the page's CMS
// `alternates` narrowed to open languages (lib/intl.ts pageAlternates); undefined for an en/vi page without an intl
// member, which then renders exactly the pre-1D-b EN/VI output.

const otherLegacy = (locale: LegacyLocale): LegacyLocale => (locale === 'en' ? 'vi' : 'en');

/** The EN/VI set from the legacy single counterpart (unchanged since launch). */
function legacyPaths(locale: LegacyLocale, path: string, alternatePath?: string): Record<string, string> {
  return alternatePath
    ? { [locale]: path, [otherLegacy(locale)]: alternatePath, 'x-default': locale === 'en' ? path : alternatePath }
    : // No exact counterpart in the other language: the page's own language, which is also the default.
      { [locale]: path, 'x-default': path };
}

/** True when the resolver's EN/VI members and x-default are exactly the legacy set (so both sides list the same group). */
function agrees(legacy: Record<string, string>, open: OpenAlternates): boolean {
  const { 'x-default': xDefault, ...members } = legacy;
  const resolver = open.entries.filter((entry) => isLegacyLocale(entry.lang));
  return (
    open.xDefault === xDefault &&
    resolver.length === Object.keys(members).length &&
    resolver.every((entry) => members[entry.lang] === entry.path)
  );
}

/**
 * hreflang → path.
 * - en/vi page: the legacy set; intl members are added (before x-default) only when the resolver lists the same
 *   EN/VI group, so the intl page, which renders the resolver set, is reciprocal with it.
 * - intl page: the resolver set, the page's own entry at its canonical path; just itself when the CMS lists no group.
 */
export function hreflangPaths(locale: Locale, path: string, alternatePath?: string, open?: OpenAlternates): Record<string, string> {
  if (isLegacyLocale(locale)) {
    const legacy = legacyPaths(locale, path, alternatePath);
    const intl = (open?.entries ?? []).filter((entry) => !isLegacyLocale(entry.lang));
    if (!open || intl.length === 0 || !agrees(legacy, open)) return legacy;
    const { 'x-default': xDefault, ...members } = legacy;
    return { ...members, ...Object.fromEntries(intl.map((entry) => [localeInfo[entry.lang].hreflang, entry.path])), 'x-default': xDefault };
  }
  const own = localeInfo[locale].hreflang;
  if (!open?.entries.some((entry) => entry.lang === locale)) return { [own]: path };
  const members = Object.fromEntries(open.entries.map((entry) => [localeInfo[entry.lang].hreflang, entry.lang === locale ? path : entry.path]));
  return open.xDefault ? { ...members, 'x-default': open.xDefault } : members;
}

/** og:locale:alternate values for the languages in `languages` other than the page's. */
export const ogAlternates = (locale: Locale, languages: Record<string, string>): string[] =>
  Object.keys(languages)
    .filter((tag) => tag !== 'x-default' && tag !== localeInfo[locale].hreflang)
    .map((tag) => Object.values(localeInfo).find((info) => info.hreflang === tag)?.ogLocale)
    .filter((value): value is string => !!value);

/**
 * Switcher targets per language (the current one excluded). en/vi: the other legacy language at `alternateHref`
 * (its exact counterpart, or its home/hub as before), plus open intl translations. Intl page: only languages with an
 * open translation; without any, the English home (`alternateHref` is the route's legacy guess and may be another
 * language). A language without a translation is left out, never sent to another language's page under its name.
 */
export function switcherLinks(locale: Locale, alternateHref: string, open?: OpenAlternates): Partial<Record<Locale, string>> {
  if (isLegacyLocale(locale)) {
    const links: Partial<Record<Locale, string>> = { [otherLegacy(locale)]: alternateHref };
    for (const entry of open?.entries ?? []) if (!isLegacyLocale(entry.lang)) links[entry.lang] = entry.path;
    return links;
  }
  if (open?.entries.length) {
    return Object.fromEntries(open.entries.filter((entry) => entry.lang !== locale).map((entry) => [entry.lang, entry.path]));
  }
  return { [defaultLocale]: homePath(defaultLocale) };
}
