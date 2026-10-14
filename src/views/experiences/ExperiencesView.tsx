import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumb, SiteFooter, SiteNav, Topbar, type Chrome } from '@/components/layout';
import { FaqList } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import type { ExperienceList, ExperienceSummary } from './data';
import { ExperienceFilter } from './ExperienceFilter';
import type { ExperienceMessages } from './messages';
import { cardImage, experienceUrl, pad, tabLabel } from './shared';
import s from './experiences.module.css';

function Heading({ title, em, id, className }: { title: string; em: string; id: string; className?: string }) {
  return (
    <h2 className={cx(s.heading, className)} id={id}>
      {title} <em>{em}</em>
    </h2>
  );
}

function Intro({ eyebrow, children, body }: { eyebrow: string; children: ReactNode; body?: string }) {
  return (
    <div className={s.sectionIntro}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        {children}
      </div>
      {body && <p className={s.desc}>{body}</p>}
    </div>
  );
}

function ExperienceCard({
  item,
  number,
  total,
  chrome,
  m,
  sizes,
}: {
  item: ExperienceSummary;
  number: number;
  total: number;
  chrome: Chrome;
  m: ExperienceMessages;
  sizes: string;
}) {
  const url = experienceUrl(chrome.locale, item);
  const image = cardImage(item);
  return (
    <article className={s.card} data-tab={item.group?.tab ?? ''}>
      <SmartLink href={url} className={s.cardImage} aria-label={m.exploreAria(item.name)} tabIndex={-1}>
        {image && <Image src={image} alt={item.name} fill sizes={sizes} />}
        <span className={s.imageCorner} aria-hidden="true">↗</span>
      </SmartLink>
      <div className={s.cardBody}>
        <div className={s.cardTop}>
          <span>{tabLabel(m, item)}</span>
          <span>{pad(number)} / {pad(total)}</span>
        </div>
        <h3><SmartLink href={url}>{item.name}</SmartLink></h3>
        {item.summary && <p>{item.summary}</p>}
        <div className={s.cardBottom}>
          <span>{item.group?.name ?? item.notes[0] ?? ''}</span>
          <SmartLink href={url}>{m.viewExperience} <span aria-hidden="true">↗</span></SmartLink>
        </div>
      </div>
    </article>
  );
}

export function ExperiencesView({ list, chrome, m }: { list: ExperienceList; chrome: Chrome; m: ExperienceMessages }) {
  const { locale, t } = chrome;
  const { items, page } = list;
  const path = sectionPath(locale, 'experiences');
  const signature = (list.featured.length > 0 ? list.featured : items).slice(0, 3);
  const numberOf = (item: ExperienceSummary) => items.findIndex((i) => i.id === item.id) + 1 || 1;
  const photos = (page.gallery ?? []).filter((g) => g.type === 'image');
  const heroImage = photos[0]?.src ?? signature[0]?.cover ?? signature[0]?.image ?? null;
  const editorialImage = photos[1]?.src ?? items.find((i) => i.cover)?.cover ?? heroImage;
  const teaser = photos.slice(2, 5).length === 3 ? photos.slice(2, 5) : photos.slice(0, 3);
  const tabs = list.tabs.filter((tab) => items.some((i) => i.group?.tab === tab.key));

  return (
    <>
      <Topbar site={chrome.site} t={t} />
      <header className={s.hero}>
        <div className="container">
          <SiteNav {...chrome} currentHref={path} />
        </div>
        <div className={cx('container', s.heroMain)}>
          <div className={s.heroLeft}>
            <Breadcrumb items={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: m.breadcrumb, href: path }]} label={t.breadcrumb.label} />
            <Eyebrow inverse>{m.heroEyebrow}</Eyebrow>
            <h1 className={s.heroTitle}>
              {m.heroTitle} <em>{m.heroTitleEm}</em>
            </h1>
            <p className={s.heroBody}>{m.heroBody}</p>
            <div className={s.heroActions}>
              <ButtonLink href="#collection">{m.heroPrimary}</ButtonLink>
              <TextLink href="#rhythm" inverse>{m.heroSecondary}</TextLink>
            </div>
          </div>
          <div className={s.heroRight}>
            {heroImage && <Image src={heroImage} alt="" fill preload sizes="(max-width: 640px) 100vw, 52vw" quality={85} />}
            <span className={s.roundMark} aria-hidden="true">
              {m.heroMark.map((line) => <span key={line}>{line}</span>)}
            </span>
            <span className={s.imageLabel}>{t.topbar.location.replace(/, Vietnam$/i, '')}</span>
          </div>
        </div>
      </header>

      <main>
        <div className={s.strip}>
          <ul className={cx('container', s.stripInner)} aria-label={m.stripLabel}>
            <li className={s.stripItem}>
              <StripIcon d="M7 27l17-15 17 15M12 25v14h24V25M6 39h36M20 38V28h8v10" />
              <div><small>{m.strip.discover}</small><strong>{m.strip.discoverValue(items.length)}</strong></div>
            </li>
            <li className={s.stripItem}>
              <StripIcon d="M8 29c10 0 10-7 20-7s10 7 12 7M7 36c8 0 10-5 18-5s11 5 16 5M24 5v12M18 11l6 6 6-6" />
              <div><small>{m.strip.explore}</small><strong>{m.strip.exploreValue}</strong></div>
            </li>
            <li className={s.stripItem}>
              <StripIcon d="M24 7a17 17 0 1 0 0 34a17 17 0 1 0 0-34M24 13v11l8 5" />
              <div><small>{m.strip.philosophy}</small><strong>{m.strip.philosophyValue}</strong></div>
            </li>
          </ul>
        </div>

        {signature.length > 0 && (
          <section className={s.signature} id="signature" aria-labelledby="signature-title">
            <div className="container">
              <Intro eyebrow={m.signatureEyebrow} body={m.signatureBody}>
                <Heading id="signature-title" title={m.signatureTitle} em={m.signatureTitleEm} />
              </Intro>
              <div className={s.signatureGrid}>
                {signature.map((item) => (
                  <ExperienceCard
                    key={item.id}
                    item={item}
                    number={numberOf(item)}
                    total={items.length}
                    chrome={chrome}
                    m={m}
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <div className={s.quoteBreak}>
          <div className={cx('container')}>
            <figure className={s.quoteInner}>
              <blockquote>
                <p>“{m.quote} <em>{m.quoteEm}</em>”</p>
              </blockquote>
              <span className={s.asterisk} aria-hidden="true">✳</span>
            </figure>
          </div>
        </div>

        <section className={s.collection} id="collection" aria-labelledby="collection-title">
          <div className="container">
            <Intro eyebrow={m.collectionEyebrow} body={m.collectionBody}>
              <Heading id="collection-title" title={m.collectionTitle} em={m.collectionTitleEm} />
            </Intro>
            <ExperienceFilter
              label={m.filterLabel}
              exploreBy={m.exploreBy}
              allLabel={m.allExperiences}
              options={tabs.map((tab) => ({ value: tab.key, label: tab.name }))}
              showing={m.showing}
              of={m.of}
              showMore={m.showMore}
              showLess={m.showLess}
              limit={6}
              total={items.length}
            >
              {items.map((item, i) => (
                <ExperienceCard
                  key={item.id}
                  item={item}
                  number={i + 1}
                  total={items.length}
                  chrome={chrome}
                  m={m}
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              ))}
            </ExperienceFilter>
            <p className={s.footnote}>{m.footnote}</p>
          </div>
        </section>

        <section className={s.day} id="rhythm" aria-labelledby="rhythm-title">
          <div className="container">
            <Intro eyebrow={m.dayEyebrow} body={m.dayBody}>
              <Heading id="rhythm-title" title={m.dayTitle} em={m.dayTitleEm} />
            </Intro>
            <ol className={s.daySteps}>
              {m.daySteps.map((step, i) => (
                <li key={step.label} className={s.dayStep}>
                  <span className={s.dayCount} aria-hidden="true">{pad(i + 1)}.</span>
                  <small>{step.label}</small>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.editorial} aria-labelledby="editorial-title">
          <div className={cx('container', s.editorialGrid)}>
            <div className={s.editorialVisual}>
              {editorialImage && <Image src={editorialImage} alt="" fill sizes="(max-width: 640px) 100vw, 55vw" />}
            </div>
            <div className={s.editorialCopy}>
              <Eyebrow inverse>{m.editorialEyebrow}</Eyebrow>
              <Heading id="editorial-title" title={m.editorialTitle} em={m.editorialTitleEm} />
              <p>{m.editorialBody}</p>
              <TextLink href={sectionPath(locale, 'aboutUs')} inverse>{m.editorialLink}</TextLink>
            </div>
          </div>
        </section>

        {teaser.length > 0 && (
          <section className={s.galleryTeaser} aria-labelledby="journal-title">
            <div className="container">
              <div className={s.galleryHead}>
                <div>
                  <Eyebrow>{m.galleryEyebrow}</Eyebrow>
                  <Heading id="journal-title" title={m.galleryTitle} em={m.galleryTitleEm} />
                </div>
                <TextLink href={sectionPath(locale, 'gallery')}>{m.galleryLink}</TextLink>
              </div>
              <div className={s.galleryPhotos}>
                {teaser.map((photo, i) => (
                  <SmartLink key={photo.src} href={sectionPath(locale, 'gallery')} className={s.galleryCell}>
                    <Image src={photo.src} alt={photo.alt ?? m.galleryAlt(i + 1)} fill sizes="(max-width: 640px) 50vw, 33vw" />
                  </SmartLink>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={s.faq} aria-labelledby="faq-title">
          <div className={cx('container', s.faqInner)}>
            <div>
              <Eyebrow>{m.faqEyebrow}</Eyebrow>
              <Heading id="faq-title" title={m.faqTitle} em={m.faqTitleEm} />
              <p className={s.desc}>{m.faqBody}</p>
            </div>
            <FaqList items={m.faqs} />
          </div>
        </section>

        <section className={s.cta} aria-labelledby="cta-title">
          <div className={cx('container', s.ctaInner)}>
            <div>
              <Eyebrow inverse>{page.readyToSailDescription ?? m.ctaEyebrow}</Eyebrow>
              <h2 className={s.ctaHeading} id="cta-title">
                {m.ctaTitle}
                <br />
                <em>{m.ctaTitleEm}</em>
              </h2>
              <p>{page.readyToSailContent ?? m.ctaBody}</p>
            </div>
            <div className={s.ctaActions}>
              <ButtonLink href={sectionPath(locale, 'itinerary')}>{m.ctaPrimary}</ButtonLink>
              <ButtonLink href={sectionPath(locale, 'booking')} variant="lightOutline">{m.ctaSecondary}</ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${absoluteUrl(path)}#experiences`,
          name: list.seo.title ?? m.metaTitle,
          numberOfItems: items.length,
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(experienceUrl(locale, item)),
            name: item.name,
            ...(cardImage(item) && { image: absoluteImageUrl(cardImage(item) as string) }),
          })),
        }}
      />
    </>
  );
}

function StripIcon({ d }: { d: string }) {
  return (
    <svg className={s.stripIcon} viewBox="0 0 48 48" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} stroke="currentColor" />
    </svg>
  );
}
