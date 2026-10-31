import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { withPreviewBanner } from '@/components/layout/PreviewBanner';
import { getSite } from '@/lib/api/content';
import { experiencePath, parseDetailFile, sectionPath, type Locale } from '@/lib/i18n';
import { pageAlternates } from '@/lib/intl';
import { hubAlternates } from '@/lib/intl-hubs';
import { getExperienceFor, getSiteFor, isPreview } from '@/lib/preview-loaders';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { listDestinations } from '@/views/destinations/data';
import { placesForExperience } from '@/views/destinations/links';
import { listExperiences, type Experience } from './data';
import { ExperiencesView } from './ExperiencesView';
import { ExperienceView } from './ExperienceView';
import { experienceMessages } from './messages';

/** Builds the page exports for one language; app/(en)/experiences and app/(vi)/vi/hoat-dong-trai-nghiem re-export them. */
export function experiencesRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, list, alternates] = await Promise.all([getSite(locale), listExperiences(locale), hubAlternates('experiences')]);
    const m = experienceMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: list.seo.title ?? m.metaTitle,
      description: list.seo.description ?? m.metaDescription,
      path: sectionPath(locale, 'experiences'),
      alternatePath: sectionPath(other, 'experiences'),
      alternates,
      image: list.page.gallery?.[0]?.src ?? list.featured[0]?.cover ?? null,
    });
  }

  async function Page() {
    const [site, list, alternates] = await Promise.all([getSite(locale), listExperiences(locale), hubAlternates('experiences')]);
    return (
      <ExperiencesView
        list={list}
        m={experienceMessages[locale]}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'experiences'), alternates }}
      />
    );
  }

  return { generateMetadata, Page };
}

type Params = { params: Promise<{ file: string }> };

async function load(locale: Locale, file: string) {
  const parsed = parseDetailFile(file);
  const experience = parsed ? await getExperienceFor(parsed.id, locale) : null;
  if (!experience) return null;
  return { experience, canonicalPath: experiencePath(locale, experience.canonicalSlug, experience.id) };
}

const alternateOf = (x: Experience) => (x.alternate ? experiencePath(x.alternate.lang, x.alternate.slug, x.alternate.id) : undefined);

/** Builds the page exports for one language; app/(en)/experiences/[file] and app/(vi)/vi/hoat-dong-trai-nghiem/[file] re-export them. */
export function experienceRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateStaticParams() {
    const { items } = await listExperiences(locale);
    return items.map((item) => ({ file: `${item.slug}-${item.id}.html` }));
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    // Unknown ids: return nothing and let Page call notFound(), so the group's not-found.tsx renders.
    const loaded = await load(locale, (await params).file);
    if (!loaded) return {};
    const { experience: x, canonicalPath } = loaded;
    const [site, alternates, preview] = await Promise.all([getSiteFor(locale), pageAlternates(locale, 'experiences', x.alternates), isPreview()]);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: x.seo.title ?? x.name,
      description: x.seo.description ?? x.summary ?? undefined,
      path: canonicalPath,
      alternatePath: alternateOf(x),
      alternates,
      noIndex: preview || undefined,
      image: x.cover ?? x.image,
    });
  }

  // params are awaited outside <Suspense> on purpose: the response must not start streaming before
  // we know whether it is a 200, a 301 to the canonical slug or a 404 (pages export instant = false).
  async function Page({ params }: Params) {
    const { file } = await params;
    const loaded = await load(locale, file);
    if (!loaded) notFound();
    const { experience, canonicalPath } = loaded;
    // Old or mistyped slugs (e.g. after a rename in the CMS) 301 to the canonical URL, as Laravel does.
    if (canonicalPath.split('/').pop() !== file) permanentRedirect(canonicalPath);
    const [site, list, destinations, alternates, preview] = await Promise.all([
      getSiteFor(locale),
      listExperiences(locale),
      listDestinations(locale),
      pageAlternates(locale, 'experiences', experience.alternates),
      isPreview(),
    ]);
    // CMS "related" (same group) first, then the rest of the collection, so the section always has three cards.
    const seen = new Set([experience.id]);
    const more = [...experience.related, ...list.items].filter((item) => !seen.has(item.id) && seen.add(item.id)).slice(0, 3);
    return withPreviewBanner(
      preview,
      <ExperienceView
        experience={experience}
        more={more}
        places={placesForExperience(destinations.items, experience.id)}
        page={list.page}
        m={experienceMessages[locale]}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternateOf(experience) ?? sectionPath(other, 'experiences'), alternates }}
      />,
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}

/**
 * Old singular URLs (/experience, /experience/{slug}-{id}.html), which Laravel 301s to the plural
 * section. Detail URLs go straight to the canonical slug so there is a single redirect hop.
 */
export function legacyExperienceRoute(locale: Locale) {
  async function generateStaticParams() {
    const { items } = await listExperiences(locale);
    return items.map((item) => ({ file: `${item.slug}-${item.id}.html` }));
  }

  function ListPage(): never {
    permanentRedirect(sectionPath(locale, 'experiences'));
  }

  async function DetailPage({ params }: Params) {
    const loaded = await load(locale, (await params).file);
    if (!loaded) notFound();
    permanentRedirect(loaded.canonicalPath);
  }

  return { generateStaticParams, ListPage, DetailPage };
}
