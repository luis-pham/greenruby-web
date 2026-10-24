import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import type { Locale } from '@/lib/i18n';

// Schemas and cached readers for GET /destinations and GET /destinations/{slug}
// (cms-develop app/Services/Content/DestinationContentService.php). Only published rows are served.

const text = z.string().nullable();
export const bays = ['ha-long', 'lan-ha'] as const;
export const categories = ['cave', 'island', 'village', 'lagoon', 'other'] as const;

export const destinationSummarySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  bay: z.enum(bays),
  category: z.enum(categories),
  summary: text,
  image: z.object({ src: z.string(), alt: z.string(), credit: text }).nullable(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).nullable(),
  isGreenRubyStop: z.boolean(),
  /** Itineraries (of this language) that plan to stop here. */
  itineraryIds: z.array(z.number()),
});
export type DestinationSummary = z.infer<typeof destinationSummarySchema>;
export type Bay = DestinationSummary['bay'];
export type Category = DestinationSummary['category'];

const seo = z.object({ title: text, description: text });

export const destinationListSchema = z.object({ seo, items: z.array(destinationSummarySchema) });

export const destinationSchema = destinationSummarySchema.extend({
  contentHtml: text,
  facts: z.array(z.object({ label: z.string(), value: z.string() })),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  sources: z.array(z.object({ title: z.string(), url: z.string() })),
  itineraries: z.array(
    z.object({
      cruiseId: z.number(),
      itineraryId: z.number(),
      slug: z.string(),
      name: z.string(),
      cruiseName: z.string(),
      duration: z.number(),
      bay: z.string().nullable(),
    }),
  ),
  related: z.array(destinationSummarySchema),
  seo,
  alternate: z.object({ lang: z.enum(['en', 'vi']), slug: z.string() }).nullable(),
  factCheckedAt: text,
  updatedAt: text,
});
export type Destination = z.infer<typeof destinationSchema>;

export async function listDestinations(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'destinations', 'pages', 'page:destinations');
  const list = await getContent('/destinations', { lang: locale }, destinationListSchema);
  if (!list) throw new Error(`Destination list missing for ${locale}`);
  return list;
}

export async function getDestination(slug: string, locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'destinations', `destination:${slug}`);
  return getContent(`/destinations/${encodeURIComponent(slug)}`, { lang: locale }, destinationSchema);
}
