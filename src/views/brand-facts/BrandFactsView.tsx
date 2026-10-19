import Image from 'next/image';
import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { SmartLink } from '@/components/ui';
import type { Homepage } from '@/lib/api/schemas';
import { detailPath, homePath, itineraryPath, sectionPath } from '@/lib/i18n';
import { MAPS_URL, ORGANIZATION_ID, organizationSchema } from '@/lib/organization';
import { siteInfo } from '@/lib/site-info';
import { absoluteUrl } from '@/lib/site-url';
import { CopyButton, FactActions } from './Actions';
import { brandFactsMessages, REVIEWED, type Evidence } from './messages';
import s from './brand.module.css';

const SECTIONS = ['identity', 'fleet', 'itineraries', 'cabins', 'departure', 'status', 'sustainability', 'contacts', 'media'] as const;
const CABIN_ORDER = ['Imperial Suite', 'Royal Romance Suite', 'Ocean Breeze Premium', 'Serenity Deluxe'];
const SHIP_BAY: Record<string, 'ha-long' | 'lan-ha'> = { 'Green Ruby 1': 'ha-long', 'Green Ruby 2': 'lan-ha' };

function Badge({ evidence, label }: { evidence: Evidence; label: string }) {
  return <span className={s.badge} data-evidence={evidence}>{label}</span>;
}

function Head({ n, id, label, title, lede }: { n: number; id: string; label: string; title: string; lede: string }) {
  return (
    <div className={s.head}>
      <span className={s.index}>{String(n).padStart(2, '0')}</span>
      <div>
        <span className={s.label}>{label}</span>
        <h2 id={id} className={s.title}>{title}</h2>
        <p className={s.lede}>{lede}</p>
      </div>
    </div>
  );
}

/** /about-us/brand-facts: official company and fleet reference. Vessel and cabin figures come from the CMS. */
export function BrandFactsView({ chrome, home }: { chrome: Chrome; home: Homepage }) {
  const { locale, t } = chrome;
  const m = brandFactsMessages[locale];
  const S = m.sections;
  const info = siteInfo(chrome.site);
  const path = sectionPath(locale, 'brandFacts');
  const url = absoluteUrl(path);

  const ships = [...home.cruises].sort((a, b) => a.name.localeCompare(b.name));
  const cabins = CABIN_ORDER.map((name) => home.cabins.find((c) => c.name === name)).filter((c): c is NonNullable<typeof c> => !!c);
  const itineraries = [...home.itineraries].sort((a, b) => (a.bay ?? '').localeCompare(b.bay ?? '') || a.duration - b.duration);
  const value = (n: number | null | undefined, unit = '') => (n ? `${n}${unit}` : '—');

  const titles = { identity: S.identity.title, fleet: S.fleet.title, itineraries: S.itineraries.title, cabins: S.cabins.title, departure: S.departure.title, status: S.status.title, sustainability: S.sustainability.title, contacts: S.contacts.title, media: S.media.title };

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={path}
        crumbs={[
          { label: t.breadcrumb.home, href: homePath(locale) },
          { label: m.breadcrumbAbout, href: sectionPath(locale, 'aboutUs') },
          { label: m.breadcrumb, href: path },
        ]}
        eyebrow={m.eyebrow}
        title={
          <>
            {m.title}
            <br />
            <em>{m.titleEm}</em>
          </>
        }
        lead={m.lead}
        meta={
          <span>
            {m.reviewed}: <time dateTime={REVIEWED.iso}>{REVIEWED[locale]}</time>
          </span>
        }
      />

      <div className={s.stats}>
        <div className="container">
          <dl className={s.statGrid}>
            {m.stats.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={`container ${s.layout}`}>
        <aside className={s.side}>
          <p className={s.sideTitle}>{m.indexTitle}</p>
          <nav aria-label={m.indexTitle}>
            <ol className={s.sideNav}>
              {SECTIONS.map((id, i) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {titles[id]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <FactActions url={url} printLabel={m.printLabel} copyLabel={m.copyLink} copied={m.copied} />
        </aside>

        <div className={s.content}>
          <section className={s.section} aria-labelledby="identity">
            <Head n={1} id="identity" {...S.identity} />
            <dl className={s.facts}>
              {S.identity.rows.map(([k, v, e]) => (
                <div key={k} className={s.fact}>
                  <dt>{k}</dt>
                  <dd>
                    {v === 'greenrubycruises.com' ? <a href={absoluteUrl(homePath(locale))}>{v}</a> : v}
                    <Badge evidence={e} label={m.evidence[e]} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={s.section} aria-labelledby="fleet">
            <Head n={2} id="fleet" {...S.fleet} />
            <div className={s.vessels}>
              {ships.map((ship) => {
                const bay = SHIP_BAY[ship.name];
                return (
                  <article key={ship.id} className={s.vessel}>
                    <div className={s.vesselPhoto}>
                      {(ship.cover ?? ship.image) && <Image src={(ship.cover ?? ship.image)!} alt={ship.name} fill sizes="(max-width: 700px) 100vw, 480px" quality={75} />}
                    </div>
                    <div className={s.vesselBody}>
                      <span className={s.label}>{bay ? S.fleet.bays[bay] : ''}</span>
                      <h3>{ship.name}</h3>
                      <div className={s.vesselSpecs}>
                        <div><b>{value(ship.totalCabin)}</b><span>{S.fleet.rows.cabins}</span></div>
                        <div><b>{value(ship.capacity)}</b><span>{S.fleet.rows.guests}</span></div>
                        <div><b>{value(ship.length, ' m')}</b><span>{S.fleet.rows.length}</span></div>
                      </div>
                      <p className={s.vesselStatus}>{S.fleet.status}</p>
                      <SmartLink className={s.textLink} href={detailPath(locale, 'cruise', ship.slug, ship.id)}>{S.fleet.vesselPage} →</SmartLink>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th scope="col">{S.fleet.thSpec}</th>
                    {ships.map((ship) => <th key={ship.id} scope="col">{ship.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr><th scope="row">{S.fleet.rows.bay}</th>{ships.map((x) => <td key={x.id}>{SHIP_BAY[x.name] ? S.fleet.bays[SHIP_BAY[x.name]] : '—'}</td>)}</tr>
                  <tr><th scope="row">{S.fleet.rows.length}</th>{ships.map((x) => <td key={x.id}>{value(x.length, ' m')}</td>)}</tr>
                  <tr><th scope="row">{S.fleet.rows.cabins}</th>{ships.map((x) => <td key={x.id}>{value(x.totalCabin)}</td>)}</tr>
                  <tr><th scope="row">{S.fleet.rows.guests}</th>{ships.map((x) => <td key={x.id}>{value(x.capacity)}</td>)}</tr>
                  <tr><th scope="row">{S.fleet.rows.decks}</th>{ships.map((x) => <td key={x.id}>{value(x.totalFloor)}</td>)}</tr>
                  <tr><th scope="row">{S.fleet.rows.built}</th>{ships.map((x) => <td key={x.id}>2026</td>)}</tr>
                  <tr><th scope="row">{S.fleet.rows.categories}</th>{ships.map((x) => <td key={x.id}>{S.fleet.categories}</td>)}</tr>
                  <tr><th scope="row">{S.fleet.rows.boarding}</th>{ships.map((x) => <td key={x.id}>{SHIP_BAY[x.name] ? S.fleet.boarding[SHIP_BAY[x.name]] : '—'}</td>)}</tr>
                  <tr><th scope="row">{S.fleet.rows.status}</th>{ships.map((x) => <td key={x.id}>{S.fleet.status}</td>)}</tr>
                </tbody>
              </table>
            </div>
            <p className={s.note}>
              {S.fleet.choose} <SmartLink href={sectionPath(locale, 'itinerary')}>{S.fleet.chooseLink}</SmartLink>
            </p>
            <p className={s.small}>{S.fleet.note}</p>
          </section>

          <section className={s.section} aria-labelledby="itineraries">
            <Head n={3} id="itineraries" {...S.itineraries} />
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead><tr>{S.itineraries.th.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>
                  {itineraries.map((it) => (
                    <tr key={`${it.cruiseId}-${it.itineraryId}`}>
                      <td>{it.bay ? S.fleet.bays[it.bay] : '—'}</td>
                      <td>{S.itineraries.nights(it.duration)}</td>
                      <td>{it.cruiseName ?? '—'}</td>
                      <td><SmartLink href={itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId)}>{it.name}</SmartLink></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={s.section} aria-labelledby="cabins">
            <Head n={4} id="cabins" {...S.cabins} />
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead><tr>{S.cabins.th.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>
                  {cabins.map((c) => (
                    <tr key={c.id}>
                      <td><SmartLink href={detailPath(locale, 'cabin', c.slug, c.id)}>{c.name}</SmartLink></td>
                      <td>{value(c.area, ' m²')}</td>
                      <td>{value(c.capacity)}</td>
                      <td>{c.view ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={s.section} aria-labelledby="departure">
            <Head n={5} id="departure" {...S.departure} />
            <div className={s.location}>
              <div>
                <h3>{S.departure.place}</h3>
                <p>{S.departure.address}</p>
                <p className={s.small}>{S.departure.addressNote}</p>
                <a className={s.textLink} href={MAPS_URL} target="_blank" rel="noopener">{S.departure.map} ↗</a>
              </div>
              <ul>
                {S.departure.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <SmartLink className={s.textLink} href={sectionPath(locale, 'contact')}>{S.departure.contact} →</SmartLink>
          </section>

          <section className={s.section} aria-labelledby="status">
            <Head n={6} id="status" {...S.status} />
            <div className={s.cards}>
              {S.status.cards.map(([k, h, p]) => (
                <div key={k} className={s.card}>
                  <span className={s.label}>{k}</span>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              ))}
            </div>
            <dl className={s.facts}>
              {S.status.rows.map(([k, v, e]) => (
                <div key={k} className={s.fact}>
                  <dt>{k}</dt>
                  <dd>{v}<Badge evidence={e} label={m.evidence[e]} /></dd>
                </div>
              ))}
            </dl>
            <SmartLink className={s.textLink} href={sectionPath(locale, 'contact')}>{S.status.cta} →</SmartLink>
          </section>

          <section className={s.section} aria-labelledby="sustainability">
            <Head n={7} id="sustainability" {...S.sustainability} />
            <dl className={s.facts}>
              {S.sustainability.rows.map(([k, v, e]) => (
                <div key={k} className={s.fact}>
                  <dt>{k}</dt>
                  <dd>{v}<Badge evidence={e} label={m.evidence[e]} /></dd>
                </div>
              ))}
            </dl>
            <SmartLink className={s.textLink} href={sectionPath(locale, 'ecoDashboard')}>{S.sustainability.dashboard} →</SmartLink>
          </section>

          <section className={s.section} aria-labelledby="contacts">
            <Head n={8} id="contacts" {...S.contacts} />
            <div className={s.contacts}>
              <div><span>{S.contacts.website}</span><a href={absoluteUrl(homePath(locale))}>greenrubycruises.com</a></div>
              {info.email && <div><span>{S.contacts.email}</span><a href={`mailto:${info.email}`}>{info.email}</a></div>}
              {info.hotline && <div><span>{S.contacts.hotline}</span><a href={info.hotlineHref ?? undefined}>{info.hotline}</a></div>}
              {info.address && <div><span>{S.contacts.address}</span><strong>{info.address}</strong></div>}
              <div><span>{S.contacts.contactPage}</span><SmartLink href={sectionPath(locale, 'contact')}>{absoluteUrl(sectionPath(locale, 'contact')).replace(/^https?:\/\//, '')}</SmartLink></div>
              {info.socials.length > 0 && (
                <div>
                  <span>{S.contacts.social}</span>
                  <p className={s.socials}>
                    {info.socials.map((x) => <a key={x.url} href={x.url} rel="noopener me" target="_blank">{x.name}</a>)}
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className={s.section} aria-labelledby="media">
            <Head n={9} id="media" {...S.media} />
            <div className={s.boilerplate}>
              <span className={s.label}>{S.media.boilerplateLabel}</span>
              <p>{S.media.boilerplate}</p>
              <CopyButton text={S.media.boilerplate} label={S.media.copy} copied={m.copied} className={s.boilerBtn} />
            </div>
            <div className={s.files}>
              {S.media.files.map(([k, v]) => (
                <div key={k}>
                  <strong>{k}</strong>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <p className={s.small}>
              {m.reviewed}: <time dateTime={REVIEWED.iso}>{REVIEWED[locale]}</time>
            </p>
          </section>
        </div>
      </div>

      <section className={s.callout}>
        <div className="container">
          <h2>{m.footerTitle}</h2>
          {info.email && <a href={`mailto:${info.email}?subject=Green%20Ruby%20brand%20facts`}>{m.footerCta} ↗</a>}
        </div>
      </section>

      <SiteFooter locale={locale} site={chrome.site} t={t} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema(chrome.site),
            {
              '@type': 'AboutPage',
              '@id': `${url}#webpage`,
              url,
              name: m.metaTitle,
              description: m.metaDescription,
              inLanguage: locale,
              dateModified: REVIEWED.iso,
              about: { '@id': ORGANIZATION_ID },
              mainEntity: { '@id': ORGANIZATION_ID },
            },
          ],
        }}
      />
    </>
  );
}
