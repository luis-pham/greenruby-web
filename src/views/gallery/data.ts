import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { getContent } from '@/lib/api/client';
import { sectionPath, type Locale } from '@/lib/i18n';

// Laravel's URL scheme: /gallery[/{category}][/page-{n}], vi /vi/thu-vien[/{category}][/trang-{n}].
export const pageWord = (locale: Locale) => (locale === 'vi' ? 'trang' : 'page');

export function galleryPath(locale: Locale, category: string | null, page = 1): string {
  return `${sectionPath(locale, 'gallery')}${category ? `/${category}` : ''}${page > 1 ? `/${pageWord(locale)}-${page}` : ''}`;
}

const optionalText = z.string().nullable();

const experienceSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  summary: optionalText,
  image: optionalText,
  cover: optionalText,
  group: z.object({ name: z.string() }).passthrough().nullable(),
});

export const galleryItemSchema = z.object({
  src: z.string(),
  thumbnail: z.string(),
  title: optionalText,
  alt: optionalText,
  type: z.enum(['image', 'video', '360']),
});
export type GalleryItem = z.infer<typeof galleryItemSchema>;

export const gallerySchema = z.object({
  seo: z.object({ title: optionalText, description: optionalText }),
  categories: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      count: z.number(),
      // "SEO danh mục" section of the gallery page config (null fields = use our defaults).
      seo: z.object({ title: optionalText, description: optionalText }).optional(),
    }),
  ),
  canonicalCategorySlug: z.string().nullable(),
  items: z.array(galleryItemSchema),
  pagination: z.object({ page: z.number(), perPage: z.number(), total: z.number(), lastPage: z.number() }),
  featuredExperiences: z.array(experienceSchema),
});
export type Gallery = z.infer<typeof gallerySchema>;
export type GalleryExperience = z.infer<typeof experienceSchema>;

/**
 * GET /gallery (CONTENT_API.md 4.4). `category` may be either language's slug; compare it with
 * `canonicalCategorySlug` to decide on a redirect. Returns null on 404 (unknown category, page out of range).
 */
export async function getGallery(locale: Locale, category: string | null, page: number) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'gallery', 'experiences', 'pages', 'page:gallery');
  const gallery = await getContent('/gallery', { lang: locale, category: category ?? undefined, page }, gallerySchema);
  if (!gallery) return null;
  // A 360 tour is one large video; if its file is missing on the server the whole tour block breaks,
  // so drop it (the CMS still lists it). Checked once per cache period.
  const tours = gallery.items.filter((i) => i.type === '360');
  if (tours.length === 0) return gallery;
  const missing = new Set(
    (await Promise.all(tours.map(async (t) => ((await mediaExists(t.src)) ? null : t.src)))).filter(Boolean),
  );
  return missing.size ? { ...gallery, items: gallery.items.filter((i) => !missing.has(i.src)) } : gallery;
}

async function mediaExists(src: string): Promise<boolean> {
  const origin = process.env.CONTENT_API_URL;
  if (!origin || /^https?:\/\//.test(src)) return true;
  try {
    const res = await fetch(new URL(src, origin), { method: 'HEAD', signal: AbortSignal.timeout(5000) });
    return res.ok;
  } catch {
    return true; // network trouble: keep the item rather than hide content
  }
}

/**
 * The five gallery categories are fixed page-config keys with fixed slugs in each language
 * (GalleryService). Editorial copy in messages.ts is keyed by these names.
 */
export const CATEGORY_KEYS = {
  'onboard-life': 'onboard',
  'cuoc-song-tren-tau': 'onboard',
  'cabins-suites': 'suites',
  'cabin-suite': 'suites',
  activities: 'activities',
  'hoat-dong': 'activities',
  'nature-bay-views': 'nature',
  'thien-nhien-va-vinh': 'nature',
  'guests-moments': 'moments',
  'khoang-khac-du-khach': 'moments',
} as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[keyof typeof CATEGORY_KEYS];

export function categoryKey(slug: string): CategoryKey | null {
  return (CATEGORY_KEYS as Record<string, CategoryKey>)[slug] ?? null;
}

export type PlacedItem = GalleryItem & {
  category: Gallery['categories'][number] | null;
  /** 1-based position within its category (0 for 360 items). */
  indexInCategory: number;
  /** 1-based position among all photos of the listing, across pages (0 for 360 items). */
  photoNumber: number;
};

// Order of the categories in the unfiltered listing (GalleryService::getConfigGalleries merges the
// page-config lists in this order, which differs from the filter order in `categories`).
const ALL_ORDER: CategoryKey[] = ['onboard', 'activities', 'suites', 'moments', 'nature'];
const allOrder = (slug: string) => {
  const key = categoryKey(slug);
  return key ? ALL_ORDER.indexOf(key) : ALL_ORDER.length;
};

/**
 * The API gives no per-item category. Every listing is the VR/360 items followed by the selected
 * category's items, or by every category's items in ALL_ORDER, paginated across both. Rebuild each
 * item's category from its position so captions and alt text can name it.
 */
export function placeItems(gallery: Gallery): { items: PlacedItem[]; photoTotal: number } {
  const { items, categories, canonicalCategorySlug, pagination } = gallery;
  const selected = canonicalCategorySlug ? (categories.find((c) => c.slug === canonicalCategorySlug) ?? null) : null;
  const listed = selected ? [selected] : [...categories].sort((a, b) => allOrder(a.slug) - allOrder(b.slug));
  const photoTotal = listed.reduce((sum, c) => sum + c.count, 0);
  const vrCount = Math.max(0, pagination.total - photoTotal);
  const offset = (pagination.page - 1) * pagination.perPage;
  const placed = items.map((item, i): PlacedItem => {
    if (item.type === '360') return { ...item, category: null, indexInCategory: 0, photoNumber: 0 };
    const photoNumber = offset + i - vrCount + 1;
    let position = photoNumber - 1;
    for (const category of listed) {
      if (position < category.count) return { ...item, category, indexInCategory: position + 1, photoNumber };
      position -= category.count;
    }
    return { ...item, category: selected, indexInCategory: 0, photoNumber };
  });
  return { items: placed, photoTotal };
}
