import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import { cabinSummarySchema } from '@/lib/api/schemas';
import type { Locale } from '@/lib/i18n';

const text = z.string().nullable();
const groupRef = z.object({ id: z.number(), slug: z.string(), name: z.string() });

const galleryItem = z.object({
  src: z.string(),
  thumbnail: z.string().nullable().optional(),
  title: text,
  description: text,
  alt: text,
  type: z.string().optional(),
});
export type GalleryItem = z.infer<typeof galleryItem>;

const serviceItem = z.object({
  id: z.number(),
  name: z.string(),
  description: text,
  image: text,
  type: z.enum(['included', 'optional']).catch('optional'),
  price: z.number().nullable(),
  group: groupRef.nullable(),
});
export type ServiceItem = z.infer<typeof serviceItem>;

export const servicesSchema = z.object({
  seo: z.object({ title: text, description: text }),
  page: z
    .object({
      cabin: z.array(cabinSummarySchema).optional(),
      event: z.array(galleryItem).optional(),
      weddingTitle: text.optional(),
      weddingDescription: text.optional(),
      weddingContent: text.optional(),
      weddingFeaturedImage: text.optional(),
      weddingIcon: z.array(galleryItem).optional(),
      quoteRequestTitle: text.optional(),
      quoteRequestDescription: text.optional(),
      quoteRequestContent: text.optional(),
      readyToSailDescription: text.optional(),
      readyToSailContent: text.optional(),
    })
    .passthrough(),
  groups: z.array(groupRef),
  items: z.array(serviceItem),
  currency: z.enum(['USD', 'VND']),
});
export type ServicesPage = z.infer<typeof servicesSchema>;

const faqListSchema = z.object({
  // A wrong-language slug answers {redirect} without items; treat it as "no FAQs".
  items: z.array(z.object({ question: z.string(), answerHtml: z.string().nullable() })).default([]),
});

// Tags from cms-develop/docs/CONTENT_API.md §5. "content" refreshes everything.

export async function getServicesPage(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'services', 'cabins', 'pages', 'page:service');
  const page = await getContent('/services', { lang: locale }, servicesSchema);
  if (!page) throw new Error(`Services page missing for ${locale}`);
  return page;
}

// FAQ group shown on the services page (life on board: dietary needs, dress code…). Slugs are per language.
const SERVICE_FAQ_GROUP: Record<Locale, string> = { en: 'life-on-board', vi: 'cuoc-song-tren-tau' };

/** CMS FAQs of the "life on board" group. Empty when the group is missing or renamed. */
export async function getServiceFaqs(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'faqs');
  const list = await getContent('/faqs', { lang: locale, group: SERVICE_FAQ_GROUP[locale] }, faqListSchema);
  return (list?.items ?? []).flatMap((f) => (f.answerHtml ? [{ question: f.question, answerHtml: f.answerHtml }] : []));
}
