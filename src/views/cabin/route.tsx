import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { withPreviewBanner } from '@/components/layout/PreviewBanner';
import { getCabin, getCruise, listCabins } from '@/lib/api/content';
import { destinationPath, homePath, parseDetailFile, type Locale } from '@/lib/i18n';
import { pageAlternates } from '@/lib/intl';
import { getCabinFor, getSiteFor, isPreview } from '@/lib/preview-loaders';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { listDestinations } from '@/views/destinations/data';
import { placesOnItineraries } from '@/views/destinations/links';
import { CabinView, cabinPath } from './CabinView';
import { sisterCabins } from './sisters';

type Params = { params: Promise<{ file: string }> };

async function load(locale: Locale, file: string) {
  const parsed = parseDetailFile(file);
  if (!parsed) notFound();
  const cabin = await getCabinFor(parsed.id, locale);
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
    const cabin = parsed ? await getCabinFor(parsed.id, locale) : null;
    if (!cabin) return {};
    const canonical = cabinPath(locale, cabin);
    const [site, alternate, alternates, preview] = await Promise.all([
      getSiteFor(locale),
      alternateHref(locale, cabin),
      pageAlternates(locale, 'cabin', cabin.alternates),
      isPreview(),
    ]);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: cabin.seo?.title ?? `${cabin.name} · ${cabin.cruise.name}`,
      description: cabin.seo?.description ?? cabin.summary ?? undefined,
      path: canonical,
      alternatePath: alternate.exact ? alternate.href : undefined,
      alternates,
      noIndex: preview || undefined,
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
    const [site, alternate, cruise, destinations, alternates, preview] = await Promise.all([
      getSiteFor(locale),
      alternateHref(locale, cabin),
      getCruise(cabin.cruise.id, locale),
      listDestinations(locale),
      pageAlternates(locale, 'cabin', cabin.alternates),
      isPreview(),
    ]);
    // The same suite on the other ship(s): a ship switch under the title (owner request 2026-11-13).
    const sisters = sisterCabins(cabin, await listCabins(locale));
    const ships =
      sisters.length > 1
        ? await Promise.all(
            sisters.map(async (sister) => {
              const sisterCruise = sister.cruise?.id === cabin.cruise.id ? cruise : sister.cruise ? await getCruise(sister.cruise.id, locale) : null;
              return { id: sister.id, name: sister.cruise?.name ?? '', bay: sisterCruise?.bay ?? null, href: cabinPath(locale, sister), current: sister.id === cabin.id };
            }),
          )
        : [];
    // Published places on this ship's itineraries (CMS relation), for the boarding-day block.
    const places = placesOnItineraries(destinations.items, (cruise?.itineraries ?? []).map((it) => it.itineraryId));
    return withPreviewBanner(
      preview,
      <CabinView
        cabin={cabin}
        cruise={cruise}
        ships={ships}
        places={places.map((d) => ({ href: destinationPath(locale, d.slug), label: d.name }))}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternate.href, alternates }}
      />,
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
