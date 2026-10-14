import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumb, SiteFooter, SolidHeader, type Chrome, type Crumb } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink } from '@/components/ui';
import { sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteUrl, siteUrl } from '@/lib/site-url';
import type { LegalArticle } from './data';
import type { LegalMessages } from './messages';
import type { Policy } from './policies';
import { ScrollSpy } from './ScrollSpy';
import s from './legal.module.css';

// Photography already used by the CMS (homepage banner).
const HERO_IMAGE = '/upload/2026/03/13/banner-home.png';

export type TocItem = { href: string; label: string; number?: string; current?: boolean };

const ICONS: Record<Policy['key'], ReactNode> = {
  safety: (
    <>
      <path d="M16 3l11 4v8c0 7.5-4.8 12.4-11 15C9.8 27.4 5 22.5 5 15V7L16 3z" />
      <path d="m11 16 3.3 3.4L21 12" />
    </>
  ),
  terms: (
    <>
      <path d="M9 3h11l6 6v20H9z" />
      <path d="M20 3v7h6M13 16h10M13 21h10M13 26h6" />
    </>
  ),
  privacy: (
    <>
      <rect x="7" y="14" width="18" height="15" rx="2" />
      <path d="M11 14V9a5 5 0 0 1 10 0v5M16 20v4" />
    </>
  ),
  paymentMethods: (
    <>
      <rect x="4" y="8" width="24" height="17" rx="2" />
      <path d="M4 13h24M9 20h6" />
    </>
  ),
};

/** Topbar, solid nav, the light split hero, the four-policy jump bar, then the page body, CTA and footer. */
export function LegalShell({
  chrome,
  m,
  path,
  crumbs,
  title,
  titleEm,
  intro,
  updated,
  artEyebrow,
  artCaption,
  jumpLinks,
  pageName,
  dateModified,
  children,
}: {
  chrome: Chrome;
  m: LegalMessages;
  path: string;
  crumbs: Crumb[];
  title: string;
  titleEm: string;
  intro: string;
  updated: string | null;
  artEyebrow: string;
  artCaption: string;
  jumpLinks: { policy: Policy; href: string; title: string; current?: boolean }[];
  pageName: string;
  dateModified: string | null;
  children: ReactNode;
}) {
  const { locale, site, t } = chrome;
  const contactHref = sectionPath(locale, 'contact');
  return (
    <>
      <SolidHeader chrome={chrome} currentHref={path} />

      <section className={s.hero}>
        <div className={cx('container', s.heroGrid)}>
          <div>
            <div className={s.crumbs}>
              <Breadcrumb items={crumbs} label={t.breadcrumb.label} />
            </div>
            <Eyebrow className={s.heroEyebrow}>{m.heroEyebrow}</Eyebrow>
            <h1 className={s.heroTitle}>
              {title}
              <br />
              <em>{titleEm}</em>
            </h1>
            <p className={s.heroIntro}>{intro}</p>
            <p className={s.heroMeta}>
              {updated && (
                <>
                  <span><strong>{m.lastUpdated}:</strong> {updated}</span>
                  <span className={s.metaDivider} aria-hidden="true" />
                </>
              )}
              <span><strong>{m.appliesTo}:</strong> {new URL(siteUrl).host}</span>
            </p>
          </div>
          <div className={s.heroArt}>
            <Image src={HERO_IMAGE} alt="" fill preload sizes="(max-width: 600px) 100vw, 46vw" quality={85} className={s.heroImage} />
            <span className={s.artFrame} aria-hidden="true" />
            <span className={s.artCorner} aria-hidden="true">GR.</span>
            <p className={s.artCaption}>
              <span>{artEyebrow}</span>
              <strong>{artCaption}</strong>
            </p>
          </div>
        </div>
      </section>

      <div className={cx('container', s.jumpWrap)}>
        <nav className={s.jumpBar} aria-label={m.jumpBarLabel}>
          {jumpLinks.map(({ policy, href, title: label, current }, i) => (
            <SmartLink key={policy.key} href={href} className={s.jumpCard} aria-current={current ? 'page' : undefined}>
              <span className={s.jumpIcon}>
                <svg viewBox="0 0 32 32" aria-hidden="true">{ICONS[policy.key]}</svg>
              </span>
              <span className={s.jumpCopy}>
                <span>{String(i + 1).padStart(2, '0')} / {m.policies[policy.key].jumpLabel}</span>
                <b>{label}</b>
                <small>{m.policies[policy.key].jumpNote}</small>
              </span>
            </SmartLink>
          ))}
        </nav>
      </div>

      <main className={s.main}>{children}</main>

      <section className={s.finalCta} aria-labelledby="legal-cta-title">
        <div className={cx('container', s.finalInner)}>
          <div>
            <Eyebrow inverse>{m.cta.eyebrow}</Eyebrow>
            <h2 id="legal-cta-title">
              {m.cta.title}
              <br />
              <em>{m.cta.titleEm}</em>
            </h2>
            <p>{m.cta.body}</p>
          </div>
          <div className={s.finalActions}>
            <ButtonLink href={sectionPath(locale, 'itinerary')}>{m.cta.primary}</ButtonLink>
            <ButtonLink href={contactHref} variant="lightOutline">{m.cta.secondary}</ButtonLink>
          </div>
        </div>
      </section>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          url: absoluteUrl(path),
          name: pageName,
          inLanguage: locale,
          ...(dateModified && { dateModified }),
          isPartOf: { '@type': 'WebSite', name: siteInfo(site).name, url: siteUrl },
        }}
      />
    </>
  );
}

/** Desktop sidebar: "On this page" index, help card and (when the CMS picks any) popular articles. */
export function LegalSidebar({
  chrome,
  m,
  heading,
  items,
  articles,
}: {
  chrome: Chrome;
  m: LegalMessages;
  heading: string;
  items: TocItem[];
  articles: LegalArticle[];
}) {
  const info = siteInfo(chrome.site);
  const blog = sectionPath(chrome.locale, 'blog');
  const linked = articles.filter((a) => a.category);
  const hasAnchors = items.some((item) => item.href.startsWith('#'));
  return (
    <aside className={s.sidebar}>
      <p className={s.sidebarHead} id="legal-toc-title">{heading}</p>
      <nav id="legal-toc" className={s.toc} aria-labelledby="legal-toc-title">
        {items.map((item) => (
          <SmartLink key={item.href} href={item.href} aria-current={item.current ? 'page' : undefined}>
            {item.number && <span className={s.tocNum}>{item.number}</span>}
            <span>{item.label}</span>
          </SmartLink>
        ))}
      </nav>
      {hasAnchors && <ScrollSpy tocId="legal-toc" mobileTocId="legal-mobile-toc" />}

      <div className={s.supportCard}>
        <span className={s.supportEyebrow}>{m.support.eyebrow}</span>
        <h2>{m.support.title}</h2>
        <p>{m.support.body}</p>
        {info.email && <a href={`mailto:${info.email}`}>{info.email} ↗</a>}
        {info.hotlineHref && <a href={info.hotlineHref}>{info.hotline} ↗</a>}
      </div>

      {linked.length > 0 && (
        <div className={s.popular}>
          <p className={s.sidebarHead}>{m.popularArticles}</p>
          <ul>
            {linked.map((a) => (
              <li key={a.id}>
                <SmartLink href={`${blog}/${a.category?.slug}/${a.slug}.html`}>{a.title}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

/** Mobile replacement for the sidebar index (a native <details>, no JavaScript needed). */
export function MobileToc({ m, items }: { m: LegalMessages; items: TocItem[] }) {
  return (
    <details className={s.mobileToc} id="legal-mobile-toc">
      <summary>{items.some((i) => i.href.startsWith('#')) ? m.jumpToSection : m.allPolicies}</summary>
      <nav aria-label={m.onThisPage}>
        {items.map((item) => (
          <SmartLink key={item.href} href={item.href} aria-current={item.current ? 'page' : undefined}>
            {item.label}
          </SmartLink>
        ))}
      </nav>
    </details>
  );
}

/** CMS policy HTML (sanitized by the CMS with safe_html). */
export function PolicyHtml({ html, className }: { html: string; className?: string }) {
  return <div className={cx(s.prose, className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Shown instead of policy text when the CMS has none: never invent legal wording. */
export function PendingNotice({ m }: { m: LegalMessages }) {
  return (
    <p className={s.notice}>
      <strong>{m.pending.title}</strong> {m.pending.body}
    </p>
  );
}

export function ContactPanel({ title, body, cta, href }: { title: string; body: string; cta: string; href: string }) {
  return (
    <div className={s.contactPanel}>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <ButtonLink href={href} variant="dark">{cta}</ButtonLink>
    </div>
  );
}

export function RelatedLinks({ items }: { items: { href: string; eyebrow: string; label: string }[] }) {
  return (
    <div className={s.relatedLinks}>
      {items.map((item) => (
        <SmartLink key={item.href} href={item.href} className={s.relatedLink}>
          <span>
            <small>{item.eyebrow}</small>
            {item.label}
          </span>
          <span className={s.arr} aria-hidden="true">↗</span>
        </SmartLink>
      ))}
    </div>
  );
}

export function SectionTop({ number, micro }: { number: string; micro?: string }) {
  return (
    <div className={s.sectionTop} aria-hidden="true">
      <span className={s.index}>{number}</span>
      <span className={s.line} />
      {micro && <span className={s.micro}>{micro}</span>}
    </div>
  );
}

