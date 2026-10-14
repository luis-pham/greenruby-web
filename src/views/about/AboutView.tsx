import Image from 'next/image';
import type { ReactNode } from 'react';
import { PageHero, SiteFooter, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import { detailPath, homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl, siteUrl } from '@/lib/site-url';
import type { AboutCruise, AboutPage } from './data';
import { aboutMessages, honestDescription } from './messages';
import s from './about.module.css';

export type Credential = { title: string | null; description: string | null };

const pad = (n: number) => String(n).padStart(2, '0');

const ICONS: Record<string, ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" />
    </>
  ),
  leaf: <path d="M20 3C9 4 5 10 5 16a6 6 0 0 0 6 6c9 0 11-11 9-19ZM6 21c2-6 7-10 12-13" />,
  people: (
    <>
      <circle cx="8" cy="8" r="3" />
      <path d="M2 21v-3a6 6 0 0 1 12 0v3M17 6a3 3 0 0 1 0 6M16 15a5 5 0 0 1 6 5v1" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
};

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/** Splits CMS copy into paragraphs: on blank lines, or into two halves at a sentence break for long single blocks. */
function paragraphs(text: string | null | undefined): string[] {
  if (!text) return [];
  const blocks = text.split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean);
  if (blocks.length > 1 || text.length < 420) return blocks;
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  const half = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, half).join('').trim(), sentences.slice(half).join('').trim()].filter(Boolean);
}

export function AboutView({
  data,
  fleet,
  credentials,
  chrome,
}: {
  data: AboutPage;
  fleet: AboutCruise[];
  credentials: Credential[];
  chrome: Chrome;
}) {
  const { locale, t, site } = chrome;
  const m = aboutMessages[locale];
  const info = siteInfo(site);
  const c = data.config;
  const path = sectionPath(locale, 'aboutUs');
  const banner = c.banner?.[0];
  const [storyMain, storySecondary] = data.heroImages;
  const tech = c.sustainability ?? [];
  const community = c.enviromentList ?? [];
  const stats = [
    { value: c.statisticWastewaterTreated, suffix: '%', label: m.impact.wastewater },
    { value: c.statisticReducedAnnually, suffix: '+', label: m.impact.co2 },
    { value: c.statisticRenewableSolarPower, suffix: ' kW', label: m.impact.solar },
  ].filter((x) => x.value != null && String(x.value).trim() !== '');
  const ctaImage = c.ecoFeaturedImage ?? banner?.src ?? null;
  const itineraryUrl = sectionPath(locale, 'itinerary');
  const contactUrl = sectionPath(locale, 'contact');

  return (
    <>
      <PageHero
        chrome={chrome}
        currentHref={path}
        image={banner?.src ?? null}
        imageAlt={banner?.alt ?? ''}
        crumbs={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: m.breadcrumb, href: path }]}
        eyebrow={m.hero.eyebrow}
        title={<>{m.hero.title} <em>{m.hero.titleEm}</em></>}
        description={banner?.description ?? m.hero.body}
        actions={
          <>
            <ButtonLink href="#story">{m.hero.primary}</ButtonLink>
            <ButtonLink href="#sustainability" variant="lightOutline">{m.hero.secondary}</ButtonLink>
          </>
        }
      />

      <main>
        <div className={cx('container', s.valueWrap)}>
          <ul className={s.values} aria-label={m.values.label}>
            {m.values.items.map((v, i) => (
              <li key={v.tag} className={s.value}>
                <Icon name={v.icon} className={s.valueIcon} />
                <div>
                  <span className={s.micro}>{pad(i + 1)} / {v.tag}</span>
                  <strong className={s.valueTitle}>{v.title}</strong>
                  <p>{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <nav className={s.subnav} aria-label={m.subnav.label}>
            <a href="#story">{m.subnav.story}</a>
            {tech.length > 0 && <a href="#sustainability">{m.subnav.approach}</a>}
            {community.length > 0 && <a href="#community">{m.subnav.community}</a>}
            {fleet.length > 0 && <a href="#collection">{m.subnav.collection}</a>}
            {credentials.length > 0 && <a href="#standards">{m.subnav.progress}</a>}
          </nav>
        </div>

        <section className={cx(s.section, s.story)} id="story" aria-labelledby="story-title">
          <div className={cx('container', s.storyGrid)}>
            <div className={s.storyCopy}>
              <Eyebrow>01 — {m.story.eyebrow}</Eyebrow>
              <h2 className={s.heading} id="story-title">
                {c.ecoDescription ?? <>{m.story.title} <em>{m.story.titleEm}</em></>}
              </h2>
              <p className={s.lead}>{m.story.lead}</p>
              {paragraphs(c.ecoContent).map((p) => <p key={p} className={s.description}>{p}</p>)}
              {fleet.length > 0 && <div className={s.storyLink}><TextLink href="#collection">{m.story.link}</TextLink></div>}
            </div>
            <div className={s.storyVisual}>
              <div className={s.storyMain}>
                {storyMain && <Image src={storyMain.src} alt={storyMain.alt ?? ''} fill sizes="(max-width: 900px) 90vw, 45vw" />}
                {storyMain?.alt && <span className={s.storyCaption}>{storyMain.alt}</span>}
              </div>
              <div className={s.storySecondary}>
                {storySecondary && <Image src={storySecondary.src} alt={storySecondary.alt ?? ''} fill sizes="(max-width: 900px) 45vw, 22vw" />}
              </div>
              <div className={s.stamp} aria-hidden="true">
                {m.story.stamp.map((line) => <span key={line}>{line}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className={s.statement} aria-label={m.statement.index}>
          <div className={cx('container', s.statementInner)}>
            <span className={s.statementIndex}>{m.statement.index}</span>
            <div>
              <blockquote>
                {m.statement.line1}
                <br />
                {m.statement.line2} <em>{m.statement.em}</em>
              </blockquote>
              <p className={s.statementFooter}>{m.statement.footer}</p>
            </div>
          </div>
        </section>

        {tech.length > 0 && (
          <section className={cx(s.section, s.technology)} id="sustainability" aria-labelledby="tech-title">
            <div className="container">
              <div className={s.sectionHeading}>
                <div>
                  <Eyebrow>02 — {m.technology.eyebrow}</Eyebrow>
                  <h2 className={s.heading} id="tech-title">{m.technology.title} <em>{m.technology.titleEm}</em></h2>
                </div>
                <p className={s.description}>{m.technology.body}</p>
              </div>
              <div className={s.techGrid}>
                {tech.slice(0, 2).map((item, i) => {
                  const body = honestDescription(locale, item.title, item.description);
                  return (
                    <article key={item.src + item.title} className={s.techCard}>
                      <div className={s.techPhoto}>
                        <Image src={item.src} alt={item.title ?? ''} fill sizes="(max-width: 690px) 100vw, 50vw" />
                        <span className={s.chip}>{pad(i + 1)} / {pad(tech.length)}</span>
                      </div>
                      <div className={s.techInfo}>
                        <span className={s.micro}>{m.technology.micro}</span>
                        {item.title && <h3>{item.title}</h3>}
                        {body && <p>{body}</p>}
                        <div className={s.techFoot}><Icon name="check" className={s.footIcon} /> <span>{m.technology.foot}</span></div>
                      </div>
                    </article>
                  );
                })}
              </div>
              {tech.length > 2 && (
                <div className={s.techSecondary}>
                  {tech.slice(2).map((item, i) => {
                    const body = honestDescription(locale, item.title, item.description);
                    return (
                      <article key={item.src + item.title} className={s.techText}>
                        <span className={s.techTextIcon}><Icon name={i % 2 === 0 ? 'sun' : 'leaf'} /></span>
                        <div>
                          <span className={s.micro}>{pad(i + 3)} / {pad(tech.length)}</span>
                          {item.title && <h3>{item.title}</h3>}
                          {body && <p>{body}</p>}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
              <p className={s.qualifier}>{m.technology.qualifier}</p>
            </div>
          </section>
        )}

        {stats.length > 0 && (
          <section className={s.impact} aria-labelledby="impact-title">
            <div className="container">
              <div className={s.impactTop}>
                <div>
                  <Eyebrow inverse>{m.impact.eyebrow}</Eyebrow>
                  <h2 className={s.heading} id="impact-title">{c.statisticTitle}</h2>
                </div>
                {c.statisticDescription && <p>{c.statisticDescription}</p>}
              </div>
              <dl className={s.impactGrid}>
                {stats.map((stat) => (
                  <div key={stat.label} className={s.impactItem}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}{stat.suffix}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {community.length > 0 && (
          <section className={cx(s.section, s.community)} id="community" aria-labelledby="community-title">
            <div className="container">
              <div className={s.sectionHeading}>
                <div>
                  <Eyebrow>03 — {m.community.eyebrow}</Eyebrow>
                  <h2 className={s.heading} id="community-title">
                    {c.enviromentTitle ?? <>{m.community.title} <em>{m.community.titleEm}</em></>}
                  </h2>
                </div>
                <p className={s.description}>{c.enviromentDescription?.replace(/\s*\n\s*/g, ' ') ?? m.community.body}</p>
              </div>
              <div className={s.communityGrid}>
                {community.map((item, i) => {
                  const body = honestDescription(locale, item.title, item.description);
                  const isText = i === 2 && community.length === 3;
                  return isText ? (
                    <article key={item.src + item.title} className={s.communityText}>
                      <span className={s.micro}>{pad(i + 1)} / {pad(community.length)}</span>
                      <Icon name="people" className={s.communityIcon} />
                      {item.title && <h3>{item.title}</h3>}
                      {body && <p>{body}</p>}
                      <TextLink href={contactUrl}>{m.community.link}</TextLink>
                    </article>
                  ) : (
                    <article key={item.src + item.title} className={s.communityCard}>
                      <div className={s.communityPhoto}>
                        <Image src={item.src} alt={item.title ?? ''} fill sizes="(max-width: 690px) 100vw, (max-width: 950px) 50vw, 33vw" />
                        <span className={s.chip}>{pad(i + 1)} / {pad(community.length)}</span>
                      </div>
                      <div className={s.communityBody}>
                        {item.title && <h3>{item.title}</h3>}
                        {body && <p>{body}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {fleet.length > 0 && (
          <section className={cx(s.section, s.collection)} id="collection" aria-labelledby="collection-title">
            <div className="container">
              <div className={s.sectionHeading}>
                <div>
                  <Eyebrow>04 — {m.collection.eyebrow}</Eyebrow>
                  <h2 className={s.heading} id="collection-title">{m.collection.title(fleet.length)} <em>{m.collection.titleEm}</em></h2>
                </div>
                <p className={s.description}>{m.collection.body}</p>
              </div>
              <div className={s.collectionGrid}>
                {fleet.map((cruise, i) => {
                  const url = detailPath(locale, 'cruise', cruise.slug, cruise.id);
                  const image = cruise.image ?? cruise.cover ?? null;
                  return (
                    <article key={cruise.id} className={s.vessel}>
                      <SmartLink href={url} className={s.vesselPhoto} aria-label={cruise.name}>
                        {image && <Image src={image} alt={cruise.name} fill sizes="(max-width: 690px) 100vw, 50vw" />}
                        <span className={s.vesselHeading}>{cruise.name}</span>
                      </SmartLink>
                      <div className={s.vesselBody}>
                        <span className={s.micro}>{m.collection.vessel(i + 1, cruise.bay ? t.home.bays[cruise.bay] : null)}</span>
                        {cruise.summary && <p>{cruise.summary}</p>}
                        <TextLink href={url}>{m.collection.explore(cruise.name)}</TextLink>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {credentials.length > 0 && (
          <section className={cx(s.section, s.standards)} id="standards" aria-labelledby="standards-title">
            <div className={cx('container', s.standardsLayout)}>
              <div>
                <Eyebrow>05 — {m.standards.eyebrow}</Eyebrow>
                <h2 className={s.heading} id="standards-title">{m.standards.title} <em>{m.standards.titleEm}</em></h2>
                <p className={s.description}>{c.partnerDescription ?? m.standards.body}</p>
              </div>
              <ul className={s.standardsList} aria-label={m.standards.label}>
                {credentials.map((cred) => {
                  const [name, status] = (cred.title ?? '').split(/\s+·\s+/);
                  return (
                    <li key={cred.title} className={s.standardRow}>
                      <div>
                        <h3>{name}</h3>
                        {cred.description && <p>{cred.description}</p>}
                      </div>
                      {status && <span className={s.badge}>{status}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        <section className={s.cta} aria-labelledby="cta-title">
          {ctaImage && <Image src={ctaImage} alt="" fill sizes="100vw" className={s.ctaImage} />}
          <div className={s.ctaInner}>
            <Eyebrow inverse>{m.cta.eyebrow}</Eyebrow>
            <h2 className={s.heading} id="cta-title">
              {c.readyToSailDescription ?? <>{m.cta.title}<br /><em>{m.cta.titleEm}</em></>}
            </h2>
            <p>{c.readyToSailContent ?? m.cta.body}</p>
            <div className={s.ctaActions}>
              <ButtonLink href={itineraryUrl}>{m.cta.primary}</ButtonLink>
              <ButtonLink href={contactUrl} variant="lightOutline">{m.cta.secondary}</ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: absoluteUrl(path),
          name: data.seo.title ?? m.metaTitle,
          ...(data.seo.description && { description: data.seo.description }),
          inLanguage: locale,
          ...(banner && { primaryImageOfPage: absoluteImageUrl(banner.src, 1200) }),
          ...(data.updatedAt && { dateModified: data.updatedAt }),
          mainEntity: {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: info.name,
            url: siteUrl,
            ...(site.config['website-description'] && { description: site.config['website-description'] }),
            ...(info.email && { email: info.email }),
            ...(info.hotline && { telephone: info.hotline }),
            ...(info.address && { address: info.address }),
            areaServed: ['Ha Long Bay', 'Lan Ha Bay'],
            ...(info.socials.length > 0 && { sameAs: info.socials.map((x) => x.url) }),
            ...(fleet.length > 0 && {
              owns: fleet.map((cruise) => ({ '@type': 'Product', name: cruise.name, url: absoluteUrl(detailPath(locale, 'cruise', cruise.slug, cruise.id)) })),
            }),
          },
        }}
      />
    </>
  );
}
