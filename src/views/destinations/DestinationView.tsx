import Image from 'next/image';
import Link from 'next/link';
import { PageHero, PageIntro, SiteFooter, type Chrome, type Crumb } from '@/components/layout';
import { FaqList } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, TextLink } from '@/components/ui';
import { destinationPath, experiencePath, homePath, itineraryPath, sectionPath } from '@/lib/i18n';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import type { Destination } from './data';
import { mapsLink } from './map';
import { destinationMessages } from './messages';
import s from './destinations.module.css';
import prose from '@/views/blog/article.module.css';

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}

/** /destinations/{slug}: one destination, its facts, Green Ruby plan, FAQs, sources and related places. */
export function DestinationView({ chrome, destination: d }: { chrome: Chrome; destination: Destination }) {
  const { locale, t } = chrome;
  const m = destinationMessages[locale];
  const path = destinationPath(locale, d.slug);
  const hub = sectionPath(locale, 'destinations');
  const crumbs: Crumb[] = [
    { label: t.breadcrumb.home, href: homePath(locale) },
    { label: m.breadcrumbGuide, href: sectionPath(locale, 'guides') },
    { label: m.breadcrumb, href: hub },
    { label: d.name, href: path },
  ];
  const eyebrow = `${m.bays[d.bay]} · ${m.category[d.category]}`;
  const firstItinerary = d.itineraries[0];
  const heading = d.heading || d.name;

  return (
    <>
      {d.image ? (
        <PageHero chrome={chrome} currentHref={path} image={d.image.src} imageAlt={d.image.alt} crumbs={crumbs} eyebrow={eyebrow} title={heading} description={d.summary ?? undefined} compact />
      ) : (
        <PageIntro chrome={chrome} currentHref={path} crumbs={crumbs} eyebrow={eyebrow} title={heading} lead={d.summary ?? undefined} />
      )}

      <main>
        <div className={`container ${s.detail}`}>
          <article className={s.detailMain}>
            <p className={s.detailBadges}>
              <span className={s.cardStop} data-stop={d.isGreenRubyStop || undefined} data-inline>
                {d.isGreenRubyStop ? m.stop : m.regional}
              </span>
            </p>
            {d.contentHtml && <div className={`${prose.prose} ${s.prose}`} dangerouslySetInnerHTML={{ __html: d.contentHtml }} />}

            {d.faq.length > 0 && (
              <section className={s.detailBlock} aria-labelledby="faq-title">
                <h2 id="faq-title">{m.detail.faq}</h2>
                <FaqList items={d.faq.map((f) => ({ question: f.question, answerHtml: `<p>${escapeHtml(f.answer)}</p>` }))} />
              </section>
            )}

            {(d.sources.length > 0 || d.image?.credit || d.factCheckedAt) && (
              <section className={s.sources} aria-labelledby="sources-title">
                <h2 id="sources-title">{m.detail.sources}</h2>
                {d.sources.length > 0 && (
                  <ul>
                    {d.sources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noopener">{source.title}</a>
                      </li>
                    ))}
                  </ul>
                )}
                {d.image?.credit && (
                  <p>
                    {m.detail.photo}: {d.image.credit.replace(/^(Photo|Ảnh):\s*/i, '')}
                  </p>
                )}
                {d.factCheckedAt && (
                  <p>
                    {m.detail.checked}: <time dateTime={d.factCheckedAt}>{formatDate(d.factCheckedAt, locale)}</time>
                  </p>
                )}
              </section>
            )}
          </article>

          <aside className={s.detailSide}>
            {d.facts.length > 0 && (
              <section className={s.sideCard} aria-labelledby="facts-title">
                <h2 id="facts-title">{m.detail.facts}</h2>
                <dl className={s.facts}>
                  {d.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                {d.coordinates && (
                  <a className={s.mapsLink} href={mapsLink(d.coordinates)} target="_blank" rel="noopener">
                    {m.detail.mapsLink} ↗︎
                  </a>
                )}
              </section>
            )}

            <section className={`${s.sideCard} ${s.sidePlan}`} aria-labelledby="plan-title">
              <h2 id="plan-title">{m.detail.plan}</h2>
              {d.itineraries.length > 0 ? (
                <>
                  <ul className={s.planList}>
                    {d.itineraries.map((it) => (
                      <li key={it.itineraryId}>
                        <Link href={itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId)}>
                          <strong>{it.name}</strong>
                          <span>
                            {it.cruiseName} · {m.itineraries.days(it.duration)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className={s.sideNote}>{m.detail.planNote}</p>
                </>
              ) : (
                <p className={s.sideNote}>{m.detail.planNone}</p>
              )}
            </section>

            {d.experiences.length > 0 && (
              <section className={s.sideCard} aria-labelledby="experiences-title">
                <h2 id="experiences-title">{t.travel.destinationExperiencesTitle}</h2>
                <ul className={s.planList}>
                  {d.experiences.map((x) => (
                    <li key={x.id}>
                      <Link href={experiencePath(locale, x.slug, x.id)}>
                        <strong>{x.name}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {d.related.length > 0 && (
          <section className={`${s.section} ${s.sectionTinted}`} aria-labelledby="related-title">
            <div className="container">
              <div className={s.sectionHead}>
                <h2 id="related-title">{m.detail.related}</h2>
                <TextLink href={hub}>{m.detail.back}</TextLink>
              </div>
              <ul className={s.cards}>
                {d.related.map((r) => (
                  <li key={r.slug}>
                    <article className={s.card}>
                      <div className={s.cardPhoto}>
                        {r.image ? (
                          <Image src={r.image.src} alt={r.image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px" quality={75} />
                        ) : (
                          <span className={s.cardNoPhoto} aria-hidden="true">{r.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className={s.cardBody}>
                        <p className={s.cardMeta}>
                          {m.bays[r.bay]} · {m.category[r.category]}
                        </p>
                        <h3>
                          <Link href={destinationPath(locale, r.slug)} className={s.cardLink}>{r.name}</Link>
                        </h3>
                        {r.summary && <p className={s.cardSummary}>{r.summary}</p>}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {firstItinerary && (
          <section className={s.cta} aria-labelledby="cta-title">
            <div className="container">
              <div>
                <h2 id="cta-title">{m.detail.ctaTitle}</h2>
                <p>{m.detail.ctaBody}</p>
              </div>
              <ButtonLink className={s.ctaButton} href={itineraryPath(locale, firstItinerary.slug, firstItinerary.cruiseId, firstItinerary.itineraryId)}>{firstItinerary.name}</ButtonLink>
            </div>
          </section>
        )}
      </main>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TouristAttraction',
          '@id': `${absoluteUrl(path)}#place`,
          name: d.name,
          description: d.summary ?? undefined,
          url: absoluteUrl(path),
          ...(d.image && { image: absoluteImageUrl(d.image.src, 1200) }),
          ...(d.coordinates && { geo: { '@type': 'GeoCoordinates', latitude: d.coordinates.lat, longitude: d.coordinates.lng } }),
          containedInPlace: { '@type': 'Place', name: m.bays[d.bay] },
        }}
      />
      <SiteFooter locale={locale} site={chrome.site} t={t} />
    </>
  );
}
