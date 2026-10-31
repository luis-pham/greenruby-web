import 'server-only';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { z } from 'zod';
import { getCabin, getCruise, getHomepage, getItinerary, getSite } from '@/lib/api/content';
import { cabinSchema, cruiseSchema, homepageSchema, itinerarySchema, siteSchema } from '@/lib/api/schemas';
import type { Locale } from '@/lib/i18n';
import { previewContent, previewSession } from '@/lib/preview';
import { articleSchema, getArticle } from '@/views/blog/data';
import { aboutSchema, getAboutPage } from '@/views/about/data';
import { destinationListSchema, destinationSchema, getDestination, listDestinations } from '@/views/destinations/data';
import { faqResponseSchema, getFaqs } from '@/views/faq/data';
import { gallerySchema, getGallery } from '@/views/gallery/data';
import { getServicesPage, servicesSchema } from '@/views/services/data';
import { experienceSchema, getExperience } from '@/views/experiences/data';

// Detail loaders that honour an authenticated preview (phase 1E-d). Without a preview session they are exactly the
// cached public loaders; with one they read the CMS as that session (uncached), which answers the previewed entity
// (and its pending revision) and nothing else beyond public content.

/** True when this request is an authenticated preview (pages then render noindex, without hreflang, with a banner). */
export const isPreview = async () => (await previewSession()) !== null;

export async function getSiteFor(locale: Locale) {
  const session = await previewSession();
  if (!session) return getSite(locale);
  const site = await previewContent(session, '/site', { lang: locale }, siteSchema);
  return site ?? getSite(locale);
}

export async function getCruiseFor(id: number, locale: Locale) {
  const session = await previewSession();
  return session ? previewContent(session, `/cruises/${id}`, { lang: locale }, cruiseSchema) : getCruise(id, locale);
}

export async function getCabinFor(id: number, locale: Locale) {
  const session = await previewSession();
  return session ? previewContent(session, `/cabins/${id}`, { lang: locale }, cabinSchema) : getCabin(id, locale);
}

export async function getItineraryFor(cruiseId: number, itineraryId: number, locale: Locale) {
  const session = await previewSession();
  return session ? previewContent(session, `/itineraries/${cruiseId}/${itineraryId}`, { lang: locale }, itinerarySchema) : getItinerary(cruiseId, itineraryId, locale);
}

export async function getExperienceFor(id: number, locale: Locale) {
  const session = await previewSession();
  return session ? previewContent(session, `/experiences/${id}`, { lang: locale }, experienceSchema) : getExperience(id, locale);
}

export async function getDestinationFor(slug: string, locale: Locale) {
  const session = await previewSession();
  return session ? previewContent(session, `/destinations/${encodeURIComponent(slug)}`, { lang: locale }, destinationSchema) : getDestination(slug, locale);
}

export async function getArticleFor(locale: Locale, categorySlug: string, slug: string) {
  const session = await previewSession();
  return session
    ? previewContent(session, `/articles/${encodeURIComponent(categorySlug)}/${encodeURIComponent(slug)}`, { lang: locale }, articleSchema)
    : getArticle(locale, categorySlug, slug);
}

// Hubs and static pages (1E hardening): the previewed FAQ item or page row is visible to the session only. Inside a
// session the CMS answers public content plus that row; anything it refuses is a 404 here (never the public loader,
// which would throw on a hidden page of an unreleased language).

async function inSession<T extends z.ZodTypeAny>(session: string, path: string, query: Record<string, string | number | undefined>, schema: T): Promise<z.infer<T>> {
  return (await previewContent(session, path, query, schema)) ?? notFound();
}

export async function getFaqsFor(locale: Locale, group: string | null, page: number) {
  const session = await previewSession();
  return session ? previewContent(session, '/faqs', { lang: locale, group: group ?? undefined, page }, faqResponseSchema) : getFaqs(locale, group, page);
}

export async function getServicesPageFor(locale: Locale) {
  const session = await previewSession();
  return session ? inSession(session, '/services', { lang: locale }, servicesSchema) : getServicesPage(locale);
}

export async function getAboutPageFor(locale: Locale) {
  const session = await previewSession();
  return session ? inSession(session, '/pages/about-us', { lang: locale }, aboutSchema) : getAboutPage(locale);
}

export async function getGalleryFor(locale: Locale, category: string | null, page: number) {
  const session = await previewSession();
  return session ? previewContent(session, '/gallery', { lang: locale, category: category ?? undefined, page }, gallerySchema) : getGallery(locale, category, page);
}

export async function listDestinationsFor(locale: Locale) {
  const session = await previewSession();
  return session ? inSession(session, '/destinations', { lang: locale }, destinationListSchema) : listDestinations(locale);
}

export async function getHomepageFor(locale: Locale) {
  const session = await previewSession();
  return session ? inSession(session, '/pages/homepage', { lang: locale }, homepageSchema) : getHomepage(locale);
}

/** The homepage as a secondary source (About credentials): in a preview session of another page it may be hidden. */
export async function getHomepageIfVisible(locale: Locale) {
  const session = await previewSession();
  return session ? previewContent(session, '/pages/homepage', { lang: locale }, homepageSchema) : getHomepage(locale);
}

/** In an authenticated preview: noindex and no hreflang (12 §8); unchanged otherwise. */
export async function previewMetadata(meta: Metadata): Promise<Metadata> {
  if (!(await isPreview())) return meta;
  return { ...meta, robots: { index: false, follow: false }, alternates: { canonical: meta.alternates?.canonical } };
}
