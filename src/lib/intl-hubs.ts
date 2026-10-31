import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import { listCruises, listItineraries } from '@/lib/api/content';
import type { OpenAlternates } from '@/lib/api/contract';
import { defaultLocale, homePath, isLegacyLocale, legacyLocales, locales, sectionPath, type Locale } from '@/lib/i18n';
import { builtFor, localeOpen } from '@/lib/intl';
import type { IntlSection } from '@/lib/intl-routes';
import { isRedirect, listArticles } from '@/views/blog/data';
import { NEWS_CATEGORY } from '@/views/blog/paths';
import { listDestinations } from '@/views/destinations/data';
import { listExperiences } from '@/views/experiences/data';
import { getFaqs } from '@/views/faq/data';

const pageProbe = z.object({}).passthrough();

// Section hubs (home, /itinerary, /blog…) of intl locales (phase 1D-b), mirroring the CMS sitemap
// (App\Services\Locale\IntlSitemap::hubs and PublicLocaleGate::withIntl).

/** Page-level publication of a static page (GET /pages/{code}: 404 while unpublished for an intl language). */
async function pagePublished(code: string, locale: Locale): Promise<boolean> {
  'use cache';
  cacheLife('minutes');
  cacheTag('content', 'pages', `page:${code}`);
  try {
    return (await getContent(`/pages/${code}`, { lang: locale }, pageProbe)) !== null;
  } catch {
    return false;
  }
}

const visibleProbe = z.object({ visible: z.boolean().optional() }).passthrough();

/** A travel guide's CMS page row is published for the language (GET /pages/{code} answers visible: false until it is). */
export async function guidePublished(code: 'guide-first-time' | 'guide-transfer', locale: Locale): Promise<boolean> {
  'use cache';
  cacheLife('minutes');
  cacheTag('content', 'pages', `page:${code}`);
  try {
    return (await getContent(`/pages/${code}`, { lang: locale }, visibleProbe))?.visible === true;
  } catch {
    return false;
  }
}

/**
 * hreflang group of a travel guide: its EN/VI pages (while visible) and the open intl ones, x-default English.
 * undefined without an open intl member, so en/vi guides keep exactly their legacy output.
 */
export async function guideAlternates(code: 'guide-first-time' | 'guide-transfer', section: 'guideFirstTime' | 'guideTransfer'): Promise<OpenAlternates | undefined> {
  const candidates = locales.filter((l) => !isLegacyLocale(l) && builtFor(l, 'guides'));
  if (candidates.length === 0) return undefined;
  const open: { lang: Locale; path: string }[] = [];
  for (const l of candidates) {
    if ((await localeOpen(l, 'guides')) && (await guidePublished(code, l))) open.push({ lang: l, path: sectionPath(l, section) });
  }
  if (open.length === 0) return undefined;
  const legacy = (await Promise.all(legacyLocales.map(async (l) => ((await guidePublished(code, l)) ? [{ lang: l, path: sectionPath(l, section) }] : []))) ).flat();
  return { entries: [...legacy, ...open], xDefault: sectionPath(defaultLocale, section) };
}

const listed = async (load: () => Promise<boolean>) => {
  try {
    return await load();
  } catch {
    return false;
  }
};

/** Whether the hub lists anything in `locale`: an empty intl hub is neither public nor linked. */
export const HUB_CONTENT: Record<IntlSection, ((locale: Locale) => Promise<boolean>) | null> = {
  // The CMS lists the home hub on evidence of a listed cruise, so it also needs the cruise section served.
  home: (locale) => listed(async () => (await localeOpen(locale, 'cruise')) && (await listCruises(locale)).length > 0),
  itinerary: (locale) => listed(async () => (await listItineraries(locale)).items.length > 0),
  experiences: (locale) => listed(async () => (await listExperiences(locale)).items.length > 0),
  destinations: (locale) => listed(async () => {
    const list = await listDestinations(locale);
    return list.visible && list.items.length > 0;
  }),
  blog: (locale) => listed(async () => {
    const list = await listArticles(locale, null, 1);
    return !!list && !isRedirect(list) && list.featured.length + list.items.length > 0;
  }),
  news: (locale) => listed(async () => {
    const list = await listArticles(locale, NEWS_CATEGORY[locale], 1);
    return !!list && !isRedirect(list) && list.featured.length + list.items.length > 0;
  }),
  faq: (locale) => listed(async () => {
    const list = await getFaqs(locale, null, 1);
    return !!list && !('redirect' in list) && list.items.length > 0;
  }),
  // Static pages: the CMS answers 404 (page_not_published) until the page row is published for the language.
  services: (locale) => pagePublished('service', locale),
  gallery: (locale) => pagePublished('gallery', locale),
  aboutUs: (locale) => pagePublished('about-us', locale),
  contact: (locale) => pagePublished('contact', locale),
  // Travel guide hub: while at least one guide's CMS page row is published for the language.
  guides: async (locale) => (await guidePublished('guide-first-time', locale)) || (await guidePublished('guide-transfer', locale)),
  cruise: null,
  cabin: null,
  // Phase 2B: the booking wizard is not a hub (nothing to list); the locale and section gate alone decide.
  booking: null,
};

export type HubSection = 'home' | 'itinerary' | 'experiences' | 'destinations' | 'blog' | 'news' | 'faq' | 'services' | 'gallery' | 'aboutUs' | 'contact' | 'guides';

const hubPath = (locale: Locale, section: HubSection) => (section === 'home' ? homePath(locale) : sectionPath(locale, section));

/** EN/VI hubs in the legacy hreflang pair: the destinations hub can be switched off, the news hub can be empty/noindex. */
const LEGACY_MEMBER: Partial<Record<HubSection, (locale: Locale) => Promise<boolean>>> = {
  destinations: (locale) => listed(async () => (await listDestinations(locale)).visible),
  news: (locale) => listed(async () => {
    const list = await listArticles(locale, NEWS_CATEGORY[locale], 1);
    return !!list && !isRedirect(list) && !list.noIndex;
  }),
};

async function legacyMembers(section: HubSection) {
  const visible = await Promise.all(legacyLocales.map(async (l) => LEGACY_MEMBER[section]?.(l) ?? true));
  return legacyLocales.filter((_, i) => visible[i]).map((lang) => ({ lang, path: hubPath(lang, section) }));
}

/**
 * The hub's translation group when an intl hub is open and lists something: the EN/VI hubs, the open intl hubs,
 * x-default English. undefined otherwise, so en/vi hubs render exactly the legacy output; a build without a ready
 * intl locale (no dictionary or route) answers without any call.
 */
export async function hubAlternates(section: HubSection): Promise<OpenAlternates | undefined> {
  const candidates = locales.filter((code) => !isLegacyLocale(code) && builtFor(code, section));
  if (candidates.length === 0) return undefined;
  const legacy = await legacyMembers(section);
  // Without an EN/VI hub pair the CMS lists intl hubs on their own (no group): mirror that.
  if (legacy.length < 2) return undefined;
  const open: { lang: Locale; path: string }[] = [];
  for (const code of candidates) {
    if ((await localeOpen(code, section)) && (await HUB_CONTENT[section]?.(code))) open.push({ lang: code, path: hubPath(code, section) });
  }
  return open.length > 0 ? { entries: [...legacy, ...open], xDefault: hubPath(defaultLocale, section) } : undefined;
}
