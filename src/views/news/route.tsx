import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getSite } from '@/lib/api/content';
import type { Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { getArticle, isRedirect, listArticles, type Article, type ArticleList } from '@/views/blog/data';
import { articlePath, NEWS_CATEGORY, newsPath, pageSegment, parsePageSegment } from '@/views/blog/paths';
import { articleMetadata, articlePage } from '@/views/blog/route';
import { newsMessages } from './messages';
import { NewsListView } from './NewsListView';

// Route logic for /news (vi: /vi/tin-tuc), the articles of the CMS category NEWS_CATEGORY:
//   /news[/page-n]       listing   ([segment] = page-n)
//   /news/{slug}.html    article   ([segment])
// Same rules as the blog: page-1 301s to the base URL, pages past the end 404, an empty listing is noindex.

type Resolved =
  | { kind: 'list'; list: ArticleList; canonical: string }
  | { kind: 'article'; article: Article; canonical: string }
  | { kind: 'redirect'; to: string }
  | { kind: 'notFound' };

const other = (locale: Locale): Locale => (locale === 'en' ? 'vi' : 'en');
const SLUG = /^[A-Za-z0-9_-]+$/;

async function resolveList(locale: Locale, page: number): Promise<Resolved> {
  const result = await listArticles(locale, NEWS_CATEGORY[locale], page);
  // No news category in the CMS yet, or a page past the end.
  if (!result || isRedirect(result) || page > result.pagination.lastPage) return { kind: 'notFound' };
  return { kind: 'list', list: result, canonical: newsPath(locale, page) };
}

async function resolveSegment(locale: Locale, segment: string): Promise<Resolved> {
  const page = parsePageSegment(locale, segment);
  if (page !== null) return page <= 1 ? { kind: 'redirect', to: newsPath(locale) } : resolveList(locale, page);
  const slug = segment.endsWith('.html') ? segment.slice(0, -5) : null;
  if (!slug || !SLUG.test(slug)) return { kind: 'notFound' };
  const article = await getArticle(locale, NEWS_CATEGORY[locale], slug);
  if (!article) return { kind: 'notFound' };
  const canonical = articlePath(locale, article.canonical.categorySlug, article.canonical.slug);
  if (canonical !== articlePath(locale, NEWS_CATEGORY[locale], slug)) return { kind: 'redirect', to: canonical };
  return { kind: 'article', article, canonical };
}

async function listMetadata(locale: Locale, list: ArticleList, canonical: string): Promise<Metadata> {
  const site = await getSite(locale);
  const m = newsMessages(locale);
  const alternate = list.pagination.page === 1 ? await listArticles(other(locale), NEWS_CATEGORY[other(locale)], 1) : null;
  const pairs = alternate && !isRedirect(alternate) && !alternate.noIndex;
  return pageMetadata({
    locale,
    site: siteInfo(site),
    title: list.seo.title ?? m.metaTitle,
    description: list.seo.description ?? m.listIntro,
    path: canonical,
    alternatePath: pairs ? newsPath(other(locale)) : undefined,
    image: list.featured[0]?.image ?? list.items[0]?.image,
    noIndex: list.noIndex,
  });
}

async function render(locale: Locale, resolved: Resolved) {
  if (resolved.kind === 'notFound') notFound();
  if (resolved.kind === 'redirect') permanentRedirect(resolved.to);
  if (resolved.kind === 'article') return articlePage(locale, resolved.article, newsPath(other(locale)));
  const site = await getSite(locale);
  return <NewsListView list={resolved.list} chrome={{ locale, site, t: getMessages(locale), alternateHref: newsPath(other(locale)) }} />;
}

/** /news (vi /vi/tin-tuc). */
export function newsIndexRoute(locale: Locale) {
  async function generateMetadata(): Promise<Metadata> {
    const resolved = await resolveList(locale, 1);
    return resolved.kind === 'list' ? listMetadata(locale, resolved.list, resolved.canonical) : {};
  }
  async function Page() {
    return render(locale, await resolveList(locale, 1));
  }
  return { generateMetadata, Page };
}

type SegmentParams = { params: Promise<{ segment: string }> };

/** /news/[segment]: listing page N or an article. */
export function newsSegmentRoute(locale: Locale) {
  async function generateStaticParams() {
    const first = await listArticles(locale, NEWS_CATEGORY[locale], 1);
    if (!first || isRedirect(first)) return [{ segment: pageSegment(locale, 1) }];
    const params = [
      ...[...first.featured, ...first.items].map((a) => ({ segment: `${a.slug}.html` })),
      ...Array.from({ length: first.pagination.lastPage - 1 }, (_, i) => ({ segment: pageSegment(locale, i + 2) })),
    ];
    const unique = [...new Map(params.map((p) => [p.segment, p])).values()];
    // ensureStatic needs at least one entry; page-1 just redirects to /news.
    return unique.length > 0 ? unique : [{ segment: pageSegment(locale, 1) }];
  }

  async function generateMetadata({ params }: SegmentParams): Promise<Metadata> {
    const resolved = await resolveSegment(locale, (await params).segment);
    if (resolved.kind === 'list') return listMetadata(locale, resolved.list, resolved.canonical);
    if (resolved.kind === 'article') return articleMetadata(locale, resolved);
    return {};
  }

  // Awaited outside <Suspense> so the status (200/301/404) is known before anything streams.
  async function Page({ params }: SegmentParams) {
    return render(locale, await resolveSegment(locale, (await params).segment));
  }

  return { generateStaticParams, generateMetadata, Page };
}
