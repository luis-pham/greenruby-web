import Image from 'next/image';
import { Fragment, type ReactNode } from 'react';
import { Breadcrumb, SiteFooter, SiteNav, Topbar, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, TextLink } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { ORGANIZATION_ID } from '@/lib/organization';
import { absoluteUrl } from '@/lib/site-url';
import { MetricPanel, ShipSnapshot } from './EcoSwitches';
import { ecoMessages } from './messages';
import s from './eco.module.css';

/** Fallback when the CMS homepage has no banner; normally the hero reuses the homepage banner. */
export const ECO_HERO_FALLBACK = '/upload/2026/06/08/green-ruby-cruises-halong-bay-1.jpg';

const TECH_ICONS: ReactNode[] = [
  <Fragment key="sun">
    <circle cx="16" cy="11" r="5" />
    <path d="M16 1v3m0 14v3M6 11H3m26 0h-3M9 4 7 2m16 16 2 2M9 18l-2 2M25 2l-2 2M3 26h26M8 22h16l3 4H5l3-4Z" />
  </Fragment>,
  <path key="sea" d="M2 23q4-5 9 0t10 0t9 0M2 28q4-5 9 0t10 0t9 0M6 17c4-6 8-10 10-14 2 4 6 8 10 14" />,
  <Fragment key="heat">
    <path d="M22 4a12 12 0 0 1 5 20m-4 3A12 12 0 0 1 5 9M26 12V4h-8M6 20v8h8" />
    <path d="m16 8-4 8h7l-3 8" />
  </Fragment>,
];

function SectionHead({ eyebrow, title, titleEm, lede, id }: { eyebrow: string; title: string; titleEm: string; lede: string; id: string }) {
  return (
    <div className={s.sectionHead}>
      <div>
        <span className={cx(s.micro, s.eyebrow)}>{eyebrow}</span>
        <h2 className={s.heading} id={id}>
          {title}
          <br />
          <em>{titleEm}</em>
        </h2>
      </div>
      <p className={s.lede}>{lede}</p>
    </div>
  );
}

/** /eco-dashboard: environmental reporting design. Figures are labelled estimates until measured data exists. */
export function EcoDashboardView({ chrome, heroImage }: { chrome: Chrome; heroImage: string }) {
  const { locale, t } = chrome;
  const m = ecoMessages[locale];
  const path = sectionPath(locale, 'ecoDashboard');

  return (
    <>
      <Topbar site={chrome.site} t={t} />
      <header className={s.hero}>
        <Image src={heroImage} alt="" fill preload sizes="100vw" quality={80} className={s.heroImage} />
        <div className="container">
          <SiteNav {...chrome} currentHref={path} />
          <div className={s.heroBody}>
            <Breadcrumb
              label={t.breadcrumb.label}
              items={[
                { label: t.breadcrumb.home, href: homePath(locale) },
                { label: m.breadcrumb, href: path },
              ]}
            />
            <span className={cx(s.micro, s.heroKicker)}>{m.hero.kicker}</span>
            <h1 className={s.heroTitle}>
              {m.hero.title}
              <br />
              <em>{m.hero.titleEm}</em>
            </h1>
            <p className={s.heroText}>{m.hero.body}</p>
            <div className={s.heroActions}>
              <ButtonLink href="#impact">{m.hero.primary}</ButtonLink>
              <TextLink href="#methodology" inverse>{m.hero.secondary}</TextLink>
            </div>
          </div>
        </div>
        <span className={s.heroMark} aria-hidden="true">{m.hero.mark}</span>
      </header>

      <div className={s.statusArea}>
        <div className={cx('container', s.statusInner)}>
          <span>
            <i className={s.statusDot} aria-hidden="true" />
            <span><strong>{m.status.label}</strong> {m.status.body}</span>
          </span>
          <a href="#methodology">{m.status.link} ↗︎</a>
        </div>
      </div>

      <main>
        <section className={s.section} id="impact" aria-labelledby="impact-title">
          <div className="container">
            <SectionHead id="impact-title" {...m.snapshot} />
            <ShipSnapshot m={m.snapshot} />
            <div className={s.interpret}>
              <svg width="23" height="23" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5m0-8v1" />
              </svg>
              <p>
                <b>{m.snapshot.whyTitle}</b> {m.snapshot.whyBody}
              </p>
            </div>
          </div>
        </section>

        <section className={cx(s.section, s.technologies)} id="technology" aria-labelledby="technology-title">
          <div className="container">
            <SectionHead id="technology-title" {...m.technology} />
            <div className={s.techGrid}>
              {m.technology.items.map((item, i) => (
                <article key={item.title} className={s.techCard}>
                  <div className={s.techTop}>
                    <span className={s.micro}>{item.kicker}</span>
                    <span className={s.techSymbol}>
                      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{TECH_ICONS[i]}</svg>
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className={s.techTag}>{item.tag}</span>
                </article>
              ))}
            </div>
            <div className={s.techFoot}>
              <span>{m.technology.foot}</span>
              <TextLink href={sectionPath(locale, 'aboutUs')}>{m.technology.footLink}</TextLink>
            </div>
          </div>
        </section>

        <section className={cx(s.section, s.dataZone)} id="reporting" aria-labelledby="reporting-title">
          <div className="container">
            <SectionHead id="reporting-title" {...m.reporting} />
            <MetricPanel
              m={m.reporting}
              aside={
                <aside className={s.captureList}>
                  <span className={s.micro}>{m.reporting.sourcesKicker}</span>
                  <h3>{m.reporting.sourcesTitle}</h3>
                  <dl>
                    {m.reporting.sources.map(([what, how]) => (
                      <div key={what} className={s.captureItem}>
                        <dt>{what}</dt>
                        <dd>{how}</dd>
                      </div>
                    ))}
                  </dl>
                  <p>{m.reporting.sourcesNote}</p>
                </aside>
              }
            />
          </div>
        </section>

        <section className={cx(s.section, s.beyond)} id="beyond" aria-labelledby="beyond-title">
          <div className="container">
            <SectionHead id="beyond-title" {...m.beyond} />
            <div className={s.beyondGrid}>
              {m.beyond.items.map((item, i) => (
                <div key={item.title} className={s.beyondItem}>
                  <div className={s.beyondNum}>{String(i + 1).padStart(2, '0')}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <small>{item.status}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={cx(s.section, s.method)} id="methodology" aria-labelledby="methodology-title">
          <div className={cx('container', s.methodGrid)}>
            <div>
              <span className={cx(s.micro, s.eyebrow)}>{m.method.eyebrow}</span>
              <h2 className={s.heading} id="methodology-title">
                {m.method.title}
                <br />
                <em>{m.method.titleEm}</em>
              </h2>
              <p className={s.lede}>{m.method.lede}</p>
            </div>
            <div className={s.methodContent}>
              <p>{m.method.intro}</p>
              {m.method.items.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
              <div className={s.methodNote}>
                <b>{m.method.noteTitle}</b>
                <br />
                {m.method.note}
              </div>
            </div>
          </div>
        </section>

        <section className={s.cta} aria-labelledby="eco-cta-title">
          <span className={s.micro}>{m.cta.kicker}</span>
          <h2 id="eco-cta-title">
            {m.cta.title}
            <br />
            <em>{m.cta.titleEm}</em>
          </h2>
          <p>{m.cta.body}</p>
          <ButtonLink href={sectionPath(locale, 'itinerary')}>{m.cta.button}</ButtonLink>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': absoluteUrl(path),
              url: absoluteUrl(path),
              name: m.metaTitle,
              description: m.metaDescription,
              inLanguage: locale,
              about: { '@id': ORGANIZATION_ID },
              publisher: { '@id': ORGANIZATION_ID },
              primaryImageOfPage: absoluteUrl(heroImage),
            },
            {
              '@type': 'FAQPage',
              mainEntity: m.method.items.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t.breadcrumb.home, item: absoluteUrl(homePath(locale)) },
                { '@type': 'ListItem', position: 2, name: m.breadcrumb, item: absoluteUrl(path) },
              ],
            },
          ],
        }}
      />
    </>
  );
}
