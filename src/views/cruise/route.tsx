import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { listCruises } from '@/lib/api/content';
import { getCruiseFor, getSiteFor, isPreview } from '@/lib/preview-loaders';
import { withPreviewBanner } from '@/components/layout/PreviewBanner';
import { detailPath, homePath, parseDetailFile, type Locale } from '@/lib/i18n';
import { pageAlternates } from '@/lib/intl';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { listDestinations } from '@/views/destinations/data';
import { placesOnItineraries } from '@/views/destinations/links';
import { CruiseView } from './CruiseView';

type Params = { params: Promise<{ file: string }> };

// app_cruise has no seo_* columns yet, so the API falls back to the bare ship name and summary.
// Keyed by CMS cruise id (ids differ per language). GR1 sails Ha Long Bay, GR2 Lan Ha Bay.
const SEO: Record<number, { title: string; description: string }> = {
  3: {
    title: 'Green Ruby 1 | Luxury Ha Long Bay Cruise, 46 Cabins',
    description: 'Green Ruby 1: a 46-cabin eco-luxury cruise on Ha Long Bay with a 120 m² suite, solar-assisted power and seawater cooling. Pre-book now.',
  },
  4: {
    title: 'Green Ruby 2 | Quiet Luxury Lan Ha Bay Cruise, 46 Cabins',
    // No kayaking claim: kayaking on the Cat Ba bays (Lan Ha) is suspended by the local authority (2026-11-15 SEO pass).
    description: 'Green Ruby 2: a 46-cabin cruise on the quieter Lan Ha Bay, with Jacuzzi suites and unhurried days among hidden lagoons. First sailings in 2027.',
  },
  1: {
    title: 'Green Ruby 1 | Du Thuyền Hạng Sang Vịnh Hạ Long',
    description: 'Green Ruby 1: du thuyền eco-luxury 46 cabin trên Vịnh Hạ Long, suite rộng 120 m², hỗ trợ năng lượng mặt trời và làm mát bằng nước biển.',
  },
  2: {
    title: 'Green Ruby 2 | Du Thuyền Hạng Sang Yên Tĩnh Vịnh Lan Hạ',
    description: 'Green Ruby 2: du thuyền 46 phòng trên vịnh Lan Hạ yên tĩnh, với phòng suite có Jacuzzi và các trải nghiệm khám phá vịnh. Dự kiến khởi hành năm 2027.',
  },
};

async function load(locale: Locale, file: string) {
  const parsed = parseDetailFile(file);
  const cruise = parsed ? await getCruiseFor(parsed.id, locale) : null;
  return cruise ? { cruise, canonicalPath: detailPath(locale, 'cruise', cruise.slug, cruise.id) } : null;
}

export function cruiseRoute(locale: Locale) {
  const alternateOf = (cruise: NonNullable<Awaited<ReturnType<typeof load>>>['cruise']) =>
    cruise.alternate ? detailPath(cruise.alternate.lang, 'cruise', cruise.alternate.slug, cruise.alternate.id) : undefined;

  async function generateStaticParams() {
    const cruises = await listCruises(locale);
    return cruises.map((cruise) => ({ file: `${cruise.slug}-${cruise.id}.html` }));
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const loaded = await load(locale, (await params).file);
    if (!loaded) return {};
    const { cruise, canonicalPath } = loaded;
    const [site, alternates, preview] = await Promise.all([getSiteFor(locale), pageAlternates(locale, 'cruise', cruise.alternates), isPreview()]);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: SEO[cruise.id]?.title ?? cruise.seo.title ?? cruise.name,
      description: SEO[cruise.id]?.description ?? cruise.seo.description ?? cruise.summary ?? undefined,
      path: canonicalPath,
      alternatePath: alternateOf(cruise),
      alternates,
      noIndex: preview || undefined,
      image: cruise.cover ?? cruise.image,
    });
  }

  // Awaited outside <Suspense> so 404/301 keep correct status codes (pages export instant = false).
  async function Page({ params }: Params) {
    const { file } = await params;
    const loaded = await load(locale, file);
    if (!loaded) notFound();
    const { cruise, canonicalPath } = loaded;
    if (canonicalPath.split('/').pop() !== file) permanentRedirect(canonicalPath);
    const [site, cruises, destinations, alternates, preview] = await Promise.all([
      getSiteFor(locale),
      listCruises(locale),
      listDestinations(locale),
      pageAlternates(locale, 'cruise', cruise.alternates),
      isPreview(),
    ]);
    const index = Math.max(1, cruises.findIndex((x) => x.id === cruise.id) + 1);
    const other: Locale = locale === 'en' ? 'vi' : 'en';
    return withPreviewBanner(
      preview,
      <CruiseView
        cruise={cruise}
        index={index}
        places={placesOnItineraries(destinations.items, cruise.itineraries.map((it) => it.itineraryId))}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternateOf(cruise) ?? homePath(other), alternates }}
      />,
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
