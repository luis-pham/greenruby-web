import { Breadcrumb, SiteFooter, SolidHeader, type Chrome, type Crumb } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, Eyebrow } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { ORGANIZATION_ID } from '@/lib/organization';
import { DEFAULT_SOCIAL_IMAGE } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import { ArticleCard, FeatureCard, Pagination } from '@/views/blog/BlogListView';
import type { ArticleList } from '@/views/blog/data';
import { newsPath } from '@/views/blog/paths';
import { linked, pad } from '@/views/blog/shared';
import s from '@/views/blog/blog.module.css';
import { newsMessages } from './messages';

/** /news (vi /vi/tin-tuc): the blog listing layout without the journal's category filters, search and topics. */
export function NewsListView({ chrome, list }: { chrome: Chrome; list: ArticleList }) {
  const { locale, t } = chrome;
  const m = newsMessages(locale);
  const { pagination } = list;
  const page = pagination.page;
  const newsHref = newsPath(locale);
  const selfHref = newsPath(locale, page);

  const crumbs: Crumb[] = [
    { label: t.breadcrumb.home, href: homePath(locale) },
    { label: m.breadcrumb, href: newsHref },
    ...(page > 1 ? [{ label: m.page(page), href: selfHref }] : []),
  ];

  const items = linked(locale, list.items);
  // Page 1 opens with a feature card: the first featured article, else the newest one.
  const feature = page === 1 ? (linked(locale, list.featured)[0] ?? items[0] ?? null) : null;
  const grid = feature ? items.filter((a) => a.id !== feature.id) : items;
  const shown = grid.length + (feature ? 1 : 0);
  const eyebrow = [m.heroEyebrow, page > 1 ? m.page(page) : null].filter(Boolean).join(' · ');

  return (
    <>
      <SolidHeader chrome={chrome} currentHref={newsHref} />

      <main>
        <section className={s.journal} aria-labelledby="news-title">
          <div className="container">
            <div className={s.journalCrumbs}>
              <Breadcrumb items={crumbs} label={t.breadcrumb.label} onLight />
            </div>
            <div className={s.sectionHead}>
              <div>
                <Eyebrow>{eyebrow}</Eyebrow>
                <h1 className={s.heading} id="news-title">
                  {m.heroTitle} <em>{m.heroTitleEm}</em>
                </h1>
              </div>
              <p className={s.desc}>{list.category?.description ?? m.listIntro}</p>
            </div>

            <p className={s.resultLine}>
              <span>{page === 1 && feature?.isFeatured ? m.featured : m.latest}</span>
              <span>
                <b>{pad(pagination.total)}</b> {m.storyCount(pagination.total)}
              </span>
            </p>

            {shown > 0 && <h2 className="sr-only">{m.latest}</h2>}
            {feature && <FeatureCard article={feature} locale={locale} m={m} />}

            {grid.length > 0 && (
              <ul className={s.moreGrid} aria-label={m.moreArticles}>
                {grid.map((article) => (
                  <li key={article.id}>
                    <ArticleCard article={article} locale={locale} m={m} />
                  </li>
                ))}
              </ul>
            )}

            {shown === 0 && (
              <div className={s.noResults}>
                <div className={s.smallMark} aria-hidden="true">{m.emptyMark}</div>
                <h2 className={s.noResultsTitle}>{m.emptyTitle}</h2>
                <p>{m.emptyBodyAll}</p>
                <ButtonLink href={sectionPath(locale, 'itinerary')} variant="dark">{m.emptyCtaJourneys}</ButtonLink>
              </div>
            )}

            {pagination.lastPage > 1 && (
              <Pagination page={page} last={pagination.lastPage} href={(n) => newsPath(locale, n)} label={m.pagination} previous={m.previous} next={m.next} />
            )}
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: list.seo.title ?? m.metaTitle,
          ...(list.seo.description && { description: list.seo.description }),
          url: absoluteUrl(selfHref),
          inLanguage: locale,
          ...(shown > 0 && {
            hasPart: [...(feature ? [feature] : []), ...grid].map((a) => ({
              '@type': 'NewsArticle',
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
  );
}
