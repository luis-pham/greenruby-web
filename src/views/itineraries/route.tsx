import type { Metadata } from 'next';
import { getSite, listItineraries } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { hubAlternates } from '@/lib/intl-hubs';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { ItinerariesView } from './ItinerariesView';

export function itinerariesRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, list, alternates] = await Promise.all([getSite(locale), listItineraries(locale), hubAlternates('itinerary')]);
    const t = getMessages(locale).itineraries;
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: list.seo.title ?? t.metaTitle,
      description: list.seo.description ?? t.metaDescription,
      path: sectionPath(locale, 'itinerary'),
      alternatePath: sectionPath(other, 'itinerary'),
      alternates,
      image: list.items[0]?.image,
    });
  }

  async function Page() {
    const [site, list, alternates] = await Promise.all([getSite(locale), listItineraries(locale), hubAlternates('itinerary')]);
    return (
      <ItinerariesView
        items={list.items}
        faqs={list.pageConfig?.faqs ?? []}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'itinerary'), alternates }}
      />
    );
  }

  return { generateMetadata, Page };
}
