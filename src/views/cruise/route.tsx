import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getCruise, getSite, listCruises } from '@/lib/api/content';
import { detailPath, homePath, parseDetailFile, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
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
    title: 'Green Ruby 2 | Quiet Luxury Cruise on Lan Ha Bay',
    description: 'Green Ruby 2: a 46-cabin eco-luxury cruise on the quieter Lan Ha Bay, with Jacuzzi suites, kayaking beside the ship and fewer crowds. Pre-book now.',
  },
  1: {
    title: 'Green Ruby 1 | Du Thuyền Hạng Sang Vịnh Hạ Long',
    description: 'Green Ruby 1: du thuyền eco-luxury 46 cabin trên Vịnh Hạ Long, suite rộng 120 m², hỗ trợ năng lượng mặt trời và làm mát bằng nước biển.',
  },
  2: {
    title: 'Green Ruby 2 | Du Thuyền Hạng Sang Yên Tĩnh Vịnh Lan Hạ',
    description: 'Green Ruby 2: du thuyền eco-luxury 46 cabin trên Vịnh Lan Hạ yên tĩnh, suite Jacuzzi, chèo kayak ngay cạnh tàu, tránh xa đám đông.',
  },
};

async function load(locale: Locale, file: string) {
  const parsed = parseDetailFile(file);
  const cruise = parsed ? await getCruise(parsed.id, locale) : null;
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
    const site = await getSite(locale);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: SEO[cruise.id]?.title ?? cruise.seo.title ?? cruise.name,
      description: SEO[cruise.id]?.description ?? cruise.seo.description ?? cruise.summary ?? undefined,
      path: canonicalPath,
      alternatePath: alternateOf(cruise),
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
    const [site, cruises] = await Promise.all([getSite(locale), listCruises(locale)]);
    const index = Math.max(1, cruises.findIndex((x) => x.id === cruise.id) + 1);
    const other: Locale = locale === 'en' ? 'vi' : 'en';
    return (
      <CruiseView
        cruise={cruise}
        index={index}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternateOf(cruise) ?? homePath(other) }}
      />
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
