import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import type { Locale } from '@/lib/i18n';
import { getContent } from './client';
import {
  cabinListSchema,
  cabinSchema,
  cruiseListSchema,
  cruiseSchema,
  homepageSchema,
  itineraryListSchema,
  itinerarySchema,
  siteSchema,
} from './schemas';

// Every reader is cached and tagged. Laravel (app/Http/Middleware/RevalidateFrontend.php) calls
// /api/revalidate with these tags after admin edits; "content" refreshes everything (e.g. media).

export async function getSite(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'site', `site:${locale}`);
  const site = await getContent('/site', { lang: locale }, siteSchema);
  if (!site) throw new Error(`Site config missing for ${locale}`);
  return site;
}

export async function getCabin(id: number, locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'cabins', `cabin:${id}`);
  return getContent(`/cabins/${id}`, { lang: locale }, cabinSchema);
}

export async function listCabins(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'cabins');
  const list = await getContent('/cabins', { lang: locale }, cabinListSchema);
  return list?.items ?? [];
}

export async function getHomepage(locale: Locale) {
  'use cache';
  cacheLife('hours');
  // The homepage shows cruises, itineraries, cabins, services, experiences and FAQs.
  cacheTag('content', 'pages', 'page:homepage', 'cruises', 'itineraries', 'cabins', 'services', 'experiences', 'faqs');
  const page = await getContent('/pages/homepage', { lang: locale }, homepageSchema);
  if (!page) throw new Error(`Homepage content missing for ${locale}`);
  return page;
}

export async function listItineraries(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'itineraries', 'page:itinerary');
  const list = await getContent('/itineraries', { lang: locale }, itineraryListSchema);
  if (!list) throw new Error(`Itinerary list missing for ${locale}`);
  return list;
}

export async function getItinerary(cruiseId: number, itineraryId: number, locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'itineraries', `itinerary:${itineraryId}`, `cruise:${cruiseId}`, 'cabins', 'services', 'experiences');
  return getContent(`/itineraries/${cruiseId}/${itineraryId}`, { lang: locale }, itinerarySchema);
}

export async function listCruises(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'cruises');
  const list = await getContent('/cruises', { lang: locale }, cruiseListSchema);
  return list?.items ?? [];
}

export async function getCruise(id: number, locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'cruises', `cruise:${id}`, 'cabins', 'itineraries', 'services', 'experiences');
  return getContent(`/cruises/${id}`, { lang: locale }, cruiseSchema);
}

const pageSeoSchema = z.object({ seo: z.object({ title: z.string().nullable(), description: z.string().nullable() }) });

/** SEO title/description an editor set for a hub page in the CMS (GET /pages/{code}, CONTENT_API.md 4.10). */
export async function getPageSeo(code: 'contact' | 'booking', locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'pages', `page:${code}`);
  const page = await getContent(`/pages/${code}`, { lang: locale }, pageSeoSchema);
  return page?.seo ?? { title: null, description: null };
}
