import type { Metadata } from 'next';
import { getHomepage, getSite, listItineraries } from '@/lib/api/content';
import { homePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { HomeView } from './HomeView';

export function homeRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, page] = await Promise.all([getSite(locale), getHomepage(locale)]);
    const t = getMessages(locale).home;
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: page.seo.title ?? t.metaTitle,
      description: page.seo.description ?? t.metaDescription,
      path: homePath(locale),
      alternatePath: homePath(other),
      image: page.banner[0]?.image,
    });
  }

  async function Page() {
    const [site, raw, list] = await Promise.all([getSite(locale), getHomepage(locale), listItineraries(locale)]);
    // The homepage config stores a snapshot of each itinerary's ship, which goes stale when an itinerary
    // moves to another ship (links then hit a 308). Take ship, URL parts and bay from the live listing.
    const live = new Map(list.items.map((it) => [it.itineraryId, it]));
    const page = {
      ...raw,
      itineraries: raw.itineraries.map((it) => {
        const current = live.get(it.itineraryId);
        return current ? { ...it, cruiseId: current.cruiseId, cruiseName: current.cruiseName, slug: current.slug, bay: current.bay ?? it.bay } : it;
      }),
    };
    return <HomeView page={page} chrome={{ locale, site, t: getMessages(locale), alternateHref: homePath(other) }} />;
  }

  return { generateMetadata, Page };
}
