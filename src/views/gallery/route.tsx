import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { galleryPath, getGallery, pageWord, type Gallery } from './data';
import { GalleryView } from './GalleryView';
import { galleryMessages } from './messages';

type Params = { params: Promise<{ path?: string[] }> };

/** [] | [page-N] | [category] | [category, page-N]. Anything else is not a gallery URL. */
function parsePath(locale: Locale, path: string[] = []): { category: string | null; page: number } | null {
  const pageRe = new RegExp(`^${pageWord(locale)}-(\\d+)$`);
  const segments = path.map((p) => decodeURIComponent(p));
  const last = segments.length ? pageRe.exec(segments[segments.length - 1]) : null;
  const page = last ? Math.max(1, Number(last[1])) : 1;
  const rest = last ? segments.slice(0, -1) : segments;
  if (rest.length > 1) return null;
  return { category: rest[0] ?? null, page };
}

async function load(locale: Locale, path: string[] | undefined) {
  const parsed = parsePath(locale, path);
  if (!parsed) return null;
  const gallery = await getGallery(locale, parsed.category, parsed.page);
  if (!gallery) return null;
  return { gallery, canonicalPath: galleryPath(locale, gallery.canonicalCategorySlug, gallery.pagination.page) };
}

/** Same category and page in the other language; falls back to its first page when that page doesn't exist there. */
async function alternateOf(locale: Locale, gallery: Gallery) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  const slug = gallery.canonicalCategorySlug;
  const exact = await getGallery(other, slug, gallery.pagination.page);
  if (exact) return { href: galleryPath(other, exact.canonicalCategorySlug, exact.pagination.page), exact: true };
  const first = await getGallery(other, slug, 1);
  return { href: galleryPath(other, first?.canonicalCategorySlug ?? null), exact: false };
}

export function galleryRoute(locale: Locale) {
  async function generateStaticParams() {
    const word = pageWord(locale);
    const pages = (lastPage: number, base: string[]) =>
      Array.from({ length: lastPage }, (_, i) => ({ path: i === 0 ? base : [...base, `${word}-${i + 1}`] }));
    const all = await getGallery(locale, null, 1);
    if (!all) return [{ path: [] }];
    const categories = await Promise.all(all.categories.map((c) => getGallery(locale, c.slug, 1)));
    return [
      ...pages(all.pagination.lastPage, []),
      ...categories.flatMap((g) => (g?.canonicalCategorySlug ? pages(g.pagination.lastPage, [g.canonicalCategorySlug]) : [])),
    ];
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const loaded = await load(locale, (await params).path);
    if (!loaded) return {};
    const { gallery, canonicalPath } = loaded;
    const t = galleryMessages[locale];
    const category = gallery.categories.find((c) => c.slug === gallery.canonicalCategorySlug);
    const base = gallery.seo.title ?? t.metaTitle;
    const page = gallery.pagination.page;
    const [site, alternate] = await Promise.all([getSite(locale), alternateOf(locale, gallery)]);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      // Category pages get their own title, so they don't duplicate the hub's.
      title: `${category ? `${category.name} · ${t.metaTitle}` : base}${page > 1 ? t.pageSuffix(page) : ''}`,
      description: gallery.seo.description ?? t.heroBody,
      path: canonicalPath,
      alternatePath: alternate.exact ? alternate.href : undefined,
      image: gallery.items.find((i) => i.type === 'image')?.src,
    });
  }

  // Awaited outside <Suspense> so 404/301 keep correct status codes (pages export instant = false).
  async function Page({ params }: Params) {
    const { path } = await params;
    const loaded = await load(locale, path);
    if (!loaded) notFound();
    const { gallery, canonicalPath } = loaded;
    // Other-language category slug, "page-1" or "page-0": 301 to the canonical URL (Laravel does the same).
    const requested = [sectionPath(locale, 'gallery'), ...(path ?? []).map((p) => decodeURIComponent(p))].join('/');
    if (requested !== canonicalPath) permanentRedirect(canonicalPath);
    const [site, alternate] = await Promise.all([getSite(locale), alternateOf(locale, gallery)]);
    return (
      <GalleryView
        gallery={gallery}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: alternate.href }}
      />
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
