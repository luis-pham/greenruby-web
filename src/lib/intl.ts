import 'server-only';
import { getLocales } from '@/lib/api/locales';
import { hasIntlMember, openAlternates, type AlternateEntry, type OpenAlternates } from '@/lib/api/contract';
import { isLegacyLocale, locales, type Locale } from '@/lib/i18n';
import { routeSections, type IntlSection } from '@/lib/intl-routes';
import { appRoutes } from '@/lib/routes.generated';
import { hasDictionary } from '@/messages';

// When an intl locale (ja…) may be public on this instance (phase 1D-b). All of:
//  1. this build has the locale's dictionary (messages/index.ts) and the section's generated routes (intl-routes.ts);
//  2. the CMS reports it effectively public (registry status `public`, hold-back released, every web instance's
//     manifest lists it) AND lists the section as served by every instance (GET /locales `sections`), so this
//     instance closes a section another instance lacks within the registry cache time (lib/api/locales.ts).
//     The CMS data layer enforces the rest per request: unknown/unserved language and unserved section answer 404,
//     unpublished rows and rows without a stored slug are never returned.
// en/vi are always open and never consult any of this.

/** Sections the CMS serves per effectively public code (null = all); empty when unreadable (fail closed). */
async function cmsPublicSections(): Promise<Map<string, readonly string[] | null>> {
  try {
    const registry = await getLocales();
    // A CMS without the `sections` field (before 1D-b) serves no intl section.
    return new Map((registry?.locales ?? []).filter((l) => l.effectivePublic).map((l) => [l.code, l.sections === undefined ? [] : l.sections]));
  } catch {
    return new Map();
  }
}

/** True when this build can render `section` for `locale` (dictionary + route tree); no CMS call. */
export const builtFor = (locale: Locale, section: IntlSection): boolean =>
  isLegacyLocale(locale) || (hasDictionary(locale) && routeSections(appRoutes, locale).includes(section));

/** Whether `locale` may be served for `section` right now. */
export async function localeOpen(locale: Locale, section: IntlSection): Promise<boolean> {
  if (isLegacyLocale(locale)) return true;
  if (!builtFor(locale, section)) return false;
  const served = (await cmsPublicSections()).get(locale);
  return served !== undefined && (served === null || served.includes(section));
}

/**
 * Whether `locale` is effectively public at all (phase 2B): this build has its dictionary and the CMS reports it public
 * with at least one served section. Decides which 404 an unmatched /code/... URL gets (src/proxy.ts, lib/intl-404.ts).
 */
export async function localePublic(locale: Locale): Promise<boolean> {
  if (isLegacyLocale(locale)) return true;
  if (!hasDictionary(locale)) return false;
  const served = (await cmsPublicSections()).get(locale);
  return served !== undefined && (served === null || served.length > 0);
}

/**
 * The hreflang/switcher set for a page from its CMS `alternates`. undefined (= render exactly the legacy EN/VI
 * output) for an en/vi page whose group has no intl member: that path makes no extra call.
 */
export async function pageAlternates(locale: Locale, section: IntlSection, entries: AlternateEntry[] | undefined): Promise<OpenAlternates | undefined> {
  if (isLegacyLocale(locale) && !hasIntlMember(entries)) return undefined;
  const open = new Set<Locale>();
  for (const code of locales) if (await localeOpen(code, section)) open.add(code);
  return openAlternates(entries, (code) => open.has(code));
}
