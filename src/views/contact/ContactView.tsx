import Image from 'next/image';
import { PageHero, SiteFooter, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SectionHeading } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteUrl, siteUrl } from '@/lib/site-url';
import { ContactForm } from './ContactForm';
import s from './contact.module.css';

// Hero and side-panel photography already used by the CMS (homepage banner, itinerary banner).
const HERO_IMAGE = '/upload/2026/03/13/banner-home.png';
const PANEL_IMAGE = '/upload/2026/03/09/banner-itineraries.png';

export function ContactView({ chrome }: { chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const c = t.contact;
  const info = siteInfo(site);
  const path = sectionPath(locale, 'contact');
  const mapsHref = info.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}` : null;

  return (
    <>
      <PageHero
        chrome={chrome}
        currentHref={path}
        compact
        image={HERO_IMAGE}
        imageAlt=""
        crumbs={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: t.nav.contact, href: path }]}
        eyebrow={c.eyebrow}
        title={<>{c.title} <em>{c.titleEm}</em></>}
        description={c.intro}
      />

      <main>
        <section className={s.section} aria-labelledby="form-title">
          <div className={cx('container', s.layout)}>
            <div className={s.formPanel}>
              <Eyebrow>{c.formEyebrow}</Eyebrow>
              <h2 id="form-title">{c.formHeading}</h2>
              <ContactForm locale={locale} t={c} privacyHref={sectionPath(locale, 'privacyPolicy')} />
            </div>
            <aside className={s.direct} aria-labelledby="direct-title">
              <Image src={PANEL_IMAGE} alt="" fill sizes="(max-width: 900px) 100vw, 40vw" className={s.directImage} />
              <Eyebrow inverse>{c.directEyebrow}</Eyebrow>
              <h2 id="direct-title">{c.directHeading}</h2>
              <ul className={s.channels}>
                {info.hotlineHref && (
                  <li className={s.channel}>
                    <span>{c.call}</span>
                    <a href={info.hotlineHref}>{info.hotline}</a>
                    {info.whatsappHref && <><br /><a className={s.small} href={info.whatsappHref} target="_blank" rel="noopener">WhatsApp ↗</a></>}
                  </li>
                )}
                {info.email && (
                  <li className={s.channel}>
                    <span>{c.email}</span>
                    <a href={`mailto:${info.email}`}>{info.email}</a>
                  </li>
                )}
                {info.address && (
                  <li className={s.channel}>
                    <span>{c.visit}</span>
                    <address>{info.address}</address>
                    {mapsHref && <a className={s.small} href={mapsHref} target="_blank" rel="noopener">{c.openMap} ↗</a>}
                  </li>
                )}
              </ul>
            </aside>
          </div>
        </section>

        <section className={cx(s.section, s.stepsSection)} aria-labelledby="steps-title">
          <div className="container">
            <SectionHeading id="steps-title" eyebrow={c.stepsEyebrow} title={c.stepsHeading} />
            <ol className={s.steps}>
              {c.steps.map((step) => (
                <li key={step.title} className={s.step}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.cta} aria-labelledby="contact-cta-title">
          <div className={cx('container', s.ctaInner)}>
            <div>
              <h2 id="contact-cta-title">{c.ctaHeading}</h2>
              <p>{c.ctaBody}</p>
            </div>
            <ButtonLink href={sectionPath(locale, 'booking')}>{c.ctaPrimary}</ButtonLink>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: absoluteUrl(path),
          name: c.metaTitle,
          inLanguage: locale,
          mainEntity: {
            '@type': 'TravelAgency',
            name: info.name,
            url: siteUrl,
            ...(info.email && { email: info.email }),
            ...(info.hotline && { telephone: info.hotline }),
            ...(info.address && { address: info.address }),
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'reservations',
              availableLanguage: ['en', 'vi'],
              ...(info.email && { email: info.email }),
              ...(info.hotline && { telephone: info.hotline }),
            },
            ...(info.socials.length > 0 && { sameAs: info.socials.map((x) => x.url) }),
          },
        }}
      />
    </>
  );
}
