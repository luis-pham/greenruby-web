import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumb, SiteFooter, SiteNav, Topbar, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import type { Experience, ExperienceList, ExperienceSummary } from './data';
import type { ExperienceMessages } from './messages';
import { PhotoJournal, type Photo } from './PhotoJournal';
import { SectionNav } from './SectionNav';
import { cardImage, durationMinutes, experienceUrl, pad, tabLabel, timeRange } from './shared';
import s from './experience.module.css';

const plain = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function Heading({ title, em, id }: { title: string; em: string; id: string }) {
  return (
    <h2 className={s.heading} id={id}>
      {title} <em>{em}</em>
    </h2>
  );
}

function MetaIcon({ children }: { children: ReactNode }) {
  return (
    <svg className={s.metaIcon} viewBox="0 0 40 40" aria-hidden="true">
      {children}
    </svg>
  );
}

export function ExperienceView({
  experience: x,
  more,
  page,
  chrome,
  m,
}: {
  experience: Experience;
  /** Up to three other experiences (CMS "related" first, then the rest of the list). */
  more: ExperienceSummary[];
  page: ExperienceList['page'];
  chrome: Chrome;
  m: ExperienceMessages;
}) {
  const { locale, t } = chrome;
  const url = experienceUrl(locale, x);
  const listUrl = sectionPath(locale, 'experiences');
  const itinerariesUrl = sectionPath(locale, 'itinerary');
  const bookingUrl = sectionPath(locale, 'booking');
  const tab = x.group?.tab ?? null;
  const minutes = durationMinutes(x);
  const range = timeRange(x);
  const audiences = x.suitableFor.map((a) => a.name);

  const galleryPhotos = x.gallery.filter((g) => g.type === 'image').map((g) => ({ src: g.src, alt: g.alt ?? x.name }));
  const fallbackPhotos = [...new Set([x.cover, x.image].filter((src): src is string => !!src))].map((src) => ({ src, alt: x.name }));
  const sources = galleryPhotos.length > 0 ? galleryPhotos : fallbackPhotos;
  const photos: Photo[] = sources.map((p, i) => ({
    src: p.src,
    alt: p.alt,
    kicker: `${pad(i + 1)} / ${x.group?.name ?? tabLabel(m, x)}`,
    title: p.alt,
  }));
  const heroImage = x.cover ?? x.image ?? sources[0]?.src ?? null;
  const primaryPhoto = x.image ?? sources[0]?.src ?? x.cover;
  const miniPhoto = [x.cover, ...sources.map((p) => p.src)].find((src) => src && src !== primaryPhoto) ?? null;

  // contentHtml is often just the summary or the name again; only show it when it adds something.
  const content = x.contentHtml && plain(x.contentHtml);
  const showContent = !!content && content !== x.summary && content.toLowerCase() !== x.name.toLowerCase();

  const meta = [
    minutes && {
      label: m.meta.duration,
      value: m.minutes(minutes),
      note: m.meta.durationNote,
      icon: <><circle cx="20" cy="20" r="14" /><path d="M20 11v10l6 4" /></>,
    },
    range && {
      label: m.meta.time,
      value: range,
      note: m.meta.timeNote,
      icon: <><circle cx="20" cy="20" r="7" /><path d="M20 4v6m0 20v6M4 20h6m20 0h6M9 9l4 4m14 14 4 4M31 9l-4 4M13 27l-4 4" /></>,
    },
    (x.notes.length > 0 || x.group) && {
      label: m.meta.style,
      value: x.notes.length > 0 ? x.notes.join(', ') : (x.group?.name ?? ''),
      note: x.notes.length > 0 ? x.group?.name : undefined,
      icon: <path d="M3 23c5 0 5-5 10-5s5 5 10 5 5-5 10-5h4M3 30c5 0 5-5 10-5s5 5 10 5 5-5 10-5h4" />,
    },
    audiences.length > 0
      ? {
          label: m.meta.suitable,
          value: audiences.join(', '),
          note: undefined,
          icon: <><circle cx="15" cy="13" r="5" /><path d="M4 32v-3c0-5 5-9 11-9s11 4 11 9v3M28 10c6 0 7 9 1 11M28 23c6 0 9 4 9 8v1" /></>,
        }
      : {
          label: m.meta.availableOn,
          value: x.cruise?.name ?? m.meta.everyShip,
          note: undefined,
          icon: <><path d="M6 23h28l-5 10H11L6 23ZM20 23V5M20 7l10 12H20" /><path d="M5 36c6-3 7 3 15 0s9 3 15 0" /></>,
        },
  ].filter((item) => !!item);

  const sections = [
    { id: 'discover', label: m.sections.overview },
    { id: 'experience', label: m.sections.moment },
    ...(photos.length > 0 ? [{ id: 'photos', label: m.sections.photos }] : []),
    { id: 'participation', label: m.sections.good },
    ...(more.length > 0 ? [{ id: 'more', label: m.sections.more }] : []),
  ];

  const panel = [
    range || minutes
      ? { title: m.panel.timing, body: m.panel.timingBody(range, minutes ? m.minutes(minutes) : null) }
      : { title: m.panel.confirm, body: m.panel.confirmBody },
    ...(x.notes.length > 0 ? [{ title: m.panel.expect, body: x.notes.join(' · ') }] : []),
    { title: m.panel.guidance, body: m.panel.guidanceBody },
    { title: m.panel.conditions, body: m.panel.conditionsBody },
  ];

  const stepIcons = [
    <path key="1" d="M6 23h28l-5 10H11L6 23ZM20 23V5M20 7l10 12H20M5 36c6-3 7 3 15 0s9 3 15 0" />,
    <path key="2" d="M3 23c5 0 5-5 10-5s5 5 10 5 5-5 10-5h4M3 30c5 0 5-5 10-5s5 5 10 5 5-5 10-5h4" />,
    <path key="3" d="M20 13a7 7 0 1 0 0 14a7 7 0 1 0 0-14M20 2v7m0 22v7M2 20h7m22 0h7M7 7l5 5m16 16 5 5M33 7l-5 5M12 28l-5 5" />,
  ];

  return (
    <>
      <Topbar site={chrome.site} t={t} />
      <header className={s.hero}>
        {heroImage && <Image src={heroImage} alt={x.name} fill preload sizes="100vw" quality={85} className={s.heroImage} />}
        <div className="container">
          <SiteNav {...chrome} currentHref={listUrl} />
          <div className={s.heroBody}>
            <div className={s.heroCopy}>
              <Breadcrumb
                items={[
                  { label: t.breadcrumb.home, href: homePath(locale) },
                  { label: m.breadcrumb, href: listUrl },
                  { label: x.name, href: url },
                ]}
                label={t.breadcrumb.label}
              />
              <Eyebrow inverse>{tab ? m.kicker[tab] : m.kickerFallback}</Eyebrow>
              <h1 className={cx(s.heroTitle, x.name.length > 16 && s.heroTitleLong)}>
                {x.name}
                <em>.</em>
              </h1>
              {x.summary && <p className={s.heroDesc}>{x.summary}</p>}
              <div className={s.heroActions}>
                <ButtonLink href="#discover">{m.detailPrimary}</ButtonLink>
                <TextLink href={itinerariesUrl} inverse>{m.detailSecondary}</TextLink>
              </div>
            </div>
            <span className={s.sideNote} aria-hidden="true">{t.topbar.location}</span>
          </div>
        </div>
      </header>

      <div className={s.meta}>
        <div className="container">
          <ul className={s.metaGrid} aria-label={m.metaLabel(x.name)} style={{ ['--cols' as string]: meta.length }}>
            {meta.map((item) => (
              <li key={item.label} className={s.metaItem}>
                <MetaIcon>{item.icon}</MetaIcon>
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  {item.note && <small>{item.note}</small>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav className={s.subnav} aria-label={m.subnavLabel}>
        <div className={cx('container', s.subnavInner)}>
          <SectionNav links={sections} />
          <SmartLink className={s.subnavCta} href={bookingUrl}>
            {m.planVoyage} <span aria-hidden="true">↗</span>
          </SmartLink>
        </div>
      </nav>

      <main>
        <section className={s.section} id="discover" aria-labelledby="discover-title">
          <div className={cx('container', s.intro)}>
            <div className={s.introCopy}>
              <Eyebrow>{tab ? m.introEyebrow[tab] : m.introEyebrow.onboard}</Eyebrow>
              <Heading id="discover-title" title={m.introTitle[tab ?? 'onboard']} em={m.introTitleEm[tab ?? 'onboard']} />
              {x.summary && <p className={s.lead}>{x.summary}</p>}
              {showContent && <div className={s.prose} dangerouslySetInnerHTML={{ __html: x.contentHtml as string }} />}
              <figure className={s.quote}>
                <span className={s.quoteMark} aria-hidden="true">“</span>
                <blockquote>{m.introQuote}</blockquote>
              </figure>
              {photos.length > 0 && (
                <div className={s.introLink}>
                  <TextLink href="#photos">{m.photoLink}</TextLink>
                </div>
              )}
            </div>
            {primaryPhoto && (
              <div className={s.introVisual}>
                <div className={s.primaryPhoto}>
                  <Image src={primaryPhoto} alt={x.name} fill sizes="(max-width: 850px) 100vw, 50vw" />
                  {x.group && <span className={s.pictureCaption}>{x.group.name}</span>}
                </div>
                {miniPhoto && (
                  <div className={s.miniPhoto}>
                    <Image src={miniPhoto} alt="" fill sizes="(max-width: 850px) 45vw, 25vw" />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className={cx(s.section, s.steps)} id="experience" aria-labelledby="experience-title">
          <div className="container">
            <div className={s.sectionTop}>
              <div>
                <Eyebrow>{m.momentEyebrow}</Eyebrow>
                <Heading id="experience-title" title={m.momentTitle} em={m.momentTitleEm} />
              </div>
              <p>{m.momentBody}</p>
            </div>
            <ol className={s.stepGrid}>
              {m.steps.map((step, i) => (
                <li key={step.title} className={s.step}>
                  <span className={s.stepNum}>{pad(i + 1)}</span>
                  <svg className={s.stepIcon} viewBox="0 0 40 40" aria-hidden="true">{stepIcons[i]}</svg>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {photos.length > 0 && (
          <section className={s.gallery} id="photos" aria-labelledby="photos-title">
            <div className="container">
              <div className={s.sectionTop}>
                <div>
                  <Eyebrow inverse>{m.photosEyebrow}</Eyebrow>
                  <Heading id="photos-title" title={m.photosTitle} em={m.photosTitleEm} />
                </div>
                <p>{m.photosBody}</p>
              </div>
              <PhotoJournal
                photos={photos}
                label={m.lightbox.label(x.name)}
                openLabel={photos.map((_, i) => m.openPhoto(i + 1))}
                closeLabel={m.lightbox.close}
                previousLabel={m.lightbox.previous}
                nextLabel={m.lightbox.next}
              />
              <p className={s.galleryNote}>{m.photosNote}</p>
            </div>
          </section>
        )}

        <section className={cx(s.section, s.practical)} id="participation" aria-labelledby="participation-title">
          <div className={cx('container', s.practicalGrid)}>
            <div>
              <Eyebrow>{m.goodEyebrow}</Eyebrow>
              <Heading id="participation-title" title={m.goodTitle} em={m.goodTitleEm} />
              <p className={s.desc}>{m.goodBody(audiences)}</p>
              {audiences.length > 0 && (
                <ul className={s.guestTags}>
                  {audiences.map((a) => <li key={a}>{a}</li>)}
                </ul>
              )}
              <TextLink href={itinerariesUrl}>{m.goodLink}</TextLink>
            </div>
            <div className={s.panel}>
              <h3>{m.panelTitle}</h3>
              <ul>
                {panel.map((item) => (
                  <li key={item.title}>
                    <span className={s.tick} aria-hidden="true">↗</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className={s.panelNote}>{m.panelNote}</p>
            </div>
          </div>
        </section>

        {more.length > 0 && (
          <section className={s.related} id="more" aria-labelledby="more-title">
            <div className="container">
              <div className={s.sectionTop}>
                <div>
                  <Eyebrow>{m.moreEyebrow}</Eyebrow>
                  <Heading id="more-title" title={m.moreTitle} em={m.moreTitleEm} />
                </div>
                <TextLink href={listUrl}>{m.allExperiences}</TextLink>
              </div>
              <div className={s.relatedGrid}>
                {more.map((item) => {
                  const image = cardImage(item);
                  return (
                    <article key={item.id} className={s.relatedCard}>
                      <div className={s.relatedImg}>
                        {image && <Image src={image} alt={item.name} fill sizes="(max-width: 600px) 100vw, 33vw" />}
                      </div>
                      <div className={s.relatedBody}>
                        <small>{tabLabel(m, item)}</small>
                        <h3><SmartLink href={experienceUrl(locale, item)} className={s.relatedLink}>{item.name}</SmartLink></h3>
                        {item.summary && <p>{item.summary}</p>}
                        <span className={s.relatedMore} aria-hidden="true">{m.exploreExperience} <span>↗</span></span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className={s.cta} aria-labelledby="cta-title">
          <div className={cx('container', s.ctaInner)}>
            <div>
              <Eyebrow inverse>{page.readyToSailDescription ?? m.detailCtaEyebrow}</Eyebrow>
              <h2 className={s.ctaHeading} id="cta-title">
                {m.detailCtaTitle} <em>{m.detailCtaTitleEm}</em>
              </h2>
              <p>{page.readyToSailContent ?? m.detailCtaBody}</p>
            </div>
            <div className={s.ctaActions}>
              <ButtonLink href={itinerariesUrl}>{m.ctaPrimary}</ButtonLink>
              <ButtonLink href={bookingUrl} variant="lightOutline">{m.ctaSecondary}</ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TouristAttraction',
          '@id': absoluteUrl(url),
          url: absoluteUrl(url),
          name: x.name,
          description: x.seo.description ?? x.summary ?? undefined,
          image: [heroImage, ...photos.map((p) => p.src)].filter((src, i, all): src is string => !!src && all.indexOf(src) === i).map((src) => absoluteImageUrl(src)),
          ...(audiences.length > 0 && { touristType: audiences }),
          ...(x.group && { keywords: [x.group.name, ...x.notes].join(', ') }),
          containedInPlace: { '@type': 'Place', name: t.topbar.location },
        }}
      />
    </>
  );
}
