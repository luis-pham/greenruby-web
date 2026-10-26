import { Fragment } from 'react';
import type { Chrome } from '@/components/layout';
import { CookieSettingsButton } from '@/components/layout/CookieConsent';
import { cx, Eyebrow } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { bookingTerms, bookingTermsLinked } from './booking-terms';
import { cookiePolicy } from './cookie-policy';
import type { Legal } from './data';
import { ContactPanel, LegalShell, LegalSidebar, MobileToc, PolicyHtml, RelatedLinks, SectionTop, type TocItem } from './LegalLayout';
import { legalMessages } from './messages';
import { formatUpdated, POLICIES } from './policies';
import s from './legal.module.css';

/** /cookie-policy: same layout as the single-policy pages, with its wording kept in code (not a CMS page). */
export function CookiePolicyView({ chrome, legal }: { chrome: Chrome; legal: Legal }) {
  const { locale, t } = chrome;
  const m = legalMessages[locale];
  const c = cookiePolicy[locale];
  const path = sectionPath(locale, 'cookiePolicy');
  const hubPath = sectionPath(locale, 'legal');
  const toc: TocItem[] = c.clauses.map((clause, i) => ({ href: `#${clause.id}`, label: clause.title, number: String(i + 1).padStart(2, '0') }));

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
      updated={formatUpdated(c.updated, locale)}
      pageName={c.title}
      dateModified={c.updated}
    >
      <div className={cx('container', s.layout)}>
        <LegalSidebar chrome={chrome} m={m} heading={m.onThisPage} items={toc} articles={legal.popularArticles} />
        <MobileToc m={m} items={toc} />

        <article className={s.content}>
          <div className={s.intro}>
            <Eyebrow>{c.title}</Eyebrow>
            <h2>{c.introHeading}</h2>
            <PolicyHtml html={c.introHtml} className={s.introBody} />
          </div>

          {c.clauses.map((clause, i) => (
            <Fragment key={clause.id}>
              {i > 0 && <hr className={s.divider} />}
              <section className={s.block} id={clause.id} aria-labelledby={`${clause.id}-title`}>
                <SectionTop number={toc[i].number as string} />
                <h2 id={`${clause.id}-title`}>{clause.title}</h2>
                <PolicyHtml html={clause.html} />
                {clause.id === 'manage' && (
                  <div className={s.contactPanel}>
                    <div>
                      <h3>{c.settingsTitle}</h3>
                      <p>{c.settingsBody}</p>
                    </div>
                    <CookieSettingsButton>{c.settingsButton}</CookieSettingsButton>
                  </div>
                )}
              </section>
            </Fragment>
          ))}

          <div className={s.closing}>
            <ContactPanel {...m.policyHelp} href={sectionPath(locale, 'contact')} />
            <RelatedLinks
              items={[
                ...POLICIES.map((p) => ({ href: sectionPath(locale, p.page), eyebrow: m.related, label: legal.pages[p.page].title })),
                ...(bookingTermsLinked() ? [{ href: sectionPath(locale, 'bookingTerms'), eyebrow: m.related, label: bookingTerms[locale].title }] : []),
                { href: hubPath, eyebrow: m.guestInformation, label: m.hubLink },
              ]}
            />
          </div>
        </article>
      </div>
    </LegalShell>
  );
}
