import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSite, listItineraries } from '@/lib/api/content';
import { destinationPath, sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { getDestination, listDestinations, type Destination } from './data';
import { DestinationsView } from './DestinationsView';
import { DestinationView } from './DestinationView';
import { destinationMessages } from './messages';

/** Builds the page exports for one language; app/(en)/destinations and app/(vi)/vi/dia-diem-tham-quan re-export them. */
export function destinationsRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, list] = await Promise.all([getSite(locale), listDestinations(locale)]);
    const m = destinationMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: list.seo.title ?? m.metaTitle,
      description: list.seo.description ?? m.metaDescription,
      path: sectionPath(locale, 'destinations'),
      alternatePath: sectionPath(other, 'destinations'),
      image: list.items.find((d) => d.image)?.image?.src ?? null,
    });
  }

  async function Page() {
    const [site, list, itineraries] = await Promise.all([getSite(locale), listDestinations(locale), listItineraries(locale)]);
    return (
      <DestinationsView
        items={list.items}
        itineraries={itineraries.items}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'destinations') }}
      />
    );
  }

  return { generateMetadata, Page };
}

type Params = { params: Promise<{ slug: string }> };

const alternateOf = (d: Destination) => (d.alternate ? destinationPath(d.alternate.lang, d.alternate.slug) : undefined);

/** Builds the page exports for one language; app/(en)/destinations/[slug] and app/(vi)/vi/dia-diem-tham-quan/[slug] re-export them. */
export function destinationRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateStaticParams() {
    const { items } = await listDestinations(locale);
    return items.map((d) => ({ slug: d.slug }));
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const d = await getDestination((await params).slug, locale);
    if (!d) return {};
    const site = await getSite(locale);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: d.seo.title ?? d.name,
      description: d.seo.description ?? d.summary ?? undefined,
      path: destinationPath(locale, d.slug),
      // hreflang only when the other language has a linked, published page.
      alternatePath: alternateOf(d),
      image: d.image?.src ?? null,
    });
  }

  // params are awaited outside <Suspense> on purpose: the status code (200/404) must be known before streaming.
  async function Page({ params }: Params) {
    const { slug } = await params;
    const d = await getDestination(slug, locale);
    if (!d) notFound();
    const site = await getSite(locale);
    return (
      <DestinationView
        destination={d}
        // Without a translation the language switch goes to the other language's hub, never to a missing page.
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternateOf(d) ?? sectionPath(other, 'destinations') }}
      />
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
