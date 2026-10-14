import { SiteFooter, SolidHeader, Breadcrumb, type Chrome } from '@/components/layout';
import { organizationSchema } from '@/lib/organization';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SectionHeading } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteUrl } from '@/lib/site-url';
import { ContactForm } from './ContactForm';
import s from './contact.module.css';

const icons = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <span className={s.channelIcon} aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[name]}</svg>
    </span>
  );
}

export function ContactView({ chrome }: { chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const c = t.contact;
  const info = siteInfo(site);
  const path = sectionPath(locale, 'contact');
  const mapsHref = info.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}` : null;

  return (
    <>
      <SolidHeader chrome={chrome} currentHref={path} />

      <main>
        <section className={s.intro} aria-labelledby="contact-title">
          <div className={cx('container', s.introGrid)}>
            <div className={s.introCopy}>
              <Breadcrumb
                onLight
                label={t.breadcrumb.label}
                items={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: t.nav.contact, href: path }]}
              />
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <h1 className={s.title} id="contact-title">
                {c.title} <em>{c.titleEm}</em>
              </h1>
              <p className={s.lead}>{c.intro}</p>

              <ul className={s.channels} aria-label={c.directHeading}>
                {info.hotlineHref && (
                  <li className={s.channel}>
                    <Icon name="phone" />
                    <div>
                      <span className={s.channelLabel}>{c.call}</span>
                      <a className={s.channelValue} href={info.hotlineHref}>{info.hotline}</a>
                      {info.whatsappHref && (
                        <a className={s.channelLink} href={info.whatsappHref} target="_blank" rel="noopener">{c.whatsapp} ↗</a>
                      )}
                    </div>
                  </li>
                )}
                {info.email && (
                  <li className={s.channel}>
                    <Icon name="mail" />
                    <div>
                      <span className={s.channelLabel}>{c.email}</span>
                      <a className={s.channelValue} href={`mailto:${info.email}`}>{info.email}</a>
                    </div>
                  </li>
                )}
                {info.address && (
                  <li className={s.channel}>
                    <Icon name="pin" />
                    <div>
                      <span className={s.channelLabel}>{c.visit}</span>
                      <address className={s.channelValue}>{info.address}</address>
                      {mapsHref && <a className={s.channelLink} href={mapsHref} target="_blank" rel="noopener">{c.openMap} ↗</a>}
                    </div>
                  </li>
                )}
              </ul>
              <p className={s.responseNote}>{c.responseNote}</p>
            </div>

            <div className={s.formCard}>
              <Eyebrow>{c.formEyebrow}</Eyebrow>
              <h2 className={s.formHeading}>{c.formHeading}</h2>
              <ContactForm locale={locale} t={c} privacyHref={sectionPath(locale, 'privacyPolicy')} />
            </div>
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
          mainEntity: organizationSchema(site),
        }}
      />
    </>
  );
}
