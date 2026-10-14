import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import type { Locale } from '@/lib/i18n';

// GET /legal (CONTENT_API.md 4.9): everything the five legal URLs render.

const optionalText = z.string().nullable();
const seoSchema = z.object({ title: optionalText, description: optionalText });

const legalSectionSchema = z.object({ title: z.string(), html: optionalText });
const legalPageSchema = z.object({
  code: z.string(),
  title: z.string(),
  seo: seoSchema,
  html: optionalText,
  updatedAt: optionalText,
});

const articleSummarySchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  category: z.object({ id: z.number(), slug: z.string(), name: z.string() }).nullable(),
});

export const legalSchema = z.object({
  seo: seoSchema,
  title: z.string(),
  noIndex: z.boolean(),
  sections: z.object({
    safety: legalSectionSchema,
    terms: legalSectionSchema,
    privacy: legalSectionSchema,
    paymentMethods: legalSectionSchema,
  }),
  pages: z.object({
    safetyPolicies: legalPageSchema,
    termsAndConditions: legalPageSchema,
    privacyPolicy: legalPageSchema,
    paymentMethods: legalPageSchema,
  }),
  popularArticles: z.array(articleSummarySchema).default([]),
  updatedAt: optionalText,
});
export type Legal = z.infer<typeof legalSchema>;
export type LegalPage = z.infer<typeof legalPageSchema>;
export type LegalSectionKey = keyof Legal['sections'];
export type LegalPageKey = keyof Legal['pages'];
export type LegalArticle = z.infer<typeof articleSummarySchema>;

export async function getLegal(locale: Locale) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'legal', 'articles', 'pages', 'page:legal');
  const legal = await getContent('/legal', { lang: locale }, legalSchema);
  if (!legal) throw new Error(`Legal content missing for ${locale}`);
  return legal;
}
