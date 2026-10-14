import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getCabin, getSite, listCabins } from '@/lib/api/content';
import { homePath, parseDetailFile, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { CabinView, cabinPath } from './CabinView';

type Params = { params: Promise<{ file: string }> };

async function load(locale: Locale, file: string) {
  const parsed = parseDetailFile(file);
  if (!parsed) notFound();
  const cabin = await getCabin(parsed.id, locale);
  if (!cabin) notFound();
  return { cabin, canonical: cabinPath(locale, cabin), requested: parsed };
}

async function alternateHref(locale: Locale, cabin: NonNullable<Awaited<ReturnType<typeof getCabin>>>) {
  if (!cabin.alternate) return { href: homePath(locale === 'en' ? 'vi' : 'en'), exact: false };
  const other = await getCabin(cabin.alternate.id, cabin.alternate.lang);
  return other
    ? { href: cabinPath(cabin.alternate.lang, other), exact: true }
    : { href: homePath(cabin.alternate.lang), exact: false };
}

/** Builds the page exports for one language; app/(en)/cabin and app/(vi)/vi/phong-nghi re-export them. */
export function cabinRoute(locale: Locale) {
  async function generateStaticParams() {
    const cabins = await listCabins(locale);
    return cabins.map((cabin) => ({ file: `${cabin.slug}-${cabin.id}.html` }));
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { file } = await params;
    // Unknown cabins: return nothing here and let Page call notFound(), so the 404 renders the
    // group's not-found.tsx (notFound() thrown from metadata produces a blank error shell).
    const parsed = parseDetailFile(file);
    const cabin = parsed ? await getCabin(parsed.id, locale) : null;
    if (!cabin) return {};
    const canonical = cabinPath(locale, cabin);
    const [site, alternate] = await Promise.all([getSite(locale), alternateHref(locale, cabin)]);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: `${cabin.name} · ${cabin.cruise.name}`,
      description: cabin.summary ?? undefined,
      path: canonical,
      alternatePath: alternate.exact ? alternate.href : undefined,
      image: cabin.image,
    });
  }

  // params are awaited outside <Suspense> on purpose: the response must not start streaming before
  // we know whether it is a 200, a 301 to the canonical slug or a 404 (pages export instant = false).
  async function Page({ params }: Params) {
    const { file } = await params;
    const { cabin, canonical } = await load(locale, file);
    // Old or mistyped slugs (e.g. after a rename in the CMS) 301 to the canonical URL.
    if (`${canonical.split('/').pop()}` !== file) permanentRedirect(canonical);
    const [site, alternate] = await Promise.all([getSite(locale), alternateHref(locale, cabin)]);
    return <CabinView cabin={cabin} chrome={{ locale, site, t: getMessages(locale), alternateHref: alternate.href }} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
