import { defaultLocale, intlSections, isLegacyLocale, segmentOf, type Locale, type Section } from './i18n.ts';

// Route families per locale, derived from the route trees that actually exist (phase 1D-b). A section counts as
// served only when the locale's tree holds every route that section needs; a name in `segments` proves nothing.
//
// Route keys are app paths without the trailing /page: '/(en)/cruise/[file]', '/(vi)/vi/du-thuyen/[file]',
// '/(ja)/ja/cruise/[file]', '/(en)' for the English home. They come from the build (.next/server/
// app-paths-manifest.json) or, where no build exists, from src/lib/routes.generated.ts (scripts/i18n/routes-generate.mjs).

export { intlSections };
export type IntlSection = (typeof intlSections)[number];

/** English routes of those sections that intl locales do not get: the noindex keyword search, the owner's brand facts page. */
export const intlExcludedRoutes = ['blog/search', 'about-us/brand-facts'];

/** Hub routes (no item in the path): an intl hub is public only while it lists something, like its sitemap entry. */
export const hubRoutes: Record<string, IntlSection> = {
  '': 'home', itinerary: 'itinerary', experiences: 'experiences', destinations: 'destinations', blog: 'blog', news: 'news', 'faq/[[...path]]': 'faq',
  // Static pages (phase 1E-c): public only while their CMS page row is published for the language.
  services: 'services', 'gallery/[[...path]]': 'gallery', 'about-us': 'aboutUs', contact: 'contact',
};

/** '/(ja)/ja/cruise/[file]/page' → '/(ja)/ja/cruise/[file]'; anything that is not a page → null. */
export function routeKey(appPath: string): string | null {
  const m = /^(\/\([a-z]{2,3}(?:-[a-z0-9]+)*\)(?:\/.*)?)\/page$/i.exec(appPath);
  return m ? m[1] : null;
}

/** The locale's routes relative to its tree: '' (home), 'cruise/[file]', … */
export function localeRoutes(keys: readonly string[], code: string): string[] {
  const group = `/(${code})`;
  const base = code === defaultLocale ? group : `${group}/${code}`;
  return keys.flatMap((key) => (key === base ? [''] : key.startsWith(`${base}/`) ? [key.slice(base.length + 1)] : []));
}

/** Section of an English route ('cruise/[file]' → cruise, '' → home); null for routes outside the section map. */
export function sectionOfRoute(route: string, locale: Locale = 'en'): Section | 'home' | null {
  if (route === '') return 'home';
  return segmentOf(route.split('/')[0], locale);
}

/** English routes each intl section needs, from the English tree (the source the intl trees are generated from). */
export function intlRequirements(keys: readonly string[]): Map<IntlSection, string[]> {
  const required = new Map<IntlSection, string[]>();
  for (const route of localeRoutes(keys, 'en')) {
    const section = sectionOfRoute(route);
    if (!section || !(intlSections as readonly string[]).includes(section) || intlExcludedRoutes.includes(route)) continue;
    required.set(section as IntlSection, [...(required.get(section as IntlSection) ?? []), route]);
  }
  return required;
}

/**
 * Sections the trees in `keys` serve for `code`. Legacy locales: every section with at least one route in the
 * locale's own segments (en/vi never depend on it). Intl locales: an intl section whose required English routes all
 * exist under /(code)/code/; a partial tree serves nothing of that section.
 */
export function routeSections(keys: readonly string[], code: Locale): string[] {
  const own = localeRoutes(keys, code);
  if (isLegacyLocale(code)) {
    const found = new Set(own.map((route) => sectionOfRoute(route, code)).filter((s): s is Section | 'home' => s !== null));
    return [...found];
  }
  const present = new Set(own);
  return [...intlRequirements(keys)].filter(([, routes]) => routes.every((r) => present.has(r))).map(([section]) => section);
}

/** True when the locale has a tree at all (its home route). */
export const hasRouteTree = (keys: readonly string[], code: Locale) => localeRoutes(keys, code).includes('');
