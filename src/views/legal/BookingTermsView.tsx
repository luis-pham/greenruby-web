import { Fragment } from 'react';
import type { Chrome } from '@/components/layout';
import { cx, Eyebrow } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { BOOKING_TERMS, bookingTerms } from './booking-terms';
import type { Legal } from './data';
import { ContactPanel, LegalShell, LegalSidebar, MobileToc, PolicyHtml, RelatedLinks, SectionTop, type TocItem } from './LegalLayout';
import { legalMessages } from './messages';
import { formatUpdated, POLICIES } from './policies';
import s from './legal.module.css';

/** /booking-terms-and-conditions: same layout as the cookie policy, wording kept in code, with a draft state. */
export function BookingTermsView({ chrome, legal }: { chrome: Chrome; legal: Legal }) {
  const { locale, t } = chrome;
  const m = legalMessages[locale];
  const c = bookingTerms[locale];
  const info = siteInfo(chrome.site);
  const path = sectionPath(locale, 'bookingTerms');
  const hubPath = sectionPath(locale, 'legal');
  const draft = BOOKING_TERMS.status === 'draft';
  const effective = BOOKING_TERMS.effectiveDate
    ? new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', { dateStyle: 'long', timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(BOOKING_TERMS.effectiveDate))
    : c.effectivePending;
  const links = { privacy: sectionPath(locale, 'privacyPolicy'), contact: sectionPath(locale, 'contact') };
  const toc: TocItem[] = c.sections.map((section, i) => ({ href: `#${section.id}`, label: section.title, number: String(i + 1).padStart(2, '0') }));

  return (
    <LegalShell
      chrome={chrome}
      m={m}
      path={path}
      crumbs={[
        { label: t.breadcrumb.home, href: homePath(locale) },
        { label: legal.title, href: hubPath },
        { label: c.title, href: path },
      ]}
      title={c.heroTitle}
      titleEm={c.heroTitleEm}
      intro={c.heroIntro}
      updated={draft ? null : formatUpdated(BOOKING_TERMS.updated, locale)}
      pageName={c.title}
      dateModified={draft ? null : BOOKING_TERMS.updated}
    >
      <div className={cx('container', s.layout)}>
        <LegalSidebar chrome={chrome} m={m} heading={m.onThisPage} items={toc} articles={legal.popularArticles} />
        <MobileToc m={m} items={toc} />

        <article className={s.content}>
          <div className={s.intro}>
            <Eyebrow>{c.title}</Eyebrow>
            <h2>{c.introHeading}</h2>
            {draft && (
              <p className={s.notice} role="note">
                <strong>{c.draftTitle}</strong> {c.draftBody}
              </p>
            )}
            <p className={s.termsMeta}>
              <span><strong>{c.effectiveLabel}:</strong> {effective}</span>
              <span>{c.operator}</span>
            </p>
            <PolicyHtml html={c.introHtml} className={s.introBody} />

            <div className={s.glance}>
              <h3>{c.glance.title}</h3>
              <dl>
                {c.glance.items.map(([term, value]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <a href="#cancellation">{c.glance.tableLink} →</a>
            </div>
          </div>

          {c.sections.map((section, i) => (
            <Fragment key={section.id}>
              {i > 0 && <hr className={s.divider} />}
              <section className={s.block} id={section.id} aria-labelledby={`${section.id}-title`}>
                <SectionTop number={toc[i].number as string} />
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                <PolicyHtml html={section.html(links)} />
                {section.id === 'contact' && (info.email || info.hotlineHref) && (
                  <PolicyHtml
                    html={[
                      info.email && `<p><strong>${c.contactLines.email}:</strong> <a href="mailto:${info.email}">${info.email}</a></p>`,
                      info.hotlineHref && `<p><strong>${c.contactLines.phone}:</strong> <a href="${info.hotlineHref}">${info.hotline}</a></p>`,
                    ]
                      .filter(Boolean)
                      .join('')}
                  />
                )}
              </section>
            </Fragment>
          ))}

          <div className={s.closing}>
            <p className={s.termsMeta}>{c.closingNote}</p>
            <ContactPanel {...m.bookingHelp} href={sectionPath(locale, 'contact')} />
            <RelatedLinks
              items={[
                ...POLICIES.map((p) => ({ href: sectionPath(locale, p.page), eyebrow: m.related, label: legal.pages[p.page].title })),
                { href: hubPath, eyebrow: m.guestInformation, label: m.hubLink },
              ]}
            />
          </div>
        </article>
      </div>
    </LegalShell>
  );
}
