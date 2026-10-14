import Image from 'next/image';
import type { ReactNode } from 'react';
import { SiteFooter, SiteNav, Topbar, type Chrome } from '@/components/layout';
import { FaqList, faqPageSchema } from '@/components/sections/Faq';
import { organizationSchema } from '@/lib/organization';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import type { Homepage } from '@/lib/api/schemas';
import { detailPath, experiencePath, homePath, itineraryPath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl, siteUrl } from '@/lib/site-url';
import { cabinPath } from '@/views/cabin/CabinView';
import { Carousel } from './Carousel';
import { JourneyTabs } from './JourneyTabs';
import s from './home.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

function Heading({ title, em, id, className }: { title: string; em: string; id?: string; className?: string }) {
  return (
    <h2 className={cx(s.heading, className)} id={id}>
      {title} <em>{em}</em>
    </h2>
  );
}

function Head({ eyebrow, title, body, inverse, id }: { eyebrow: string; title: ReactNode; body?: string; inverse?: boolean; id?: string }) {
  return (
    <div className={s.head} id={id}>
      <div>
        <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
        {title}
      </div>
      {body && <p>{body}</p>}
    </div>
  );
}

export function HomeView({ page, chrome }: { page: Homepage; chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const h = t.home;
  const info = siteInfo(site);
  const heroImage = page.banner[0]?.image ?? page.cruises[0]?.cover ?? null;
  const quoteImage = page.banner[1]?.image ?? heroImage;
  const bays = [...new Set(page.itineraries.map((i) => i.bay).filter((b): b is 'ha-long' | 'lan-ha' => b !== null))];
  const durations = [...new Set(page.itineraries.map((i) => i.duration))].sort((a, b) => a - b);
  const largestSuite = Math.max(0, ...page.cabins.map((c) => c.area ?? 0));
  const bayOfCruise = (cruiseId: number) => page.itineraries.find((i) => i.cruiseId === cruiseId)?.bay ?? null;
  const firstItineraryOfCruise = (cruiseId: number) => page.itineraries.find((i) => i.cruiseId === cruiseId);
  const experiences = page.experiences.slice(0, 3);
  const experienceVerbs = locale === 'vi' ? ['Khám phá', 'Thưởng thức', 'Thư thái'] : ['Discover', 'Savour', 'Restore'];

  return (
    <>
      <Topbar site={site} t={t} />
      <header className={s.hero}>
        {heroImage && <Image src={heroImage} alt="" fill preload sizes="100vw" quality={80} className={s.heroImage} />}
        <div className="container">
          <SiteNav {...chrome} currentHref={homePath(locale)} />
          <div className={s.heroCopy}>
            {/* The keyword line is the H1 (as on the Laravel site); the tagline below is display copy. */}
            <h1 className={s.heroH1}>
              <Eyebrow inverse>{h.heroEyebrow}</Eyebrow>
            </h1>
            <p className={s.heroTitle}>
              {h.heroTitle} <em>{h.heroTitleEm}</em>
            </p>
            <p className={s.heroBody}>{h.heroBody}</p>
            <div className={s.heroCtas}>
              <ButtonLink href="#journeys">{h.heroPrimary}</ButtonLink>
              <TextLink href="#fleet" inverse>{h.heroSecondary}</TextLink>
            </div>
          </div>
        </div>
        <p className={s.heroCounter} aria-hidden="true">
          <span>01</span>
          <span>{h.heroCounter}</span>
        </p>
        <div className={s.glance}>
          <div className="container">
            <dl className={s.glanceGrid} aria-label={h.glanceLabel}>
              <div className={s.glanceCell}>
                <dt>{h.glance.fleet}</dt>
                <dd>
                  <strong className={s.glanceTitle}>{h.glance.fleetTitle(page.cruises.length)}</strong>
                  <span className={s.glanceDetail}>{page.cruises.map((c) => c.name).join(' & ')}</span>
                </dd>
              </div>
              <div className={s.glanceCell}>
                <dt>{h.glance.destinations}</dt>
                <dd>
                  <strong className={s.glanceTitle}>{h.glance.destinationsTitle(bays.length)}</strong>
                  <span className={s.glanceDetail}>{bays.map((b) => h.bays[b]).join(' & ')}</span>
                </dd>
              </div>
              <div className={s.glanceCell}>
                <dt>{h.glance.journeys}</dt>
                <dd>
                  <strong className={s.glanceTitle}>{h.glance.journeysTitle(page.itineraries.length)}</strong>
                  <span className={s.glanceDetail}>{durations.map((d) => h.duration(d)).join(' / ')}</span>
                </dd>
              </div>
              <div className={s.glanceCell}>
                <dt>{h.glance.commitment}</dt>
                <dd>
                  <strong className={s.glanceTitle}>{h.glance.commitmentTitle}</strong>
                  <span className={s.glanceDetail}>{h.glance.commitmentDetail}</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <main>
        {page.cruises.length > 0 && (
          <section className={s.fleet} id="fleet" aria-labelledby="fleet-title">
            <div className="container">
              <div className={s.fleetIntro}>
                <div>
                  <Eyebrow>{h.fleetEyebrow}</Eyebrow>
                  <Heading id="fleet-title" title={h.fleetTitle} em={h.fleetTitleEm} />
                </div>
                <div>
                  <p>{h.fleetBody}</p>
                  <p className={s.collectionMark} aria-hidden="true">
                    {page.cruises.map((_, i) => pad(i + 1)).join(' ')} <i /> <small>{h.fleetCollection}</small>
                  </p>
                </div>
              </div>
              <div className={s.fleetGrid}>
                {page.cruises.map((cruise, i) => {
                  const url = detailPath(locale, 'cruise', cruise.slug, cruise.id);
                  const bay = bayOfCruise(cruise.id);
                  const journey = firstItineraryOfCruise(cruise.id);
                  return (
                    <article key={cruise.id} className={s.fleetCard}>
                      <SmartLink href={url} className={s.fleetVisual}>
                        {(cruise.image ?? cruise.cover) && (
                          <Image src={(cruise.image ?? cruise.cover) as string} alt={cruise.name} fill sizes="(max-width: 900px) 100vw, 50vw" />
                        )}
                        <span className={s.fleetPhotoTop}>
                          <span>{h.vessel(i + 1)}</span>
                          {bay && <span>{h.bays[bay]}</span>}
                        </span>
                        <span className={s.fleetPhotoBottom}>
                          <strong>{cruise.name}</strong>
                          <span className={s.fleetPhotoIcon} aria-hidden="true">↗</span>
                        </span>
                      </SmartLink>
                      <div className={s.fleetBody}>
                        {bay && <span className={s.fleetCategory}>{h.bays[bay]}</span>}
                        <h3>{cruise.name}</h3>
                        {cruise.summary && <p>{cruise.summary}</p>}
                        <dl className={s.fleetSpecs}>
                          {cruise.length != null && (
                            <div><dt>{h.vesselLength}</dt><dd>{cruise.length}<small> m</small></dd></div>
                          )}
                          {cruise.capacity != null && (
                            <div><dt>{h.guestCapacity}</dt><dd>{cruise.capacity}</dd></div>
                          )}
                          {cruise.starRating != null && (
                            <div><dt>★</dt><dd>{cruise.starRating}</dd></div>
                          )}
                        </dl>
                        <div className={s.fleetActions}>
                          <ButtonLink href={url} variant="dark">{h.explore(cruise.name)}</ButtonLink>
                          {journey && bay && (
                            <TextLink href={itineraryPath(locale, journey.slug, journey.cruiseId, journey.itineraryId)}>
                              {h.bayJourneys(h.bays[bay])}
                            </TextLink>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className={s.story} id="story" aria-labelledby="story-title">
          <div className={cx('container', s.storyGrid)}>
            <div className={s.storyCopy}>
              <Eyebrow>{page.slogan ?? h.storyEyebrow}</Eyebrow>
              <Heading id="story-title" title={h.storyTitle} em={h.storyTitleEm} />
              {h.storyBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className={s.storyLink}><TextLink href={sectionPath(locale, 'aboutUs')}>{h.storyLink}</TextLink></div>
              <dl className={s.facts}>
                <div><dt>{h.facts.vessels}</dt><dd>{pad(page.cruises.length)}</dd></div>
                <div><dt>{h.facts.bays}</dt><dd>{pad(bays.length)}</dd></div>
                {largestSuite > 0 && <div><dt>{h.facts.suite}</dt><dd>{largestSuite} m²</dd></div>}
              </dl>
            </div>
            <div className={s.storyVisual}>
              {page.cabins[0]?.image && (
                <div className={s.photoMain}><Image src={page.cabins[0].image} alt={page.cabins[0].name} fill sizes="(max-width: 900px) 90vw, 45vw" /></div>
              )}
              {page.cruises[0]?.image && (
                <div className={s.photoSecondary}><Image src={page.cruises[0].image} alt={page.cruises[0].name} fill sizes="(max-width: 900px) 45vw, 22vw" /></div>
              )}
            </div>
          </div>
        </section>

        {page.itineraries.length > 0 && (
          <section className={cx(s.section, s.journeys)} id="journeys" aria-labelledby="journeys-title">
            <div className="container">
              <Head eyebrow={h.journeysEyebrow} title={<Heading id="journeys-title" title={h.journeysTitle} em={h.journeysTitleEm} />} body={h.journeysBody} />
              <JourneyTabs label={h.durationTabsLabel} tabs={durations.map((d) => ({ duration: d, label: h.duration(d) }))} initial={durations[0]}>
                {page.itineraries.map((it) => {
                  const url = itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId);
                  return (
                    <article key={`${it.itineraryId}-${it.cruiseId}`} className={s.journeyCard} data-duration={it.duration} hidden={it.duration !== durations[0]}>
                      <div className={s.journeyPhoto}>
                        {it.image && <Image src={it.image} alt={it.name} fill sizes="(max-width: 600px) 100vw, 50vw" />}
                        <span className={s.photoLabel}>{[it.bay && h.bays[it.bay], it.cruiseName].filter(Boolean).join(' · ')}</span>
                      </div>
                      <div className={s.journeyDetails}>
                        {it.destinations.length > 0 && <span className={s.journeySub}>{it.destinations.slice(0, 3).join(' · ')}</span>}
                        <h3><SmartLink href={url}>{it.name}</SmartLink></h3>
                        {it.description && <p>{it.description}</p>}
                        <div className={s.journeyMeta}>
                          <span>{h.duration(it.duration)}</span>
                          <TextLink href={url}>{h.exploreJourney}</TextLink>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </JourneyTabs>
            </div>
          </section>
        )}

        {page.cabins.length > 0 && (
          <section className={s.section} id="suites" aria-labelledby="suites-title">
            <div className="container">
              <Head eyebrow={h.suitesEyebrow} title={<Heading id="suites-title" title={h.suitesTitle} em={h.suitesTitleEm} />} body={h.suitesBody} />
              <Carousel label={h.suitesCollection} count={page.cabins.length} caption={h.suitesCollection} previous={h.previous} next={h.next}>
                {page.cabins.map((cabin) => (
                  <article key={cabin.id} className={s.roomCard}>
                    <div className={s.roomImg}>
                      {cabin.image && <Image src={cabin.image} alt={cabin.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1160px) 50vw, 33vw" />}
                    </div>
                    <div className={s.roomContent}>
                      <p className={s.roomOverline}>
                        <span>{cabin.cabinClass ?? cabin.cruise?.name}</span>
                        {cabin.area != null && <span>{cabin.area} m²</span>}
                      </p>
                      <h3><SmartLink href={cabinPath(locale, cabin)}>{cabin.name}</SmartLink></h3>
                      {cabin.summary && <p>{cabin.summary}</p>}
                      <TextLink href={cabinPath(locale, cabin)}>{h.discoverSuite}</TextLink>
                    </div>
                  </article>
                ))}
              </Carousel>
            </div>
          </section>
        )}

        {page.services.length > 0 && (
          <section className={cx(s.section, s.facilities)} id="facilities" aria-labelledby="facilities-title">
            <div className="container">
              <Head
                eyebrow={h.facilitiesEyebrow}
                title={<Heading id="facilities-title" title={h.facilitiesTitle} em={h.facilitiesTitleEm} />}
                body={h.facilitiesBody}
              />
              <ul className={s.facilitiesGrid}>
                {page.services.slice(0, 4).map((service, i, all) => (
                  <li key={service.id} className={s.facility}>
                    <span className={s.facilityNumber}>{pad(i + 1)} — {pad(all.length)}</span>
                    <span className={s.facilityMark} aria-hidden="true" />
                    <h3>{service.name}</h3>
                    {service.description && <p>{service.description}</p>}
                  </li>
                ))}
              </ul>
              <div className={s.experiencesMore}><TextLink href={sectionPath(locale, 'services')}>{h.facilitiesLink}</TextLink></div>
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section className={s.experiences} id="experiences" aria-labelledby="experiences-title">
            <div className="container">
              <Head
                eyebrow={h.experiencesEyebrow}
                title={<Heading id="experiences-title" title={h.experiencesTitle} em={h.experiencesTitleEm} />}
                body={h.experiencesBody}
                inverse
              />
              <div className={s.experienceGrid}>
                {experiences.map((exp, i) => {
                  const url = experiencePath(locale, exp.slug, exp.id);
                  return (
                    <article key={exp.id} className={s.experienceCard}>
                      <div className={s.experiencePicture}>
                        {exp.image && <Image src={exp.image} alt={exp.name} fill sizes="(max-width: 600px) 100vw, 33vw" />}
                      </div>
                      <p className={s.experienceIndex}>{pad(i + 1)} / {exp.group ?? experienceVerbs[i]}</p>
                      <h3><SmartLink href={url}>{exp.name}</SmartLink></h3>
                      {exp.summary && <p>{exp.summary}</p>}
                    </article>
                  );
                })}
              </div>
              <div className={s.experiencesMore}><TextLink href={sectionPath(locale, 'experiences')} inverse>{h.experiencesLink}</TextLink></div>
            </div>
          </section>
        )}

        {page.sustainability.length > 0 && (
          <section className={s.sustainability} id="sustainability" aria-labelledby="sustain-title">
            <div className={cx('container', s.sustainGrid)}>
              <figure className={s.sustainImg}>
                {page.cruises[0]?.image && <Image src={page.cruises[0].image} alt={page.cruises[0].name} fill sizes="(max-width: 900px) 100vw, 50vw" />}
                <figcaption>{h.sustainCaption}</figcaption>
              </figure>
              <div className={s.sustainCopy}>
                <Eyebrow>{h.sustainEyebrow}</Eyebrow>
                <Heading id="sustain-title" title={h.sustainTitle} em={h.sustainTitleEm} />
                <p>{h.sustainBody}</p>
                <ol className={s.sustainList}>
                  {page.sustainability.map((item, i) => (
                    <li key={i} className={s.sustainItem}>
                      <span className={s.sustainNum} aria-hidden="true">{pad(i + 1)}</span>
                      <div>
                        {item.title && <h3>{item.title}</h3>}
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
                <TextLink href={sectionPath(locale, 'aboutUs')}>{h.sustainLink}</TextLink>
              </div>
            </div>
          </section>
        )}

        {page.faqs.length > 0 && (
          <section className={s.faq} aria-labelledby="faq-title">
            <div className={cx('container', s.faqGrid)}>
              <div>
                <Eyebrow>{h.faqEyebrow}</Eyebrow>
                <Heading id="faq-title" title={h.faqTitle} em={h.faqTitleEm} />
                <p>{h.faqBody}</p>
                <TextLink href={sectionPath(locale, 'faq')}>{h.faqLink}</TextLink>
              </div>
              <FaqList items={page.faqs} schema={false} />
            </div>
          </section>
        )}

        <section className={s.quote} aria-labelledby="quote-title">
          {quoteImage && <Image src={quoteImage} alt="" fill sizes="100vw" className={s.quoteImage} />}
          <div className={s.quoteInner}>
            <Eyebrow inverse>{h.quoteEyebrow}</Eyebrow>
            <h2 id="quote-title">
              {h.quoteTitle} <em>{h.quoteTitleEm}</em>
            </h2>
            <p>{page.readyToSail ?? h.quoteBody}</p>
            <ButtonLink href={sectionPath(locale, 'booking')}>{h.quoteCta}</ButtonLink>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema(site, heroImage ? { image: absoluteImageUrl(heroImage) } : {}),
            { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: info.name, inLanguage: locale, publisher: { '@id': `${siteUrl}/#organization` } },
            {
              '@type': 'ItemList',
              name: h.journeysEyebrow,
              itemListElement: page.itineraries.map((it, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: absoluteUrl(itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId)),
                name: it.name,
              })),
            },
            ...(page.faqs.length > 0 ? [{ ...faqPageSchema(page.faqs), '@context': undefined }] : []),
          ],
        }}
      />
    </>
  );
}
