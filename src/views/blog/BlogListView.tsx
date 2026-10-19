import Image from 'next/image';
import { Suspense } from 'react';
import { Breadcrumb, SiteFooter, SolidHeader, type Chrome, type Crumb } from '@/components/layout';
import { ORGANIZATION_ID } from '@/lib/organization';
import { DEFAULT_SOCIAL_IMAGE } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import type { ArticleList, CategoryNode } from './data';
import { blogMessages } from './messages';
import { blogPath, searchPath } from './paths';
import { SearchRedirect } from './SearchRedirect';
import { formatDate, linked, pad, PHOTOS, SearchIcon, type LinkedArticle } from './shared';
import s from './blog.module.css';

/** Search state for the noindex search route. Listing pages pass nothing. */
export type SearchState = { keyword: string; category: string | null };

/** Blade's filter bar: children of the category, else its siblings; top-level categories on /blog. */
function filterCategories(list: ArticleList): CategoryNode[] {
  const { categories, category } = list;
  if (!category) return categories;
  const find = (nodes: CategoryNode[], id: number): CategoryNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const hit = find(node.children, id);
      if (hit) return hit;
    }
    return null;
  };
  const self = find(categories, category.id);
  if (self && self.children.length > 0) return self.children;
  const parent = category.parent ? find(categories, category.parent.id) : null;
  return parent ? parent.children : categories;
}

export function BlogListView({ chrome, list, search }: { chrome: Chrome; list: ArticleList; search?: SearchState }) {
  const { locale, t } = chrome;
  const m = blogMessages(locale);
  const { category, pagination } = list;
  const page = pagination.page;
  const blogHref = sectionPath(locale, 'blog');
  const selfHref = search ? searchPath(locale) : blogPath(locale, category?.slug, page);

  const crumbs: Crumb[] = [
    { label: t.breadcrumb.home, href: homePath(locale) },
    { label: m.breadcrumb, href: blogHref },
    ...(category ? category.breadcrumb.map((c) => ({ label: c.name, href: blogPath(locale, c.slug) })) : []),
    ...(search ? [{ label: m.searchMetaTitle, href: searchPath(locale) }] : []),
    ...(page > 1 && !search ? [{ label: m.page(page), href: selfHref }] : []),
  ];

  const items = linked(locale, list.items);
  // Page 1 of a listing opens with a feature card: the first featured story, else the newest one.
  const feature = !search && page === 1 ? (linked(locale, list.featured)[0] ?? items[0] ?? null) : null;
  const grid = feature ? items.filter((a) => a.id !== feature.id) : items;
  const shown = grid.length + (feature ? 1 : 0);

  const heroTitle = search
    ? search.keyword
      ? m.searchTitle(search.keyword)
      : m.searchEmptyTitle
    : category
      ? category.name
      : (
          <>
            {m.heroTitle} <em>{m.heroTitleEm}</em>
          </>
        );
  const heroLead = search ? (search.keyword ? m.categoryLead : m.searchHint) : category ? (category.description ?? m.categoryLead) : m.listIntro;
  const eyebrow = [search ? m.searchEyebrow : m.heroEyebrow, page > 1 ? m.page(page) : null].filter(Boolean).join(' · ');

  const pageHref = (n: number) => {
    if (!search) return blogPath(locale, category?.slug, n);
    const query = new URLSearchParams({ k: search.keyword, ...(search.category ? { category: search.category } : {}), ...(n > 1 ? { page: String(n) } : {}) });
    return `${searchPath(locale)}?${query}`;
  };

  // Empty categories are noindex: don't link them from the filter bar or topics (unless you are on one).
  const activeSlug = search ? search.category : (category?.slug ?? null);
  const filters = filterCategories(list).filter((n) => n.count > 0 || n.slug === activeSlug);
  const formCategory = search ? search.category : (category?.slug ?? null);
  const topics = list.categories.filter((n) => n.count > 0).slice(0, 5);
  const knownImages = linked(locale, [...list.featured, ...list.items, ...list.popular]);
  const topicImage = (node: CategoryNode, i: number) =>
    knownImages.find((a) => a.image && (a.category.id === node.id || node.children.some((c) => c.id === a.category.id)))?.image ?? PHOTOS.topics[i % PHOTOS.topics.length];

  const lineLabel = search ? (search.category ? m.searchIn(category?.name ?? search.category) : m.searchEyebrow) : page === 1 && feature?.isFeatured ? m.editorsSelection : m.latest;

  return (
    <>
      <SolidHeader chrome={chrome} currentHref={blogHref} />

      <main>
        <section className={s.journal} id="stories" aria-labelledby="stories-title">
          <div className="container">
            {/* The listing opens the page (no separate intro): breadcrumb, then the page H1. */}
            <div className={s.journalCrumbs}>
              <Breadcrumb items={crumbs} label={t.breadcrumb.label} onLight />
            </div>
            <div className={s.sectionHead}>
              <div>
                <Eyebrow>{eyebrow}</Eyebrow>
                <h1 className={s.heading} id="stories-title">{heroTitle}</h1>
              </div>
              <p className={s.desc}>{heroLead}</p>
            </div>

            <div className={s.browseBar}>
              <nav className={s.filterList} aria-label={m.filterLabel}>
                <SmartLink href={blogHref} className={s.filter} aria-current={!activeSlug && !search ? 'page' : undefined}>
                  {m.allStories}
                </SmartLink>
                {category && category.parent && filters !== list.categories && (
                  <SmartLink href={blogPath(locale, category.parent.slug)} className={s.filter}>{category.parent.name}</SmartLink>
                )}
                {filters.map((node) => (
                  <SmartLink key={node.id} href={blogPath(locale, node.slug)} className={s.filter} aria-current={node.slug === activeSlug && !search ? 'page' : undefined}>
                    {node.name}
                  </SmartLink>
                ))}
              </nav>
              <form className={s.searchField} role="search" action={searchPath(locale)} method="get">
                <SearchIcon />
                <input type="search" name="k" aria-label={m.searchLabel} placeholder={m.searchPlaceholder} defaultValue={search?.keyword ?? ''} autoComplete="off" />
                {formCategory && <input type="hidden" name="category" value={formCategory} />}
                <button type="submit" className="sr-only">{m.searchSubmit}</button>
              </form>
            </div>

            <p className={s.resultLine}>
              <span>{lineLabel}</span>
              <span>
                <b>{pad(pagination.total)}</b> {m.storyCount(pagination.total)}
              </span>
            </p>

            {(feature || grid.length > 0) && <h2 className="sr-only">{m.latest}</h2>}
            {feature && <FeatureCard article={feature} locale={locale} />}

            {grid.length > 0 && (
              <ul className={s.moreGrid} aria-label={m.moreArticles}>
                {grid.map((article) => (
                  <li key={article.id}>
                    <ArticleCard article={article} locale={locale} />
                  </li>
                ))}
              </ul>
            )}

            {shown === 0 && (
              <div className={s.noResults}>
                <div className={s.smallMark} aria-hidden="true">{m.emptyMark}</div>
                <h3>{search ? (search.keyword ? m.searchNoResultsTitle : m.searchEmptyTitle) : m.emptyTitle}</h3>
                <p>{search ? (search.keyword ? m.searchNoResults : m.searchHint) : category ? m.emptyBody : m.emptyBodyAll}</p>
                {category || search ? (
                  <ButtonLink href={blogHref} variant="dark">{m.emptyCtaAll}</ButtonLink>
                ) : (
                  <ButtonLink href={sectionPath(locale, 'itinerary')} variant="dark">{m.emptyCtaJourneys}</ButtonLink>
                )}
              </div>
            )}

            {pagination.lastPage > 1 && <Pagination page={page} last={pagination.lastPage} href={pageHref} label={m.pagination} previous={m.previous} next={m.next} />}
          </div>
        </section>

        {topics.length > 0 && (
          <section className={s.topics} aria-labelledby="topics-title">
            <div className="container">
              <div className={s.sectionHead}>
                <div>
                  <Eyebrow>{m.topicsEyebrow}</Eyebrow>
                  <h2 className={s.heading} id="topics-title">
                    {m.topicsTitle} <em>{m.topicsTitleEm}</em>
                  </h2>
                </div>
                <p className={s.desc}>{m.topicsIntro}</p>
              </div>
              <ul className={s.topicsGrid}>
                {topics.map((node, i) => (
                  <li key={node.id}>
                    <SmartLink className={s.topicCard} href={blogPath(locale, node.slug)}>
                      <span className={s.topicPicture}>
                        <Image src={topicImage(node, i)} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                        <span className={s.topicCount}>{pad(i + 1)}</span>
                      </span>
                      <span className={s.topicBody}>
                        <span className={s.topicType}>{m.topicType}</span>
                        <h3>{node.name}</h3>
                        <p>{m.topicCount(node.count)}</p>
                        <span className={s.linkLine}>{m.exploreTopic} <span aria-hidden="true">↗︎</span></span>
                      </span>
                    </SmartLink>
                  </li>
                ))}
                <li>
                  <SmartLink className={cx(s.topicCard, s.ctaCard)} href={sectionPath(locale, 'itinerary')}>
                    <span className={s.topicPicture}>
                      <Image src={PHOTOS.topics[0]} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                      <span className={s.topicCount}>✦</span>
                    </span>
                    <span className={s.topicBody}>
                      <span className={s.topicType}>{m.ctaTopicType}</span>
                      <h3>{m.ctaTopicTitle}</h3>
                      <p>{m.ctaTopicBody}</p>
                      <span className={s.linkLine}>{m.ctaTopicLink} <span aria-hidden="true">↗︎</span></span>
                    </span>
                  </SmartLink>
                </li>
              </ul>
            </div>
          </section>
        )}

        <section className={s.afterword} aria-labelledby="afterword-title">
          <div className={cx('container', s.afterwordLayout)}>
            <div>
              <Eyebrow>{m.afterEyebrow}</Eyebrow>
              <h2 className={s.heading} id="afterword-title">
                {m.afterTitle} <em>{m.afterTitleEm}</em>
              </h2>
              <p className={s.desc}>{m.afterBody}</p>
              <div className={s.afterwordActions}>
                <ButtonLink href={sectionPath(locale, 'itinerary')} variant="dark">{m.afterPrimary}</ButtonLink>
                <TextLink href={sectionPath(locale, 'contact')}>{m.afterSecondary}</TextLink>
              </div>
            </div>
            <figure className={s.afterwordPhoto}>
              <Image src={PHOTOS.afterword} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" />
              <span className={s.afterwordFrame} aria-hidden="true" />
              <figcaption>{m.afterCaption}</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      {!search && (
        <>
          {/* Old Laravel search links (/blog?k=…) move to the search route; normal visits render nothing. */}
          <Suspense fallback={null}>
            <SearchRedirect searchHref={searchPath(locale)} category={category?.slug} />
          </Suspense>
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': category ? 'CollectionPage' : 'Blog',
              name: category ? category.name : (list.seo.title ?? m.metaTitle),
              ...(list.seo.description && { description: list.seo.description }),
              url: absoluteUrl(selfHref),
              inLanguage: locale,
              ...(shown > 0 && {
                [category ? 'hasPart' : 'blogPost']: [...(feature ? [feature] : []), ...grid].map((a) => ({
                  '@type': 'BlogPosting',
                  headline: a.title,
                  url: absoluteUrl(a.href),
                  ...(a.publishDate && { datePublished: a.publishDate }),
                  image: a.image ? absoluteImageUrl(a.image) : absoluteUrl(DEFAULT_SOCIAL_IMAGE),
                  author: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: siteInfo(chrome.site).name },
                })),
              }),
            }}
          />
        </>
      )}
    </>
  );
}

function FeatureCard({ article, locale }: { article: LinkedArticle; locale: Chrome['locale'] }) {
  const m = blogMessages(locale);
  return (
    <article className={s.feature}>
      <SmartLink className={s.featurePhoto} href={article.href} aria-hidden="true" tabIndex={-1}>
        {article.image && <Image src={article.image} alt="" fill sizes="(max-width: 900px) 100vw, 52vw" />}
        <span className={s.photoCorner}>{article.isFeatured ? m.featured : m.latest}</span>
        <span className={s.photoCredit}>{m.journalNumber(1)}</span>
      </SmartLink>
      <div className={s.featureText}>
        <p className={s.meta}>
          <span>{article.category.name}</span>
          {article.publishDate && (
            <>
              <span className={s.sep} aria-hidden="true" />
              <time dateTime={article.publishDate}>{formatDate(article.publishDate, locale)}</time>
            </>
          )}
        </p>
        <h3>
          <SmartLink href={article.href}>{article.title}</SmartLink>
        </h3>
        {article.lead && <p className={s.featureLead}>{article.lead}</p>}
        <div className={s.featureBottom}>
          <TextLink href={article.href}>{m.readStory}</TextLink>
          {article.subTitle && <span className={s.readDetail}>{article.subTitle}</span>}
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ article, locale }: { article: LinkedArticle; locale: Chrome['locale'] }) {
  const m = blogMessages(locale);
  return (
    <article className={s.card}>
      <SmartLink className={s.cardPicture} href={article.href} tabIndex={-1} aria-hidden="true">
        {article.image && <Image src={article.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />}
      </SmartLink>
      <div className={s.cardBody}>
        <small>
          {article.category.name}
          {article.publishDate && <> · <time dateTime={article.publishDate}>{formatDate(article.publishDate, locale)}</time></>}
        </small>
        <h3>
          <SmartLink href={article.href}>{article.title}</SmartLink>
        </h3>
        {article.lead && <p>{article.lead}</p>}
        <TextLink href={article.href}>{m.readStory}</TextLink>
      </div>
    </article>
  );
}

function Pagination({ page, last, href, label, previous, next }: { page: number; last: number; href: (n: number) => string; label: string; previous: string; next: string }) {
  // Current page, its neighbours, first and last; gaps become an ellipsis.
  const pages = [...new Set([1, page - 1, page, page + 1, last])].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
  return (
    <nav className={s.pagination} aria-label={label}>
      {page > 1 && <SmartLink href={href(page - 1)} rel="prev">← {previous}</SmartLink>}
      {pages.map((n, i) => (
        <span key={n} className={s.pageItem}>
          {i > 0 && n - pages[i - 1] > 1 && <span aria-hidden="true">…</span>}
          {n === page ? <span aria-current="page">{n}</span> : <SmartLink href={href(n)}>{n}</SmartLink>}
        </span>
      ))}
      {page < last && <SmartLink href={href(page + 1)} rel="next">{next} →</SmartLink>}
    </nav>
  );
}
