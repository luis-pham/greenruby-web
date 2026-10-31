import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { withPreviewBanner } from '@/components/layout/PreviewBanner';
import { listItineraries } from '@/lib/api/content';
import { itineraryPath, sectionPath, type Locale } from '@/lib/i18n';
import { pageAlternates } from '@/lib/intl';
import { getItineraryFor, getSiteFor, isPreview } from '@/lib/preview-loaders';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { listDestinations } from '@/views/destinations/data';
import { placesOnItinerary } from '@/views/destinations/links';
import { ItineraryView } from './ItineraryView';

type Params = { params: Promise<{ file: string }> };

/** "2-days-1-night-ha-long-3-4.html" -> slug, cruiseId 3, itineraryId 4 (Laravel's URL format). */
function parseFile(file: string) {
  const match = /^(.+)-(\d+)-(\d+)\.html$/.exec(file);
  return match ? { slug: match[1], cruiseId: Number(match[2]), itineraryId: Number(match[3]) } : null;
}

async function load(locale: Locale, file: string) {
  const parsed = parseFile(file);
  const itinerary = parsed ? await getItineraryFor(parsed.cruiseId, parsed.itineraryId, locale) : null;
  if (!itinerary) return null;
  const { canonical } = itinerary;
  return { itinerary, canonicalPath: itineraryPath(locale, canonical.slug, canonical.cruiseId, canonical.itineraryId) };
}

export function itineraryRoute(locale: Locale) {
  const alternateOf = (it: NonNullable<Awaited<ReturnType<typeof load>>>['itinerary']) =>
    it.alternate ? itineraryPath(it.alternate.lang, it.alternate.slug, it.alternate.cruiseId, it.alternate.itineraryId) : undefined;

  async function generateStaticParams() {
    const { items } = await listItineraries(locale);
    return items.map((it) => ({ file: `${it.slug}-${it.cruiseId}-${it.itineraryId}.html` }));
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const loaded = await load(locale, (await params).file);
    if (!loaded) return {};
    const { itinerary: it, canonicalPath } = loaded;
    const [site, alternates, preview] = await Promise.all([getSiteFor(locale), pageAlternates(locale, 'itinerary', it.alternates), isPreview()]);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: it.seo.title ?? it.name,
      description: it.seo.description ?? it.description ?? undefined,
      path: canonicalPath,
      alternatePath: alternateOf(it),
      alternates,
      noIndex: preview || undefined,
      image: it.image ?? it.cruise.image,
    });
  }

  // Awaited outside <Suspense> so 404/301 keep correct status codes (pages export instant = false).
  async function Page({ params }: Params) {
    const { file } = await params;
    const loaded = await load(locale, file);
    if (!loaded) notFound();
    const { itinerary, canonicalPath } = loaded;
    // Wrong slug or a cruise that doesn't sail this bay: 301 to the canonical URL (as Laravel does).
    if (canonicalPath.split('/').pop() !== file) permanentRedirect(canonicalPath);
    const [site, destinations, alternates, preview] = await Promise.all([
      getSiteFor(locale),
      listDestinations(locale),
      pageAlternates(locale, 'itinerary', itinerary.alternates),
      isPreview(),
    ]);
    const other: Locale = locale === 'en' ? 'vi' : 'en';
    return withPreviewBanner(
      preview,
      <ItineraryView
        itinerary={itinerary}
        places={placesOnItinerary(destinations.items, itinerary.itineraryId)}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternateOf(itinerary) ?? sectionPath(other, 'itinerary'), alternates }}
      />,
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
