import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSite, listCruises, listItineraries } from '@/lib/api/content';
import { destinationPath, homePath, sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { getDestination, listDestinations, livePlacePaths, type Destination } from './data';
import { unlinkHiddenPlaces } from './links';
import { DestinationsView } from './DestinationsView';
import { DestinationView } from './DestinationView';
import { destinationMessages } from './messages';

/** Builds the page exports for one language; app/(en)/destinations and app/(vi)/vi/dia-diem-tham-quan re-export them. */
export function destinationsRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, list, otherList] = await Promise.all([getSite(locale), listDestinations(locale), listDestinations(other)]);
    if (!list.visible) return {};
    const m = destinationMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: list.seo.title ?? m.metaTitle,
      description: list.seo.description ?? m.metaDescription,
      path: sectionPath(locale, 'destinations'),
      alternatePath: otherList.visible ? sectionPath(other, 'destinations') : undefined,
      image: list.items.find((d) => d.image)?.image?.src ?? null,
    });
  }

  async function Page() {
    const [site, list, itineraries, otherList, cruises] = await Promise.all([
      getSite(locale),
      listDestinations(locale),
      listItineraries(locale),
      listDestinations(other),
      listCruises(locale),
    ]);
    // Hub switched off in the CMS ("Hiển thị trên website"); the API then returns no destinations either.
    if (!list.visible) notFound();
    return (
      <DestinationsView
        items={list.items}
        itineraries={itineraries.items}
        cruises={cruises.map(({ id, slug, name }) => ({ id, slug, name }))}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: otherList.visible ? sectionPath(other, 'destinations') : homePath(other) }}
      />
    );
  }

  return { generateMetadata, Page };
}

type Params = { params: Promise<{ slug: string }> };

/** Never a real destination slug (slugs are lowercase words joined by hyphens). */
const HIDDEN_PLACEHOLDER = '_hidden';

const alternateOf = (d: Destination) => (d.alternate ? destinationPath(d.alternate.lang, d.alternate.slug) : undefined);

/** Builds the page exports for one language; app/(en)/destinations/[slug] and app/(vi)/vi/dia-diem-tham-quan/[slug] re-export them. */
export function destinationRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateStaticParams() {
    const { items } = await listDestinations(locale);
    // Cache Components rejects an empty list; while the hub is switched off in the CMS there are no
    // destinations, so prerender one placeholder slug that renders the 404 page.
    return items.length > 0 ? items.map((d) => ({ slug: d.slug })) : [{ slug: HIDDEN_PLACEHOLDER }];
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
    const [site, otherList, live] = await Promise.all([getSite(locale), listDestinations(other), livePlacePaths(locale)]);
    // Without a translation the language switch goes to the other language's hub (home page if that hub is hidden).
    const fallback = otherList.visible ? sectionPath(other, 'destinations') : homePath(other);
    return (
      <DestinationView
        destination={{ ...d, contentHtml: unlinkHiddenPlaces(d.contentHtml, live) }}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternateOf(d) ?? fallback }}
      />
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
