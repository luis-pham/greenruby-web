import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import type { Locale } from '@/lib/i18n';

// Blog schemas and cached readers (docs/CONTENT_API.md §4.6–4.8, §4.10). Kept next to the views so
// the shared src/lib/api files stay untouched; tags follow the CONTENT_API.md cache-tag table.

const seoSchema = z.object({ title: z.string().nullable(), description: z.string().nullable() });
const categoryRefSchema = z.object({ id: z.number(), slug: z.string(), name: z.string() });

export const articleSummarySchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  subTitle: z.string().nullable(),
  lead: z.string().nullable(),
  image: z.string().nullable(),
  publishDate: z.string().nullable(),
  isFeatured: z.boolean(),
  category: categoryRefSchema.nullable(),
});
export type ArticleSummary = z.infer<typeof articleSummarySchema>;

export type CategoryNode = { id: number; slug: string; name: string; count: number; children: CategoryNode[] };
const categoryNodeSchema: z.ZodType<CategoryNode, z.ZodTypeDef, unknown> = z.lazy(() =>
  z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    count: z.number(),
    children: z.array(categoryNodeSchema).default([]),
  }),
);

const categoryDetailSchema = categoryRefSchema.extend({
  description: z.string().nullable(),
  parent: categoryRefSchema.nullable(),
  breadcrumb: z.array(z.object({ slug: z.string(), name: z.string() })),
});
export type CategoryDetail = z.infer<typeof categoryDetailSchema>;

const redirectSchema = z.object({ redirect: z.object({ category: z.string(), page: z.number().nullable() }) });

export const articleListSchema = z.object({
  seo: seoSchema,
  noIndex: z.boolean(),
  category: categoryDetailSchema.nullable(),
  categories: z.array(categoryNodeSchema),
  featured: z.array(articleSummarySchema),
  items: z.array(articleSummarySchema),
  popular: z.array(articleSummarySchema),
  pagination: z.object({ page: z.number(), perPage: z.number(), total: z.number(), lastPage: z.number() }),
  keyword: z.string().nullable(),
});
export type ArticleList = z.infer<typeof articleListSchema>;

// A category slug of the other language answers with only {redirect}; try that shape first.
const listResponseSchema = z.union([redirectSchema, articleListSchema]);

export const articleSchema = articleSummarySchema.extend({
  category: z.union([categoryDetailSchema, categoryRefSchema]).nullable(),
  leadHtml: z.string().nullable(),
  contentHtml: z.string().nullable(),
  seo: seoSchema,
  related: z.array(articleSummarySchema),
  popular: z.array(articleSummarySchema),
  canonical: z.object({ categorySlug: z.string(), slug: z.string() }),
  alternate: z.object({ lang: z.enum(['en', 'vi']), id: z.number(), categorySlug: z.string(), slug: z.string() }).nullable(),
  updatedAt: z.string().nullable(),
});
export type Article = z.infer<typeof articleSchema>;

const legacySchema = z.object({ id: z.number(), categorySlug: z.string().nullable(), slug: z.string().nullable() });

export type ListResult = { redirect: { category: string; page: number | null } } | ArticleList;

/** Blog index (category null) or a category listing. null = 404 (unknown category or page past the end). */
export async function listArticles(locale: Locale, category: string | null, page: number): Promise<ListResult | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'articles', 'pages', 'page:article');
  return getContent('/articles', { lang: locale, category: category ?? undefined, page }, listResponseSchema);
}

/** Keyword search. Only called from the noindex search route, which renders per request. */
export async function searchArticles(locale: Locale, keyword: string, category: string | null, page: number): Promise<ListResult | null> {
  'use cache';
  cacheLife('minutes');
  cacheTag('content', 'articles');
  return getContent('/articles', { lang: locale, k: keyword, category: category ?? undefined, page }, listResponseSchema);
}

export async function getArticle(locale: Locale, categorySlug: string, slug: string) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'articles');
  const article = await getContent(`/articles/${encodeURIComponent(categorySlug)}/${encodeURIComponent(slug)}`, { lang: locale }, articleSchema);
  if (article) cacheTag(`article:${article.id}`);
  return article;
}

/** Old /blog/{anything}-{id}.html URLs. */
export async function getLegacyArticle(locale: Locale, id: number) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'articles');
  return getContent(`/articles/legacy/${id}`, { lang: locale }, legacySchema);
}

export const isRedirect = (result: ListResult): result is Extract<ListResult, { redirect: unknown }> => 'redirect' in result;
