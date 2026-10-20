import Image from 'next/image';
import { Breadcrumb, SiteFooter, SolidHeader, type Chrome, type Crumb } from '@/components/layout';
import { ORGANIZATION_ID } from '@/lib/organization';
import { DEFAULT_SOCIAL_IMAGE } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl, siteUrl } from '@/lib/site-url';
import { CopyLink } from './CopyLink';
import type { Article } from './data';
import { blogMessages } from './messages';
import { articlePath, blogPath } from './paths';
import { formatDate, linked, pad } from './shared';
import { Toc } from './Toc';
import { prepareContent, readingMinutes, withHeadingIds } from './headings';
import { normalizeArticleHtml } from './normalize';
import s from './article.module.css';

export function ArticleView({ article, chrome }: { article: Article; chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const m = blogMessages(locale);
  const info = siteInfo(site);
  const blogHref = sectionPath(locale, 'blog');
  const path = articlePath(locale, article.canonical.categorySlug, article.canonical.slug);
  const url = absoluteUrl(path);
  const category = article.category;
  const trail = category && 'breadcrumb' in category ? category.breadcrumb : category ? [{ slug: category.slug, name: category.name }] : [];
  const { html: withIds, toc } = withHeadingIds(normalizeArticleHtml(article.contentHtml ?? ''));
  const html = prepareContent(withIds, s.tableWrap);
  const minutes = readingMinutes(`${article.leadHtml ?? ''} ${article.contentHtml ?? ''}`);
  // The sub-title is the deck under the headline; without one the lead takes its place.
  const deck = article.subTitle ?? article.lead;
  const openingHtml = article.subTitle ? article.leadHtml : null;
  const tocItems = toc.filter((item) => item.level === 2).length >= 2 ? toc : [];

  const crumbs: Crumb[] = [
    { label: t.breadcrumb.home, href: homePath(locale) },
    { label: m.breadcrumb, href: blogHref },
    ...trail.map((c) => ({ label: c.name, href: blogPath(locale, c.slug) })),
    { label: article.title, href: path },
  ];

  const related = linked(locale, article.related.length > 0 ? article.related : article.popular.filter((a) => a.id !== article.id)).slice(0, 3);
  const fallbackCards = m.fallbackCards.slice(0, Math.max(0, 3 - related.length));
  const share = encodeURIComponent(url);

  return (
    <>
      <SolidHeader chrome={chrome} currentHref={blogHref} />

      <main>
        <article aria-labelledby="article-title">
          <header className={s.head}>
            <div className="container">
              <div className={s.crumbs}>
                <Breadcrumb items={crumbs} label={t.breadcrumb.label} />
              </div>
              <div className={s.titleWrap}>
                <Eyebrow className={s.kicker}>
                  {m.heroEyebrow}
                  {category && <> &nbsp;/&nbsp; {category.name}</>}
                </Eyebrow>
                <h1 id="article-title" className={s.title}>{article.title}</h1>
                {deck && <p className={s.deck}>{deck}</p>}
                <p className={s.meta}>
                  <span><strong>{m.publisher}</strong></span>
                  {article.publishDate && (
                    <>
                      <span className={s.dot} aria-hidden="true" />
                      <time dateTime={article.publishDate}>{formatDate(article.publishDate, locale)}</time>
                    </>
                  )}
                  <span className={s.dot} aria-hidden="true" />
                  <span>{m.minuteRead(minutes)}</span>
                </p>
              </div>
              {article.image && (
                <div className={s.cover}>
                  <Image src={article.image} alt={article.title} fill preload sizes="(max-width: 600px) 90vw, (max-width: 1300px) 94vw, 1208px" quality={80} />
                </div>
              )}
            </div>
          </header>

          <div className={s.section}>
            <div className={cx('container', s.layout)}>
              <aside className={s.sidebar} aria-label={m.sidebarLabel}>
                {tocItems.length > 0 && (
                  <>
                    <p className={s.sidebarLabel}>{m.tocTitle}</p>
                    <Toc items={tocItems} label={m.tocLabel} className={s.toc} activeClass={s.tocActive} numbered />
                    <div className={s.sidebarDivider} />
                  </>
                )}
                <p className={s.shareTitle}>{m.share}</p>
                <ShareRow url={url} share={share} m={m} />
                <p className={s.sidebarSmall}>{m.sidebarNote}</p>
              </aside>

              <div className={s.post}>
                {tocItems.length > 0 && (
                  <details className={s.mobileToc}>
                    <summary>{m.tocMobile}</summary>
                    <Toc items={tocItems} label={m.tocLabel} className={s.toc} activeClass={s.tocActive} />
                  </details>
                )}
                {openingHtml && <div className={s.opening} dangerouslySetInnerHTML={{ __html: openingHtml }} />}
                {html && <div className={s.prose} dangerouslySetInnerHTML={{ __html: html }} />}

                <div className={s.end}>
                  {category ? <SmartLink className={s.tag} href={blogPath(locale, category.slug)}>{category.name}</SmartLink> : <span />}
                  <div className={s.endShare}>
                    <span>{m.enjoyed}</span>
                    <ShareRow url={url} share={share} m={m} compact />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className={s.related} aria-labelledby="related-title">
          <div className="container">
            <div className={s.relatedHead}>
              <div>
                <Eyebrow>{m.relatedEyebrow}</Eyebrow>
                <h2 className={s.heading} id="related-title">
                  {m.relatedTitle} <em>{m.relatedTitleEm}</em>
                </h2>
              </div>
              <p>{m.relatedIntro}</p>
            </div>
            <ul className={s.relatedGrid}>
              {related.map((a, i) => (
                <li key={a.id}>
                  <SmartLink className={s.relatedCard} href={a.href}>
                    <span className={s.relatedKicker}>{pad(i + 1)} &nbsp;/&nbsp; {a.category.name}</span>
                    <h3>{a.title}</h3>
                    {a.lead && <p>{a.lead}</p>}
                    <span className={s.linkLine}>{m.readStory} <span aria-hidden="true">↗︎</span></span>
                  </SmartLink>
                </li>
              ))}
              {fallbackCards.map((card, i) => (
                <li key={card.section}>
                  <SmartLink className={s.relatedCard} href={sectionPath(locale, card.section)}>
                    <span className={s.relatedKicker}>{pad(related.length + i + 1)} &nbsp;/&nbsp; {card.kicker}</span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <span className={s.linkLine}>{card.link} <span aria-hidden="true">↗︎</span></span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={s.banner} aria-label={m.bannerLabel}>
          <div className={cx('container', s.bannerInner)}>
            <div>
              <Eyebrow inverse>{m.bannerEyebrow}</Eyebrow>
              <h2>
                {m.bannerTitle} <em>{m.bannerTitleEm}</em>
              </h2>
              <p>{m.bannerBody}</p>
            </div>
            <div className={s.bannerActions}>
              <ButtonLink href={sectionPath(locale, 'itinerary')}>{m.bannerPrimary}</ButtonLink>
              <ButtonLink href={sectionPath(locale, 'booking')} variant="lightOutline">{m.bannerSecondary}</ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          url,
          headline: article.title,
          ...((article.seo.description ?? article.lead) && { description: article.seo.description ?? article.lead }),
          // Google requires an image for Article results; fall back to the site's social card.
          image: [article.image ? absoluteImageUrl(article.image, 1200, 630) : absoluteUrl(DEFAULT_SOCIAL_IMAGE)],
          ...(article.publishDate && { datePublished: article.publishDate }),
          ...((article.updatedAt ?? article.publishDate) && { dateModified: article.updatedAt ?? article.publishDate }),
          inLanguage: locale,
          ...(category && { articleSection: category.name }),
          wordCount: html ? html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length : undefined,
          isPartOf: { '@type': 'Blog', '@id': `${absoluteUrl(blogHref)}#blog`, url: absoluteUrl(blogHref) },
          // No author field in the CMS: the organization is credited, as on the Laravel site.
          author: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: info.name, url: siteUrl },
          publisher: {
            '@type': 'Organization',
            '@id': ORGANIZATION_ID,
            name: info.name,
            url: siteUrl,
            ...(info.logo && { logo: { '@type': 'ImageObject', url: `${siteUrl}${info.logo}` } }),
          },
        }}
      />
    </>
  );
}

function ShareRow({ url, share, m, compact }: { url: string; share: string; m: ReturnType<typeof blogMessages>; compact?: boolean }) {
  return (
    <div className={s.shareRow}>
      <CopyLink url={url} label={m.copyLink} copied={m.copied} failed={m.copyFailed} className={s.shareIcon} toastClass={s.toast} />
      <a className={s.shareIcon} href={`https://www.facebook.com/sharer/sharer.php?u=${share}`} target="_blank" rel="noopener" title={m.shareFacebook} aria-label={m.shareFacebook}>f</a>
      {!compact && (
        <a className={s.shareIcon} href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`} target="_blank" rel="noopener" title={m.shareLinkedin} aria-label={m.shareLinkedin}>in</a>
      )}
    </div>
  );
}
