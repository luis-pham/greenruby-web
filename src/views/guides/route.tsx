import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageSeo, getSite, isPageVisible, listItineraries } from '@/lib/api/content';
import { guideLinks } from '@/lib/guide-links';
import { destinationPath, homePath, sectionPath, type Locale } from '@/lib/i18n';
import { MAPS_URL } from '@/lib/organization';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { listDestinations } from '@/views/destinations/data';
import { destinationMessages } from '@/views/destinations/messages';
import firstTimeEn from './first-time.en';
import firstTimeVi from './first-time.vi';
import { GuideView } from './GuideView';
import transferEn from './transfer.en';
import transferVi from './transfer.vi';
import type { GuideContent } from './types';

const GUIDES = {
  guideFirstTime: { code: 'guide-first-time', content: { en: firstTimeEn, vi: firstTimeVi } },
  guideTransfer: { code: 'guide-transfer', content: { en: transferEn, vi: transferVi } },
} as const satisfies Record<string, { code: 'guide-first-time' | 'guide-transfer'; content: Record<Locale, GuideContent> }>;

type Guide = keyof typeof GUIDES;

/**
 * Link targets used in guide copy. Destination links resolve only to published destinations, and guide
 * links only to hubs that are switched on, so a hidden or missing page renders as plain text.
 */
function resolver(locale: Locale, publishedSlugs: Set<string>, hiddenPages: readonly string[]) {
  const links: Record<string, string | null> = {
    ...guideLinks(locale, hiddenPages),
    itineraries: sectionPath(locale, 'itinerary'),
    faq: sectionPath(locale, 'faq'),
    contact: sectionPath(locale, 'contact'),
    'checkin-map': MAPS_URL,
  };
  return (target: string): string | null => {
    if (target.startsWith('/') || /^https?:\/\//.test(target)) return target;
    if (target.startsWith('destination:')) {
      const slug = target.slice('destination:'.length);
      return publishedSlugs.has(slug) ? destinationPath(locale, slug) : null;
    }
    return links[target] ?? null;
  };
}

/** Builds the page exports of one guide in one language (app routes re-export them). */
export function guideRoute(guide: Guide, locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  const { code, content } = GUIDES[guide];
  const c = content[locale];

  async function generateMetadata(): Promise<Metadata> {
    const [site, seo, visible, otherVisible] = await Promise.all([
      getSite(locale),
      getPageSeo(code, locale),
      isPageVisible(code, locale),
      isPageVisible(code, other),
    ]);
    if (!visible) return {};
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: seo.title ?? c.metaTitle,
      description: seo.description ?? c.metaDescription,
      path: sectionPath(locale, guide),
      alternatePath: otherVisible ? sectionPath(other, guide) : undefined,
    });
  }

  async function Page() {
    // Switched off in the CMS ("Hiển thị trên website"): 404 until an editor turns it back on.
    if (!(await isPageVisible(code, locale))) notFound();
    const [site, destinations, itineraries, otherVisible] = await Promise.all([
      getSite(locale),
      listDestinations(locale),
      listItineraries(locale),
      isPageVisible(code, other),
    ]);
    return (
      <GuideView
        // The language switch goes to the other language's home page when its copy of the guide is hidden.
        chrome={{ locale, site, t: getMessages(locale), alternateHref: otherVisible ? sectionPath(other, guide) : homePath(other) }}
        content={c}
        path={sectionPath(locale, guide)}
        resolve={resolver(locale, new Set(destinations.items.map((d) => d.slug)), site.hiddenPages)}
        itineraries={itineraries.items}
        bayLabels={destinationMessages[locale].bays}
      />
    );
  }

  return { generateMetadata, Page };
}
