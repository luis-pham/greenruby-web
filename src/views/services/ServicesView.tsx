import Image from 'next/image';
import type { ReactNode } from 'react';
import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { FaqList, type FaqItem } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import { detailPath, homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl, siteUrl } from '@/lib/site-url';
import type { ServicesPage } from './data';
import { servicesMessages } from './messages';
import { ServiceFilter } from './ServiceFilter';
import s from './services.module.css';

// CMS photography: the homepage banner (also used by the contact page) and the transfer service photo.
const HERO_IMAGE = '/upload/2026/03/13/banner-home.png';
const TRANSFER_IMAGE = '/upload/2026/03/12/limousine-bus-hanoi-halong-bay-5.jpg';

const pad = (n: number) => String(n).padStart(2, '0');

const ICONS: Record<string, ReactNode> = {
  transfer: <path d="M5 19 8 10h24l3 9v13H5V19Zm0 5h30M10 32v4h5v-4m12 0v4h5v-4M8 19h24m-22 8h4m12 0h4" />,
  flower: (
    <>
      <path d="M20 19c-6-10-14-2-6 4-10 1-8 13 2 10 1 10 13 8 12-2 10 5 15-6 5-10 7-8-4-14-9-5-2-10-14-8-11 3Z" />
      <circle cx="22" cy="23" r="4" />
      <path d="M21 37v3" />
    </>
  ),
  camera: (
    <>
      <path d="M6 13h7l3-4h9l3 4h6v21H6V13Z" />
      <circle cx="20" cy="24" r="7" />
      <path d="M27 17h2" />
    </>
  ),
  leaf: <path d="M35 6C17 7 8 15 8 27c0 7 5 11 11 11 12 0 17-13 16-32ZM11 35c5-10 11-16 22-24" />,
};

function Icon({ name }: { name: string }) {
  return (
    <svg width="42" height="42" viewBox="0 0 40 40" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function formatPrice(price: number, currency: 'USD' | 'VND', locale: string) {
  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);
}

export function ServicesView({ data, cmsFaqs, chrome }: { data: ServicesPage; cmsFaqs: FaqItem[]; chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const m = servicesMessages[locale];
  const info = siteInfo(site);
  const path = sectionPath(locale, 'services');
  const contactUrl = sectionPath(locale, 'contact');
  const itineraryUrl = sectionPath(locale, 'itinerary');
  const { page, items } = data;

  const groups = data.groups.filter((g) => items.some((it) => it.group?.id === g.id));
  const results = Object.fromEntries(Array.from({ length: items.length + 1 }, (_, n) => [n, m.collection.results(n)]));
  const enquireHref = (name: string) =>
    info.email ? `mailto:${info.email}?subject=${encodeURIComponent(m.collection.enquireSubject(name))}` : contactUrl;
  const transferImage = items.find((it) => /transport|di-chuyen/.test(it.group?.slug ?? ''))?.image ?? TRANSFER_IMAGE;

  const events = page.event ?? [];
  const weddingIcons = page.weddingIcon ?? [];
  const spaces = page.cabin ?? [];
  const hasWedding = Boolean(page.weddingDescription || page.weddingContent);
  const faqs: FaqItem[] = [...m.faq.items, ...cmsFaqs];

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={path}
        crumbs={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: m.breadcrumb, href: path }]}
        eyebrow={m.hero.eyebrow}
        title={<>{m.hero.title} <em>{m.hero.titleEm}</em></>}
        lead={m.hero.body}
        actions={
          <>
            <ButtonLink href="#collection">{m.hero.primary}</ButtonLink>
            <TextLink href={contactUrl}>{m.hero.secondary}</TextLink>
          </>
        }
      />

      <main>
        <div className={cx('container', s.overview)}>
          <ul className={s.overviewPanel} aria-label={m.overview.label}>
            {m.overview.items.map((item) => (
              <li key={item.label} className={s.overviewItem}>
                <Icon name={item.icon} />
                <div>
                  <span className={s.overviewLabel}>{item.label}</span>
                  <strong>{item.title}</strong>
                  <small>{item.caption}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <section className={s.collection} id="collection" aria-labelledby="collection-title">
          <div className="container">
            <div className={s.sectionHead}>
              <div>
                <Eyebrow>{m.collection.eyebrow}</Eyebrow>
                <h2 className={s.heading} id="collection-title">{m.collection.title} <em>{m.collection.titleEm}</em></h2>
              </div>
              <p className={s.desc}>{m.collection.body}</p>
            </div>
            {items.length > 0 ? (
              <ServiceFilter
                label={m.collection.filterLabel}
                allLabel={m.collection.all}
                groups={groups.map((g) => ({ value: g.slug, label: g.name }))}
                results={results}
                total={items.length}
              >
                {items.map((item, i) => {
                  const groupName = item.group?.name ?? m.collection.optional;
                  return (
                    <article key={item.id} className={s.card} data-group={item.group?.slug ?? ''}>
                      <div className={s.cardPhoto}>
                        {item.image && <Image src={item.image} alt={item.name} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />}
                        <span className={s.cardNumber}>{pad(i + 1)} / {pad(items.length)}</span>
                        <span className={s.cardLabel}>{groupName}</span>
                      </div>
                      <div className={s.cardBody}>
                        <div className={s.cardKind}>
                          <span>{groupName}</span>
                          <span className={s.cardBadge}>
                            {item.type === 'included' ? m.collection.included : item.price != null ? m.collection.price(formatPrice(item.price, data.currency, locale)) : m.collection.optional}
                          </span>
                        </div>
                        <h3>{item.name}</h3>
                        {item.description && <p>{item.description}</p>}
                        <a className={s.cardLink} href={enquireHref(item.name)}>
                          {m.collection.enquire}
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </article>
                  );
                })}
              </ServiceFilter>
            ) : (
              <p className={s.empty}>{m.collection.empty}</p>
            )}
            <p className={s.note}>{m.collection.note}</p>
          </div>
        </section>

        <section className={s.story} aria-labelledby="story-title">
          <div className={cx('container', s.storyGrid)}>
            <div className={s.storyImage}>
              <Image src={transferImage} alt="" fill sizes="(max-width: 600px) 100vw, 50vw" />
              <div className={s.stamp} aria-hidden="true">
                {m.story.stamp.map((line) => <span key={line}>{line}</span>)}
              </div>
            </div>
            <div className={s.storyCopy}>
              <Eyebrow>{m.story.eyebrow}</Eyebrow>
              <h2 className={s.heading} id="story-title">{m.story.title} <em>{m.story.titleEm}</em></h2>
              {m.story.paragraphs.map((p) => <p key={p} className={s.desc}>{p}</p>)}
              <ol className={s.points}>
                {m.story.points.map((point, i) => (
                  <li key={point}><b>{pad(i + 1)}</b><span>{point}</span></li>
                ))}
              </ol>
              <ButtonLink href={contactUrl} variant="dark" className={s.storyButton}>{m.story.cta}</ButtonLink>
            </div>
          </div>
        </section>

        <section className={s.inclusions} aria-labelledby="inclusions-title">
          <div className="container">
            <div className={s.inclusionHead}>
              <Eyebrow>{m.inclusions.eyebrow}</Eyebrow>
              <h2 className={s.heading} id="inclusions-title">{m.inclusions.title}<br /><em>{m.inclusions.titleEm}</em></h2>
              <p className={s.desc}>{m.inclusions.body}</p>
            </div>
            <div className={s.inclusionColumns}>
              {([m.inclusions.included, m.inclusions.optional] as const).map((col, i) => (
                <div key={col.label} className={cx(s.inclusionCard, i === 1 && s.inclusionOptional)}>
                  <span className={s.mini}>{col.label}</span>
                  <h3>{col.title[0]}<br />{col.title[1]}</h3>
                  <ul className={s.inclusionList}>
                    {col.items.map((row) => (
                      <li key={row}><span className={s.tick} aria-hidden="true">{i === 0 ? '✓' : '↗'}</span><span>{row}</span></li>
                    ))}
                  </ul>
                  <p className={s.inclusionFoot}>{col.foot}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {hasWedding && (
          <section className={s.wedding} id="weddings" aria-labelledby="wedding-title">
            <div className={cx('container', s.storyGrid, s.weddingGrid)}>
              <div className={s.storyCopy}>
                <Eyebrow>{page.weddingTitle ?? m.celebrations.eyebrow}</Eyebrow>
                {page.weddingDescription && <h2 className={s.heading} id="wedding-title">{page.weddingDescription}</h2>}
                {page.weddingContent && <p className={s.desc}>{page.weddingContent}</p>}
                {weddingIcons.length > 0 && (
                  <ul className={s.features}>
                    {weddingIcons.map((f) => (
                      <li key={f.src + f.title}>
                        <Image src={f.src} alt="" width={36} height={36} className={s.featureIcon} />
                        <div>
                          {f.title && <h3>{f.title}</h3>}
                          {f.description && <p>{f.description}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {page.weddingFeaturedImage && (
                <div className={cx(s.storyImage, s.weddingImage)}>
                  <Image src={page.weddingFeaturedImage} alt={page.weddingDescription ?? ''} fill sizes="(max-width: 600px) 100vw, 50vw" />
                </div>
              )}
            </div>
          </section>
        )}

        {(events.length > 0 || spaces.length > 0) && (
          <section className={s.events} id="events" aria-labelledby="events-title">
            <div className="container">
              <div className={s.sectionHead}>
                <div>
                  <Eyebrow inverse>{m.celebrations.eventsEyebrow}</Eyebrow>
                  <h2 className={s.heading} id="events-title">{m.celebrations.eventsTitle} <em>{m.celebrations.eventsTitleEm}</em></h2>
                </div>
                <div className={s.eventsIntro}>
                  {page.quoteRequestDescription && <h3>{page.quoteRequestDescription}</h3>}
                  {page.quoteRequestContent && <p>{page.quoteRequestContent}</p>}
                  <ButtonLink href={contactUrl}>{m.celebrations.proposal}</ButtonLink>
                </div>
              </div>
              {events.length > 0 && (
                <ul className={s.eventGrid}>
                  {events.map((ev, i) => (
                    <li key={ev.src + ev.title} className={s.eventCard}>
                      <span className={s.eventNumber}>{pad(i + 1)}</span>
                      <Image src={ev.src} alt="" width={40} height={40} className={s.eventIcon} />
                      {ev.title && <h3>{ev.title}</h3>}
                      {ev.description && <p>{ev.description}</p>}
                    </li>
                  ))}
                </ul>
              )}
              {spaces.length > 0 && (
                <>
                  <h3 className={s.spacesTitle}>{m.celebrations.spaces}</h3>
                  <div className={s.spaces}>
                    {spaces.map((cabin) => {
                      const url = detailPath(locale, 'cabin', cabin.slug, cabin.id);
                      const facts = [cabin.cruise?.name, cabin.area ? m.celebrations.area(cabin.area) : null, cabin.capacity ? m.celebrations.guests(cabin.capacity) : null].filter(Boolean);
                      return (
                        <article key={cabin.id} className={s.space}>
                          <SmartLink href={url} className={s.spacePhoto} aria-label={cabin.name}>
                            {cabin.image && <Image src={cabin.image} alt={cabin.name} fill sizes="(max-width: 600px) 100vw, 50vw" />}
                          </SmartLink>
                          <div className={s.spaceBody}>
                            <span className={s.mini}>{facts.join(' · ')}</span>
                            <h4><SmartLink href={url}>{cabin.name}</SmartLink></h4>
                            {cabin.summary && <p>{cabin.summary}</p>}
                            <TextLink href={url} inverse>{m.celebrations.viewSpace}</TextLink>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <section className={s.process} aria-labelledby="process-title">
          <div className="container">
            <div className={s.processHead}>
              <div>
                <Eyebrow>{m.process.eyebrow}</Eyebrow>
                <h2 className={s.heading} id="process-title">{m.process.title} <em>{m.process.titleEm}</em></h2>
              </div>
              <p className={s.desc}>{m.process.body}</p>
            </div>
            <ol className={s.processGrid}>
              {m.process.steps.map((step, i) => (
                <li key={step.tag} className={s.processStep}>
                  <span>{pad(i + 1)} / {step.tag}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.faq} id="questions" aria-labelledby="faq-title">
          <div className={cx('container', s.faqGrid)}>
            <div>
              <Eyebrow>{m.faq.eyebrow}</Eyebrow>
              <h2 className={s.heading} id="faq-title">{m.faq.title} <em>{m.faq.titleEm}</em></h2>
              <p className={s.desc}>{m.faq.body}</p>
              <TextLink href={sectionPath(locale, 'faq')}>{m.faq.link}</TextLink>
            </div>
            <FaqList items={faqs} />
          </div>
        </section>

        <section className={s.cta} aria-labelledby="cta-title">
          <Image src={HERO_IMAGE} alt="" fill sizes="100vw" className={s.ctaImage} />
          <div className={cx('container', s.ctaInner)}>
            <Eyebrow inverse>{m.cta.eyebrow}</Eyebrow>
            <h2 id="cta-title">
              {page.readyToSailDescription ?? <>{m.cta.title} <em>{m.cta.titleEm}</em></>}
            </h2>
            <p>{page.readyToSailContent ?? m.cta.body}</p>
            <div className={s.ctaLinks}>
              <ButtonLink href={contactUrl}>{m.cta.primary}</ButtonLink>
              <TextLink href={itineraryUrl} inverse>{m.cta.secondary}</TextLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: data.seo.title ?? m.metaTitle,
          url: absoluteUrl(path),
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: item.name,
              ...(item.description && { description: item.description }),
              ...(item.image && { image: absoluteImageUrl(item.image, 1200) }),
              ...(item.group && { category: item.group.name }),
              areaServed: 'Ha Long Bay, Vietnam',
              provider: { '@type': 'TravelAgency', name: info.name, url: siteUrl },
              ...(item.price != null && {
                offers: { '@type': 'Offer', price: item.price, priceCurrency: data.currency },
              }),
            },
          })),
        }}
      />
    </>
  );
}
