import { Fragment } from 'react';
import type { Chrome } from '@/components/layout';
import { cx, Eyebrow } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import type { Legal } from './data';
import { ContactPanel, LegalShell, LegalSidebar, MobileToc, PendingNotice, PolicyHtml, RelatedLinks, SectionTop } from './LegalLayout';
import { legalMessages } from './messages';
import { formatUpdated, POLICIES } from './policies';
import { structurePolicy } from './structure';
import s from './legal.module.css';

/** /legal: all four policies on one page (CMS "legal" page config), with a sidebar index. */
export function LegalHubView({ chrome, legal }: { chrome: Chrome; legal: Legal }) {
  const { locale, t } = chrome;
  const m = legalMessages[locale];
  const path = sectionPath(locale, 'legal');
  // Blade skips sections whose html is empty.
  const sections = POLICIES.flatMap((policy) => {
    const section = legal.sections[policy.key];
    return section.html ? [{ policy, title: section.title, ...structurePolicy(section.html, policy.anchor) }] : [];
  });
  const toc = sections.map(({ policy, title }, i) => ({ href: `#${policy.anchor}`, label: title, number: String(i + 1).padStart(2, '0') }));

  return (
    <LegalShell
      chrome={chrome}
      m={m}
      path={path}
      crumbs={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: legal.title, href: path }]}
      title={m.hub.heroTitle}
      titleEm={m.hub.heroTitleEm}
      intro={m.hub.heroIntro}
      updated={formatUpdated(legal.updatedAt, locale)}
      artEyebrow={m.hub.artEyebrow}
      artCaption={m.hub.artCaption}
      jumpLinks={POLICIES.map((policy) => ({
        policy,
        href: sections.some((x) => x.policy.key === policy.key) ? `#${policy.anchor}` : sectionPath(locale, policy.page),
        title: legal.sections[policy.key].title,
      }))}
      pageName={legal.seo.title ?? legal.title}
      dateModified={legal.updatedAt}
    >
      <div className={cx('container', s.layout)}>
        <LegalSidebar chrome={chrome} m={m} heading={m.onThisPage} items={toc} articles={legal.popularArticles} />
        {toc.length > 0 && <MobileToc m={m} items={toc} />}

        <article className={s.content}>
          <div className={s.intro}>
            <Eyebrow>{m.hub.introEyebrow}</Eyebrow>
            <h2>{m.hub.introHeading}</h2>
            <p>{m.hub.introBody}</p>
            {sections.length === 0 && <PendingNotice m={m} />}
          </div>

          {sections.map(({ policy, title, introHtml, clauses }, i) => (
            <Fragment key={policy.key}>
              {i > 0 && <hr className={s.divider} />}
              <section className={s.block} id={policy.anchor} aria-labelledby={`${policy.anchor}-title`}>
                <SectionTop number={String(i + 1).padStart(2, '0')} micro={m.policies[policy.key].micro} />
                <h2 id={`${policy.anchor}-title`}>{title}</h2>
                {introHtml && <PolicyHtml html={introHtml} className={s.lead} />}
                {clauses.length > 0 && (
                  <ol className={s.clauses}>
                    {clauses.map((clause) => (
                      <li key={clause.id} className={s.clause} id={clause.id}>
                        <span className={s.clauseIndex} aria-hidden="true">{clause.number}</span>
                        <div>
                          <h3>{clause.title}</h3>
                          {clause.html && <PolicyHtml html={clause.html} />}
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
                <RelatedLinks
                  items={[{ href: sectionPath(locale, policy.page), eyebrow: m.readFull, label: legal.pages[policy.page].title }]}
                />
                {policy.key === 'paymentMethods' && (
                  <ContactPanel {...m.bookingHelp} href={sectionPath(locale, 'contact')} />
                )}
              </section>
            </Fragment>
          ))}
        </article>
      </div>
    </LegalShell>
  );
}
