import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import type { Locale } from '@/lib/i18n';
import { getContent } from './client';
import { cabinListSchema, cabinSchema, homepageSchema, siteSchema } from './schemas';

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
