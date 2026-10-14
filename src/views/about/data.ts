import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import type { Locale } from '@/lib/i18n';

const text = z.string().nullable();

const galleryItem = z.object({
  src: z.string(),
  title: text,
  description: text,
  alt: text,
});
export type AboutGalleryItem = z.infer<typeof galleryItem>;

const stat = z.union([z.string(), z.number()]).nullable().optional();

export const aboutSchema = z.object({
  seo: z.object({ title: text, description: text }),
  noIndex: z.boolean().default(false),
  config: z
    .object({
      banner: z.array(galleryItem).optional(),
      ecoTitle: text.optional(),
      ecoDescription: text.optional(),
      ecoContent: text.optional(),
      ecoFeaturedImage: text.optional(),
      sustainability: z.array(galleryItem).optional(),
      enviromentTitle: text.optional(), // CMS spelling
      enviromentDescription: text.optional(),
      enviromentList: z.array(galleryItem).optional(),
      statisticTitle: text.optional(),
      statisticDescription: text.optional(),
      statisticWastewaterTreated: stat,
      statisticReducedAnnually: stat,
      statisticRenewableSolarPower: stat,
      partnerTitle: text.optional(),
      partnerDescription: text.optional(),
      readyToSailDescription: text.optional(),
      readyToSailContent: text.optional(),
    })
    .passthrough(),
  heroImages: z.array(z.object({ src: z.string(), alt: text })).default([]),
  updatedAt: text,
});
export type AboutPage = z.infer<typeof aboutSchema>;

const cruiseListSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      slug: z.string(),
      name: z.string(),
      summary: text,
      image: text,
      cover: text.optional(),
      bay: z.enum(['ha-long', 'lan-ha']).nullable().catch(null),
    }),
  ),
});
export type AboutCruise = z.infer<typeof cruiseListSchema>['items'][number];

// Tags from cms-develop/docs/CONTENT_API.md §5. "content" refreshes everything.

export async function getAboutPage(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'pages', 'page:about-us', 'itineraries');
  const page = await getContent('/pages/about-us', { lang: locale }, aboutSchema);
  if (!page) throw new Error(`About page missing for ${locale}`);
  return page;
}

export async function listFleet(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'cruises');
  const list = await getContent('/cruises', { lang: locale }, cruiseListSchema);
  return list?.items ?? [];
}
