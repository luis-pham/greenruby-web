import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import type { Locale } from '@/lib/i18n';

// Schemas and cached readers for GET /experiences and GET /experiences/{id}
// (cms-develop/docs/CONTENT_API.md §4.1–4.2). Kept here, next to the views that use them.

const text = z.string().nullable();
const tab = z.enum(['onboard', 'outdoor']);
const seo = z.object({ title: text, description: text });

const groupSchema = z.object({ id: z.number(), slug: z.string(), name: z.string(), tab: tab.nullable() });

export const experienceSummarySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  summary: text,
  image: text,
  cover: text,
  duration: text,
  startTime: text,
  endTime: text,
  notes: z.array(z.string()),
  isFeatured: z.boolean(),
  group: groupSchema.nullable(),
  cruise: z.object({ id: z.number(), slug: z.string(), name: z.string() }).nullable(),
});
export type ExperienceSummary = z.infer<typeof experienceSummarySchema>;
export type ExperienceTab = z.infer<typeof tab>;

const pageGalleryItem = z.object({
  src: z.string(),
  thumbnail: z.string(),
  title: text,
  description: text,
  alt: text,
  type: z.enum(['image', 'video', '360']),
});

export const experienceListSchema = z.object({
  seo,
  page: z
    .object({
      gallery: z.array(pageGalleryItem).optional(),
      sustainability: z.array(pageGalleryItem).optional(),
      readyToSailDescription: text.optional(),
      readyToSailContent: text.optional(),
    })
    .passthrough(),
  tabs: z.array(z.object({ key: tab, name: z.string(), groupIds: z.array(z.number()) })),
  groups: z.array(groupSchema),
  featured: z.array(experienceSummarySchema),
  items: z.array(experienceSummarySchema),
});
export type ExperienceList = z.infer<typeof experienceListSchema>;

export const experienceSchema = experienceSummarySchema.extend({
  contentHtml: text,
  seo,
  gallery: z.array(z.object({ src: z.string(), thumbnail: z.string(), alt: text, type: z.enum(['image', 'video', '360']) })),
  suitableFor: z.array(z.object({ id: z.number(), name: z.string() })),
  related: z.array(experienceSummarySchema),
  canonicalSlug: z.string(),
  alternate: z.object({ lang: z.enum(['en', 'vi']), id: z.number(), slug: z.string() }).nullable(),
  updatedAt: text,
});
export type Experience = z.infer<typeof experienceSchema>;

export async function listExperiences(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'experiences', 'pages', 'page:exp-activity');
  const list = await getContent('/experiences', { lang: locale }, experienceListSchema);
  if (!list) throw new Error(`Experience list missing for ${locale}`);
  return list;
}

export async function getExperience(id: number, locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'experiences', `experience:${id}`);
  return getContent(`/experiences/${id}`, { lang: locale }, experienceSchema);
}
