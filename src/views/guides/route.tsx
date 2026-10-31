import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageSeo, getSite, isPageVisible, listItineraries } from '@/lib/api/content';
import { guideLinks } from '@/lib/guide-links';
import { sectionHref } from '@/lib/section-links';
import { destinationPath, homePath, inLocale, isLegacyLocale, sectionPath, segmentOf, type LegacyCopy, type Locale } from '@/lib/i18n';
import { guideAlternates, guidePublished, hubAlternates } from '@/lib/intl-hubs';
import { MAPS_URL } from '@/lib/organization';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { listDestinations } from '@/views/destinations/data';
import { destinationMessages } from '@/views/destinations/messages';
import { listArticles } from '@/views/blog/data';
import { articlePath } from '@/views/blog/paths';
import firstTimeEn from './first-time.en';
import firstTimeJa from './first-time.ja';
import firstTimeVi from './first-time.vi';
import { GuideView } from './GuideView';
import { HubView, type HubCruise } from './HubView';
import { hubMessages } from './hub-messages';
import transferEn from './transfer.en';
import transferJa from './transfer.ja';
import transferVi from './transfer.vi';
import type { GuideContent } from './types';

const GUIDES = {
  guideFirstTime: { code: 'guide-first-time', content: { en: firstTimeEn, vi: firstTimeVi, ja: firstTimeJa } },
  guideTransfer: { code: 'guide-transfer', content: { en: transferEn, vi: transferVi, ja: transferJa } },
} as const satisfies Record<string, { code: 'guide-first-time' | 'guide-transfer'; content: LegacyCopy<GuideContent> }>;

type Guide = keyof typeof GUIDES;

/**
 * Link targets used in guide copy. Destination links resolve only to published destinations, and guide
 * links only to hubs that are switched on, so a hidden or missing page renders as plain text.
 */
function resolver(locale: Locale, publishedSlugs: Set<string>, hiddenPages: readonly string[], publicSections?: readonly string[]) {
  const links: Record<string, string | null> = {
    ...guideLinks(locale, hiddenPages, publicSections),
    itineraries: sectionHref(locale, 'itinerary', publicSections),
    faq: sectionHref(locale, 'faq', publicSections),
    contact: sectionHref(locale, 'contact', publicSections),
    'checkin-map': MAPS_URL,
  };
  return (target: string): string | null => {
    // A new language's copy keeps the English section paths: its own section page once public, else English.
    const section = !isLegacyLocale(locale) && /^\/[a-z-]+$/.test(target) ? segmentOf(target.slice(1), 'en') : null;
    if (section) return sectionHref(locale, section, publicSections);
    if (target.startsWith('/') || target.startsWith('#') || /^https?:\/\//.test(target)) return target;
    if (target.startsWith('destination:')) {
      const slug = target.slice('destination:'.length);
      return publishedSlugs.has(slug) ? destinationPath(locale, slug) : null;
    }
    return links[target] ?? null;
  };
}

/**
 * Whether the guide is on for the language: en/vi follow the CMS switch ("Hiển thị trên website"); a new language
 * needs its page row published (an unanswered request counts as unpublished, never as visible).
 */
const guideVisible = (code: 'guide-first-time' | 'guide-transfer', locale: Locale) =>
  isLegacyLocale(locale) ? isPageVisible(code, locale) : guidePublished(code, locale);

/** Builds the page exports of one guide in one language (app routes re-export them). */
export function guideRoute(guide: Guide, locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  const { code, content } = GUIDES[guide];
  const c = inLocale<GuideContent>(content, locale);

  async function generateMetadata(): Promise<Metadata> {
    const [site, seo, visible, otherVisible, alternates] = await Promise.all([
      getSite(locale),
      getPageSeo(code, locale),
      guideVisible(code, locale),
      guideVisible(code, other),
      guideAlternates(code, guide),
    ]);
    if (!visible) return {};
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: seo.title ?? c.metaTitle,
      description: seo.description ?? c.metaDescription,
      path: sectionPath(locale, guide),
      alternatePath: otherVisible ? sectionPath(other, guide) : undefined,
      alternates,
    });
  }

  async function Page() {
    // Switched off in the CMS ("Hiển thị trên website"): 404 until an editor turns it back on.
    if (!(await guideVisible(code, locale))) notFound();
    const [site, destinations, itineraries, otherVisible, alternates] = await Promise.all([
      getSite(locale),
      listDestinations(locale),
      listItineraries(locale),
      guideVisible(code, other),
      guideAlternates(code, guide),
    ]);
    return (
      <GuideView
        // The language switch goes to the other language's home page when its copy of the guide is hidden.
        chrome={{ locale, site, t: getMessages(locale), alternateHref: otherVisible ? sectionPath(other, guide) : homePath(other), alternates }}
        content={c}
        path={sectionPath(locale, guide)}
        resolve={resolver(locale, new Set(destinations.items.map((d) => d.slug)), site.hiddenPages, site.publicSections)}
        itineraries={itineraries.items}
        bayLabels={destinationMessages[locale].bays}
      />
    );
  }

  return { generateMetadata, Page };
}

/** The route factories the app routes call (one argument each: scripts/i18n/routes-generate.mjs copies them to ja). */
export const firstTimeGuideRoute = (locale: Locale) => guideRoute('guideFirstTime', locale);
export const transferGuideRoute = (locale: Locale) => guideRoute('guideTransfer', locale);

/** /guides and /vi/cam-nang: the travel guide hub (navigation page, always on; it links only to what is live). */
export function hubRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  const m = hubMessages[locale];

  async function generateMetadata(): Promise<Metadata> {
    const [site, alternates] = await Promise.all([getSite(locale), hubAlternates('guides')]);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: m.metaTitle,
      description: m.metaDescription,
      path: sectionPath(locale, 'guides'),
      alternatePath: sectionPath(other, 'guides'),
      alternates,
    });
  }

  async function Page() {
    const [site, destinations, itineraries, list, alternates] = await Promise.all([
      getSite(locale),
      listDestinations(locale),
      listItineraries(locale),
      listArticles(locale, null, 1),
      hubAlternates('guides'),
    ]);
    // Ships from the live itinerary listing (each once), with the bay they sail.
    const cruises = new Map<number, HubCruise>();
    for (const it of itineraries.items) {
      if (!cruises.has(it.cruiseId) && it.cruiseSlug && it.cruiseName) cruises.set(it.cruiseId, { id: it.cruiseId, slug: it.cruiseSlug, name: it.cruiseName, bay: it.bay });
    }
    const articles = list && !('redirect' in list) ? [...list.featured, ...list.items] : [];
    const seen = new Set<number>();
    return (
      <HubView
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'guides'), alternates }}
        places={destinations.items}
        cruises={[...cruises.values()]}
        articles={articles
          .filter((a) => a.category && !seen.has(a.id) && seen.add(a.id))
          .map((a) => ({ href: articlePath(locale, a.category!.slug, a.slug), title: a.title, category: a.category!.name }))}
      />
    );
  }

  return { generateMetadata, Page };
}
