import type { Metadata } from 'next';
import { withPreviewBanner } from '@/components/layout/PreviewBanner';
import { listCabins, listItineraries } from '@/lib/api/content';
import { homePath, type Locale } from '@/lib/i18n';
import { hubAlternates } from '@/lib/intl-hubs';
import { getHomepageFor, getSiteFor, isPreview, previewMetadata } from '@/lib/preview-loaders';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { HomeView } from './HomeView';

export function homeRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, page, alternates] = await Promise.all([getSiteFor(locale), getHomepageFor(locale), hubAlternates('home')]);
    const t = getMessages(locale).home;
    return previewMetadata(pageMetadata({
      locale,
      site: siteInfo(site),
      title: page.seo.title ?? t.metaTitle,
      description: page.seo.description ?? t.metaDescription,
      path: homePath(locale),
      alternatePath: homePath(other),
      alternates,
      image: page.banner[0]?.image,
    }));
  }

  // Ha Long (Green Ruby 1) first, then Lan Ha; shorter voyage first. The vi homepage config listed them out of order.
  const bayRank = (bay: string | null | undefined) => (bay === 'ha-long' ? 0 : bay === 'lan-ha' ? 1 : 2);

  async function Page() {
    const [site, raw, list, cabins, alternates] = await Promise.all([getSiteFor(locale), getHomepageFor(locale), listItineraries(locale), listCabins(locale), hubAlternates('home')]);
    // The homepage config stores a snapshot of each itinerary's ship, which goes stale when an itinerary
    // moves to another ship (links then hit a 308). Take ship, URL parts and bay from the live listing.
    const live = new Map(list.items.map((it) => [it.itineraryId, it]));
    const page = {
      ...raw,
      itineraries: raw.itineraries.map((it) => {
        const current = live.get(it.itineraryId);
        return current ? { ...it, cruiseId: current.cruiseId, cruiseName: current.cruiseName, slug: current.slug, bay: current.bay ?? it.bay } : it;
      }).sort((a, b) => bayRank(a.bay) - bayRank(b.bay) || a.duration - b.duration),
    };
    return withPreviewBanner(await isPreview(), <HomeView page={page} allCabins={cabins} chrome={{ locale, site, t: getMessages(locale), alternateHref: homePath(other), alternates }} />);
  }

  return { generateMetadata, Page };
}
