import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getCruise, getSite, listCruises } from '@/lib/api/content';
import { detailPath, homePath, parseDetailFile, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { CruiseView } from './CruiseView';

type Params = { params: Promise<{ file: string }> };

// app_cruise has no seo_title column yet, so the API falls back to the bare ship name.
// Keyed by CMS cruise id (ids differ per language). GR1 sails Ha Long Bay, GR2 Lan Ha Bay.
const SEO_TITLES: Record<number, string> = {
  3: 'Green Ruby 1 | Luxury Ha Long Bay Cruise, 46 Cabins',
  4: 'Green Ruby 2 | Quiet Luxury Cruise on Lan Ha Bay',
  1: 'Green Ruby 1 | Du Thuyền Hạng Sang Vịnh Hạ Long',
  2: 'Green Ruby 2 | Du Thuyền Sang Trọng Vịnh Lan Hạ',
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
      title: SEO_TITLES[cruise.id] ?? cruise.seo.title ?? cruise.name,
      description: cruise.seo.description ?? cruise.summary ?? undefined,
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
