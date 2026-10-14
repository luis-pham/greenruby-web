import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { ArticleView } from './ArticleView';
import { BlogListView } from './BlogListView';
import { getArticle, getLegacyArticle, isRedirect, listArticles, searchArticles, type Article, type ArticleList, type CategoryNode } from './data';
import { blogMessages } from './messages';
import { articlePath, blogPath, pageSegment, parseLegacyFile, parsePageSegment, searchPath } from './paths';

// Route logic for /blog (vi: /vi/blog). Mirrors Modules/FrontEnd ArticleController:
//   /blog[/page-n]                 index           ([segment] = page-n)
//   /blog/{category}[/page-n]      category        ([segment] = category, [sub] = page-n)
//   /blog/{category}/{slug}.html   article         ([segment]/[sub])
//   /blog/{anything}-{id}.html     legacy -> 301   ([segment])
// Other-language category slugs 301 to the localized one, pages past the end 404, page-1 301s to
// the base URL, and empty categories are noindex (the API's noIndex flag).

type ListOk = { kind: 'list'; list: ArticleList; canonical: string };
type ArticleOk = { kind: 'article'; article: Article; canonical: string };
type Resolved = ListOk | ArticleOk | { kind: 'redirect'; to: string } | { kind: 'notFound' };

const other = (locale: Locale): Locale => (locale === 'en' ? 'vi' : 'en');
const SLUG = /^[A-Za-z0-9_-]+$/;

async function resolveList(locale: Locale, category: string | null, page: number): Promise<Resolved> {
  if (category !== null && !SLUG.test(category)) return { kind: 'notFound' };
  const result = await listArticles(locale, category, page);
  if (!result) return { kind: 'notFound' };
  if (isRedirect(result)) return { kind: 'redirect', to: blogPath(locale, result.redirect.category, result.redirect.page ?? page) };
  // Laravel only 404s past the end when there are results; an empty listing has exactly one page here.
  if (page > result.pagination.lastPage) return { kind: 'notFound' };
  const canonical = blogPath(locale, result.category?.slug, page);
  if (result.category && result.category.slug !== category) return { kind: 'redirect', to: canonical };
  return { kind: 'list', list: result, canonical };
}

async function resolveSegment(locale: Locale, segment: string): Promise<Resolved> {
  const page = parsePageSegment(locale, segment);
  if (page !== null) return page <= 1 ? { kind: 'redirect', to: blogPath(locale) } : resolveList(locale, null, page);
  if (segment.endsWith('.html')) {
    const id = parseLegacyFile(segment);
    const legacy = id !== null ? await getLegacyArticle(locale, id) : null;
    if (!legacy) return { kind: 'notFound' };
    return { kind: 'redirect', to: legacy.categorySlug && legacy.slug ? articlePath(locale, legacy.categorySlug, legacy.slug) : blogPath(locale) };
  }
  return resolveList(locale, segment, 1);
}

async function resolveSub(locale: Locale, segment: string, sub: string): Promise<Resolved> {
  const page = parsePageSegment(locale, sub);
  if (page !== null) return page <= 1 ? { kind: 'redirect', to: blogPath(locale, segment) } : resolveList(locale, segment, page);
  const slug = sub.endsWith('.html') ? sub.slice(0, -5) : null;
  if (!slug || !SLUG.test(slug) || !SLUG.test(segment)) return { kind: 'notFound' };
  const article = await getArticle(locale, segment, slug);
  if (!article) return { kind: 'notFound' };
  const canonical = articlePath(locale, article.canonical.categorySlug, article.canonical.slug);
  if (canonical !== articlePath(locale, segment, slug)) return { kind: 'redirect', to: canonical };
  return { kind: 'article', article, canonical };
}

/** Exact counterpart of a listing in the other language (for hreflang), or null. */
async function listAlternate(locale: Locale, list: ArticleList): Promise<string | null> {
  if (list.pagination.page > 1) return null; // page N of one language is not page N of the other
  if (!list.category) return sectionPath(other(locale), 'blog');
  // The API answers an other-language category slug with a redirect to its counterpart.
  const counterpart = await listArticles(other(locale), list.category.slug, 1);
  if (!counterpart) return null;
  return isRedirect(counterpart) ? blogPath(other(locale), counterpart.redirect.category) : blogPath(other(locale), counterpart.category?.slug);
}

const articleAlternate = (article: Article) =>
  article.alternate ? articlePath(article.alternate.lang, article.alternate.categorySlug, article.alternate.slug) : null;

async function listMetadata(locale: Locale, { list, canonical }: ListOk): Promise<Metadata> {
  const [site, alternate] = await Promise.all([getSite(locale), listAlternate(locale, list)]);
  const m = blogMessages(locale);
  return pageMetadata({
    locale,
    site: siteInfo(site),
    title: list.seo.title ?? list.category?.name ?? m.metaTitle,
    description: list.seo.description ?? undefined,
    path: canonical,
    alternatePath: alternate ?? undefined,
    image: list.featured[0]?.image ?? list.items[0]?.image,
    noIndex: list.noIndex,
  });
}

async function articleMetadata(locale: Locale, { article, canonical }: ArticleOk): Promise<Metadata> {
  const site = await getSite(locale);
  const meta = pageMetadata({
    locale,
    site: siteInfo(site),
    title: article.seo.title ?? article.title,
    description: article.seo.description ?? article.lead ?? undefined,
    path: canonical,
    alternatePath: articleAlternate(article) ?? undefined,
    image: article.image,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      ...(article.publishDate && { publishedTime: article.publishDate }),
      ...(article.updatedAt && { modifiedTime: article.updatedAt }),
      ...(article.category && { section: article.category.name }),
    },
  };
}

async function render(locale: Locale, resolved: Resolved) {
  if (resolved.kind === 'notFound') notFound();
  if (resolved.kind === 'redirect') permanentRedirect(resolved.to);
  const site = await getSite(locale);
  const t = getMessages(locale);
  if (resolved.kind === 'article') {
    const alternateHref = articleAlternate(resolved.article) ?? sectionPath(other(locale), 'blog');
    return <ArticleView article={resolved.article} chrome={{ locale, site, t, alternateHref }} />;
  }
  const alternateHref = (await listAlternate(locale, resolved.list)) ?? sectionPath(other(locale), 'blog');
  return <BlogListView list={resolved.list} chrome={{ locale, site, t, alternateHref }} />;
}

const flatten = (nodes: CategoryNode[]): CategoryNode[] => nodes.flatMap((n) => [n, ...flatten(n.children)]);

async function indexList(locale: Locale): Promise<ArticleList> {
  const list = await listArticles(locale, null, 1);
  if (!list || isRedirect(list)) throw new Error(`Blog index missing for ${locale}`);
  return list;
}

/** /blog (vi /vi/blog). */
export function blogIndexRoute(locale: Locale) {
  async function generateMetadata(): Promise<Metadata> {
    return listMetadata(locale, { kind: 'list', list: await indexList(locale), canonical: blogPath(locale) });
  }
  async function Page() {
    return render(locale, { kind: 'list', list: await indexList(locale), canonical: blogPath(locale) });
  }
  return { generateMetadata, Page };
}

type SegmentParams = { params: Promise<{ segment: string }> };

/** /blog/[segment]: index page N, a category, or a legacy article URL. */
export function blogSegmentRoute(locale: Locale) {
  async function generateStaticParams() {
    const index = await indexList(locale);
    const params = [
      ...flatten(index.categories).map((c) => ({ segment: c.slug })),
      ...Array.from({ length: index.pagination.lastPage - 1 }, (_, i) => ({ segment: pageSegment(locale, i + 2) })),
    ];
    // ensureStatic needs at least one entry; page-1 just redirects to /blog.
    return params.length > 0 ? params : [{ segment: pageSegment(locale, 1) }];
  }

  async function generateMetadata({ params }: SegmentParams): Promise<Metadata> {
    const resolved = await resolveSegment(locale, (await params).segment);
    // 404/301: return nothing and let Page answer (notFound() thrown here renders a blank shell).
    return resolved.kind === 'list' ? listMetadata(locale, resolved) : {};
  }

  // params are awaited outside <Suspense> on purpose: the status (200/301/404) must be known before
  // anything streams (page files export instant = false).
  async function Page({ params }: SegmentParams) {
    const { segment } = await params;
    return render(locale, await resolveSegment(locale, segment));
  }

  return { generateStaticParams, generateMetadata, Page };
}

type SubParams = { params: Promise<{ segment: string; sub: string }> };

/** /blog/[segment]/[sub]: category page N or an article. */
export function blogSubRoute(locale: Locale) {
  async function generateStaticParams() {
    const index = await indexList(locale);
    const perPage = index.pagination.perPage;
    const categories = flatten(index.categories);
    const params = [
      // Latest and featured articles are prerendered; older ones render on first request, then stay cached.
      ...[...index.featured, ...index.items].flatMap((a) => (a.category ? [{ segment: a.category.slug, sub: `${a.slug}.html` }] : [])),
      ...categories.flatMap((c) =>
        Array.from({ length: Math.max(0, Math.ceil(c.count / perPage) - 1) }, (_, i) => ({ segment: c.slug, sub: pageSegment(locale, i + 2) })),
      ),
    ];
    const unique = [...new Map(params.map((p) => [`${p.segment}/${p.sub}`, p])).values()];
    // ensureStatic needs at least one entry; "{category}/page-1" just redirects to the category.
    if (unique.length === 0) return [{ segment: categories[0]?.slug ?? 'blog', sub: pageSegment(locale, 1) }];
    return unique;
  }

  async function generateMetadata({ params }: SubParams): Promise<Metadata> {
    const { segment, sub } = await params;
    const resolved = await resolveSub(locale, segment, sub);
    if (resolved.kind === 'list') return listMetadata(locale, resolved);
    if (resolved.kind === 'article') return articleMetadata(locale, resolved);
    return {};
  }

  async function Page({ params }: SubParams) {
    const { segment, sub } = await params;
    return render(locale, await resolveSub(locale, segment, sub));
  }

  return { generateStaticParams, generateMetadata, Page };
}

type SearchProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/** /blog/search?k= (vi /vi/blog/tim-kiem): rendered per request, always noindex. */
export function blogSearchRoute(locale: Locale) {
  async function generateMetadata(): Promise<Metadata> {
    const site = await getSite(locale);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: blogMessages(locale).searchMetaTitle,
      path: searchPath(locale),
      noIndex: true,
    });
  }

  // This route streams (it reads searchParams at request time), so it can't change the status code
  // once rendering has started: every input renders a 200 page instead of redirecting or 404ing.
  async function Page({ searchParams }: SearchProps) {
    const query = await searchParams;
    const keyword = (first(query.k) ?? '').trim().slice(0, 100);
    const categoryParam = first(query.category)?.trim() || null;
    let category = categoryParam && SLUG.test(categoryParam) ? categoryParam : null;
    const page = Math.max(1, Math.floor(Number(first(query.page))) || 1);

    let result = keyword ? await searchArticles(locale, keyword, category, page) : null;
    if (result && isRedirect(result)) {
      // Other-language category slug: search its counterpart instead.
      category = result.redirect.category;
      result = await searchArticles(locale, keyword, category, page);
    }
    let list: ArticleList;
    if (result && !isRedirect(result) && page <= result.pagination.lastPage) {
      list = result;
    } else {
      // No keyword, unknown category or a page past the end: an empty result list.
      const index = await indexList(locale);
      list = { ...index, category: null, featured: [], items: [], pagination: { ...index.pagination, page: 1, total: 0, lastPage: 1 } };
    }

    const site = await getSite(locale);
    return (
      <BlogListView
        list={list}
        search={{ keyword, category: list.category?.slug ?? null }}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other(locale), 'blog') }}
      />
    );
  }

  return { generateMetadata, Page };
}
