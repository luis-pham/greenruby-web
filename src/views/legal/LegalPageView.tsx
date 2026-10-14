import { Fragment } from 'react';
import type { Chrome } from '@/components/layout';
import { cx, Eyebrow } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import type { Legal, LegalPageKey } from './data';
import { ContactPanel, LegalShell, LegalSidebar, MobileToc, PendingNotice, PolicyHtml, RelatedLinks, SectionTop, type TocItem } from './LegalLayout';
import { legalMessages } from './messages';
import { formatUpdated, POLICIES, policyByPage } from './policies';
import { structurePolicy } from './structure';
import s from './legal.module.css';

/**
 * The policy text for a standalone page: its own CMS content, else the matching section of the
 * /legal hub in the same language (the vi standalone pages are empty in the CMS), else nothing.
 */
export function resolvePolicy(legal: Legal, page: LegalPageKey) {
  const own = legal.pages[page];
  if (own.html) return { html: own.html, updatedAt: own.updatedAt };
  const section = legal.sections[policyByPage(page).key];
  if (section.html) return { html: section.html, updatedAt: legal.updatedAt };
  return { html: null, updatedAt: own.updatedAt };
}

/** /safety-policies, /terms-and-conditions, /privacy-policy, /payment-methods (single-policy layout). */
export function LegalPageView({ chrome, legal, page }: { chrome: Chrome; legal: Legal; page: LegalPageKey }) {
  const { locale, t } = chrome;
  const m = legalMessages[locale];
  const policy = policyByPage(page);
  const copy = m.policies[policy.key];
  const data = legal.pages[page];
  const path = sectionPath(locale, page);
  const hubPath = sectionPath(locale, 'legal');
  const { html, updatedAt } = resolvePolicy(legal, page);
  const { introHtml, clauses } = html ? structurePolicy(html) : { introHtml: '', clauses: [] };

  // With headings in the text the sidebar indexes them; otherwise it lists the other policies.
  const policyLinks: TocItem[] = [
    ...POLICIES.map((p) => ({ href: sectionPath(locale, p.page), label: legal.pages[p.page].title, current: p.page === page })),
    { href: hubPath, label: m.hubLink },
  ];
  const toc: TocItem[] =
    clauses.length > 0 ? clauses.map((c) => ({ href: `#${c.id}`, label: c.title, number: c.number })) : policyLinks;

  return (
    <LegalShell
      chrome={chrome}
      m={m}
      path={path}
      crumbs={[
        { label: t.breadcrumb.home, href: homePath(locale) },
        { label: legal.title, href: hubPath },
        { label: data.title, href: path },
      ]}
      title={copy.heroTitle}
      titleEm={copy.heroTitleEm}
      intro={copy.heroIntro}
      updated={formatUpdated(updatedAt, locale)}
      pageName={data.seo.title ?? data.title}
      dateModified={updatedAt}
    >
      <div className={cx('container', s.layout)}>
        <LegalSidebar
          chrome={chrome}
          m={m}
          heading={clauses.length > 0 ? m.onThisPage : m.allPolicies}
          items={toc}
          articles={legal.popularArticles}
        />
        <MobileToc m={m} items={toc} />

        <article className={s.content}>
          <div className={s.intro}>
            <Eyebrow>{data.title}</Eyebrow>
            <h2>{copy.introHeading}</h2>
            {html ? introHtml && <PolicyHtml html={introHtml} className={s.introBody} /> : <PendingNotice m={m} />}
          </div>

          {clauses.map((clause, i) => (
            <Fragment key={clause.id}>
              {i > 0 && <hr className={s.divider} />}
              <section className={s.block} id={clause.id} aria-labelledby={`${clause.id}-title`}>
                <SectionTop number={clause.number} />
                <h2 id={`${clause.id}-title`}>{clause.title}</h2>
                {clause.html && <PolicyHtml html={clause.html} />}
              </section>
            </Fragment>
          ))}

          <div className={s.closing}>
            <ContactPanel {...(policy.key === 'paymentMethods' ? m.bookingHelp : m.policyHelp)} href={sectionPath(locale, 'contact')} />
            <RelatedLinks
              items={[
                ...POLICIES.filter((p) => p.page !== page).map((p) => ({
                  href: sectionPath(locale, p.page),
                  eyebrow: m.related,
                  label: legal.pages[p.page].title,
                })),
                { href: hubPath, eyebrow: m.guestInformation, label: m.hubLink },
              ]}
            />
          </div>
        </article>
      </div>
    </LegalShell>
  );
}
