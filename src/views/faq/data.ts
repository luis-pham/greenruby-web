import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import { sectionPath, type Locale } from '@/lib/i18n';

// Laravel's URL scheme: /faq[/{group}][/page-{n}], vi /vi/cau-hoi-thuong-gap[/{group}][/trang-{n}].
export const pageWord = (locale: Locale) => (locale === 'vi' ? 'trang' : 'page');

export function faqPath(locale: Locale, group: string | null, page = 1): string {
  return `${sectionPath(locale, 'faq')}${group ? `/${group}` : ''}${page > 1 ? `/${pageWord(locale)}-${page}` : ''}`;
}

const groupRef = z.object({ id: z.number(), slug: z.string(), name: z.string() });

export const faqItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  questionHtml: z.string().nullable(),
  answerHtml: z.string().nullable(),
  group: groupRef.nullable(),
});
export type FaqEntry = z.infer<typeof faqItemSchema>;

const listSchema = z.object({
  seo: z.object({ title: z.string().nullable(), description: z.string().nullable() }),
  group: groupRef.nullable(),
  groups: z.array(groupRef.extend({ count: z.number() })),
  items: z.array(faqItemSchema),
  pagination: z.object({ page: z.number(), perPage: z.number(), total: z.number(), lastPage: z.number() }),
  keyword: z.string().nullable(),
});
export type FaqList = z.infer<typeof listSchema>;
export type FaqGroup = FaqList['groups'][number];

// A group slug from the other language comes back as 200 {"redirect": {...}} (CONTENT_API.md 4.5).
const redirectSchema = z.object({ redirect: z.object({ group: z.string(), page: z.number().nullable() }) });

export const faqResponseSchema = z.union([redirectSchema, listSchema]);

/** GET /faqs. Null on 404 (unknown group, page out of range); `{ redirect }` for an other-language group slug. */
export async function getFaqs(locale: Locale, group: string | null, page: number) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'faqs');
  return getContent('/faqs', { lang: locale, group: group ?? undefined, page }, faqResponseSchema);
}

