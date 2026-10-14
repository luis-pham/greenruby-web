import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getSite } from '@/lib/api/content';
import { experiencePath, parseDetailFile, sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { getExperience, listExperiences, type Experience } from './data';
import { ExperiencesView } from './ExperiencesView';
import { ExperienceView } from './ExperienceView';
import { experienceMessages } from './messages';

/** Builds the page exports for one language; app/(en)/experiences and app/(vi)/vi/hoat-dong-trai-nghiem re-export them. */
export function experiencesRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, list] = await Promise.all([getSite(locale), listExperiences(locale)]);
    const m = experienceMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: list.seo.title ?? m.metaTitle,
      description: list.seo.description ?? m.metaDescription,
      path: sectionPath(locale, 'experiences'),
      alternatePath: sectionPath(other, 'experiences'),
      image: list.page.gallery?.[0]?.src ?? list.featured[0]?.cover ?? null,
    });
  }

  async function Page() {
    const [site, list] = await Promise.all([getSite(locale), listExperiences(locale)]);
    return (
      <ExperiencesView
        list={list}
        m={experienceMessages[locale]}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'experiences') }}
      />
    );
  }

  return { generateMetadata, Page };
}

type Params = { params: Promise<{ file: string }> };

async function load(locale: Locale, file: string) {
  const parsed = parseDetailFile(file);
  const experience = parsed ? await getExperience(parsed.id, locale) : null;
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
    const site = await getSite(locale);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: x.seo.title ?? x.name,
      description: x.seo.description ?? x.summary ?? undefined,
      path: canonicalPath,
      alternatePath: alternateOf(x),
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
    const [site, list] = await Promise.all([getSite(locale), listExperiences(locale)]);
    // CMS "related" (same group) first, then the rest of the collection, so the section always has three cards.
    const seen = new Set([experience.id]);
    const more = [...experience.related, ...list.items].filter((item) => !seen.has(item.id) && seen.add(item.id)).slice(0, 3);
    return (
      <ExperienceView
        experience={experience}
        more={more}
        page={list.page}
        m={experienceMessages[locale]}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternateOf(experience) ?? sectionPath(other, 'experiences') }}
      />
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
