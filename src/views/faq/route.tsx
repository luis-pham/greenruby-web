import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { faqPath, getFaqs, pageWord, type FaqList } from './data';
import { FaqView } from './FaqView';
import { faqMessages } from './messages';

type Params = { params: Promise<{ path?: string[] }> };

/** [] | [page-N] | [group] | [group, page-N]. Anything else is not an FAQ URL. */
function parsePath(locale: Locale, path: string[] = []): { group: string | null; page: number } | null {
  const pageRe = new RegExp(`^${pageWord(locale)}-(\\d+)$`);
  const segments = path.map((p) => decodeURIComponent(p));
  const last = segments.length ? pageRe.exec(segments[segments.length - 1]) : null;
  const page = last ? Math.max(1, Number(last[1])) : 1;
  const rest = last ? segments.slice(0, -1) : segments;
  if (rest.length > 1) return null;
  return { group: rest[0] ?? null, page };
}

type Loaded = { list: FaqList; canonicalPath: string } | { redirectTo: string } | null;

async function load(locale: Locale, path: string[] | undefined): Promise<Loaded> {
  const parsed = parsePath(locale, path);
  if (!parsed) return null;
  const res = await getFaqs(locale, parsed.group, parsed.page);
  if (!res) return null;
  // Group slug of the other language: 301 to this language's counterpart (Laravel does the same).
  if ('redirect' in res) return { redirectTo: faqPath(locale, res.redirect.group, res.redirect.page ?? parsed.page) };
  return { list: res, canonicalPath: faqPath(locale, res.group?.slug ?? null, res.pagination.page) };
}

/** Same group and page in the other language; falls back to its first page, then to its FAQ hub. */
async function alternateOf(locale: Locale, list: FaqList) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  const page = list.pagination.page;
  let group: string | null = null;
  if (list.group) {
    const counterpart = await getFaqs(other, list.group.slug, 1);
    if (!counterpart) return { href: sectionPath(other, 'faq'), exact: false };
    group = 'redirect' in counterpart ? counterpart.redirect.group : (counterpart.group?.slug ?? null);
  }
  const exact = page === 1 || (await getFaqs(other, group, page)) !== null;
  return { href: faqPath(other, group, exact ? page : 1), exact };
}

export function faqRoute(locale: Locale) {
  async function generateStaticParams() {
    const word = pageWord(locale);
    const pages = (lastPage: number, base: string[]) =>
      Array.from({ length: lastPage }, (_, i) => ({ path: i === 0 ? base : [...base, `${word}-${i + 1}`] }));
    const all = await getFaqs(locale, null, 1);
    if (!all || 'redirect' in all) return [{ path: [] }];
    return [...pages(all.pagination.lastPage, []), ...all.groups.flatMap((g) => pages(Math.max(1, Math.ceil(g.count / all.pagination.perPage)), [g.slug]))];
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const loaded = await load(locale, (await params).path);
    if (!loaded || 'redirectTo' in loaded) return {};
    const { list, canonicalPath } = loaded;
    const t = faqMessages[locale];
    const page = list.pagination.page;
    const [site, alternate] = await Promise.all([getSite(locale), alternateOf(locale, list)]);
    // The API title is the group name or "FAQ" and already carries " - Page N".
    const title = list.group ? list.seo.title : `${t.metaTitle}${page > 1 ? t.pageSuffix(page) : ''}`;
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: title ?? t.metaTitle,
      description: list.seo.description ?? t.heroBody,
      path: canonicalPath,
      alternatePath: alternate.exact ? alternate.href : undefined,
    });
  }

  // Awaited outside <Suspense> so 404/301 keep correct status codes (pages export instant = false).
  async function Page({ params }: Params) {
    const { path } = await params;
    const loaded = await load(locale, path);
    if (!loaded) notFound();
    if ('redirectTo' in loaded) permanentRedirect(loaded.redirectTo);
    const { list, canonicalPath } = loaded;
    // "page-1", "page-0" and similar: 301 to the canonical URL.
    const requested = [sectionPath(locale, 'faq'), ...(path ?? []).map((p) => decodeURIComponent(p))].join('/');
    if (requested !== canonicalPath) permanentRedirect(canonicalPath);
    const [site, alternate] = await Promise.all([getSite(locale), alternateOf(locale, list)]);
    return <FaqView list={list} chrome={{ locale, site, t: getMessages(locale), alternateHref: alternate.href }} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
