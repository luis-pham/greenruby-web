import Image from 'next/image';
import type { ReactNode } from 'react';
import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { FaqList as FaqAccordion, faqPageSchema } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { faqPath, type FaqEntry, type FaqList } from './data';
import { FaqSearch } from './FaqSearch';
import { faqMessages } from './messages';
import s from './faq.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

const CONTACT_IMAGE = '/upload/2026/03/13/banner-home.png';

const ICONS: ReactNode[] = [
  <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.4 4.6-4.6 2.4 2.4-4.6z" /></>,
  <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></>,
  <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
  <><path d="M20 4c-7.5-.5-14.5 2.5-15 10.2A6 6 0 0 0 11 20c7.5-.5 10-8 9-16Z" /><path d="M4 22c4-8 9-11 14-14" /></>,
  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
];
const HELP_ICON = <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2.2-2.5 5" /><path d="M12 17h.01" /></>;
const MESSAGE_ICON = <path d="M21 11.5a8.6 8.6 0 0 1-9 8.5 9 9 0 0 1-3-.5l-5 1 1-4.5a8.9 8.9 0 1 1 16-4.5Z" />;

function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

/** Page items grouped in the admin's group order; items without a group go last. */
function sections(list: FaqList, otherLabel: string) {
  const byGroup = new Map<number | null, FaqEntry[]>();
  for (const item of list.items) {
    const key = item.group?.id ?? null;
    byGroup.set(key, [...(byGroup.get(key) ?? []), item]);
  }
  const ordered = list.groups.flatMap((group, i) => {
    const items = byGroup.get(group.id);
    return items ? [{ key: group.slug, number: i + 1, name: group.name, count: group.count, items }] : [];
  });
  const loose = byGroup.get(null);
  if (loose) ordered.push({ key: 'other', number: list.groups.length + 1, name: otherLabel, count: loose.length, items: loose });
  return ordered;
}

export function FaqView({ list, chrome }: { list: FaqList; chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const f = faqMessages[locale];
  const info = siteInfo(site);
  const hubPath = sectionPath(locale, 'faq');
  const contactPath = sectionPath(locale, 'contact');
  const { group: current, groups, pagination } = list;
  const groupIndex = (slug: string) => groups.findIndex((g) => g.slug === slug);
  const totalAll = groups.reduce((sum, g) => sum + g.count, 0);
  const quick = groups.filter((g) => g.count > 0).slice(0, 3);
  const blocks = sections(list, f.otherGroup);
  const faqs = list.items.map((item) => ({ question: item.question, answerHtml: item.answerHtml ?? '' }));
  const { found: foundText, ...searchLabels } = f.search;
  const pageHref = (page: number) => faqPath(locale, current?.slug ?? null, page);

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={hubPath}
        crumbs={[
          { label: t.breadcrumb.home, href: homePath(locale) },
          { label: f.breadcrumb, href: hubPath },
          ...(current ? [{ label: current.name, href: faqPath(locale, current.slug) }] : []),
        ]}
        eyebrow={f.heroEyebrow}
        title={current ? <>{current.name} <em>{f.breadcrumb}</em></> : <>{f.heroTitle} <em>{f.heroTitleEm}</em></>}
        lead={f.heroBody}
        actions={
          <>
            <ButtonLink href="#questions">{f.heroPrimary}</ButtonLink>
            <TextLink href={contactPath}>{f.heroSecondary}</TextLink>
          </>
        }
      />

      <main>
        {quick.length > 0 && (
          <nav className={cx('container', s.quick)} aria-label={f.quickLabel}>
            <div className={s.quickCard}>
              {quick.map((g) => {
                const i = groupIndex(g.slug);
                return (
                  <SmartLink key={g.slug} href={`${faqPath(locale, g.slug)}#questions`} className={s.quickLink}>
                    <span className={s.quickIcon}><Icon>{ICONS[i % ICONS.length]}</Icon></span>
                    <span>
                      <small>{f.quickKicker(i + 1)}</small>
                      <strong>{g.name}</strong>
                      <em>{f.questions(g.count)}</em>
                    </span>
                  </SmartLink>
                );
              })}
            </div>
          </nav>
        )}

        <section className={s.faqSection} id="questions" aria-labelledby="questions-title">
          <div className="container">
            <div className={s.intro}>
              <div>
                <Eyebrow>{f.introEyebrow}</Eyebrow>
                <h2 className={s.sectionTitle} id="questions-title">{f.introTitle} <em>{f.introTitleEm}</em></h2>
              </div>
              <p className={s.lead}>{f.introBody}</p>
            </div>

            <div className={s.layout}>
              <aside className={s.sidebar}>
                <p className={s.asideKicker}>{f.topicsKicker}</p>
                <nav className={s.topics} aria-label={f.topicsLabel}>
                  <SmartLink href={`${hubPath}#questions`} className={s.topic} aria-current={current ? undefined : 'page'}>
                    <span><Icon>{HELP_ICON}</Icon>{f.allTopics}</span>
                    <b>{pad(totalAll)}</b>
                  </SmartLink>
                  {groups.map((g, i) => (
                    <SmartLink
                      key={g.slug}
                      href={`${faqPath(locale, g.slug)}#questions`}
                      className={s.topic}
                      aria-current={g.slug === current?.slug ? 'page' : undefined}
                    >
                      <span><Icon>{ICONS[i % ICONS.length]}</Icon>{g.name}</span>
                      <b>{pad(g.count)}</b>
                    </SmartLink>
                  ))}
                </nav>
                <div className={s.help}>
                  <Icon>{MESSAGE_ICON}</Icon>
                  <h3>{f.helpTitle}</h3>
                  <p>{f.helpBody}</p>
                  <SmartLink href={contactPath}>{f.helpLink} ↗</SmartLink>
                </div>
              </aside>

              <div className={s.main}>
                <FaqSearch
                  labels={searchLabels}
                  found={Object.fromEntries(Array.from({ length: list.items.length + 1 }, (_, n) => [n, foundText(n)]))}
                  total={list.items.length} resultsSuffix={current ? ` · ${current.name}` : ''}>
                  {blocks.length === 0 && <p className={s.emptyGroup}>{f.emptyGroup}</p>}
                  {blocks.map((block) => (
                    <section key={block.key} className={s.group} data-faq-group aria-labelledby={`group-${block.key}`}>
                      <div className={s.groupHeader}>
                        <span className={s.groupNumber}>{pad(block.number)}</span>
                        <div>
                          <h3 id={`group-${block.key}`}>{block.name}</h3>
                          <p>{f.questions(block.count)}</p>
                        </div>
                      </div>
                      <div className={s.accordion}>
                        <FaqAccordion schema={false} items={block.items.map((item) => ({ question: item.question, answerHtml: item.answerHtml ?? '' }))} />
                      </div>
                    </section>
                  ))}
                </FaqSearch>

                {pagination.lastPage > 1 && (
                  <nav className={s.pagination} aria-label={f.paginationLabel}>
                    {pagination.page > 1 && <SmartLink href={pageHref(pagination.page - 1)} rel="prev">← {f.previous}</SmartLink>}
                    {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((n) => (
                      <SmartLink key={n} href={pageHref(n)} aria-current={n === pagination.page ? 'page' : undefined}>{pad(n)}</SmartLink>
                    ))}
                    {pagination.page < pagination.lastPage && <SmartLink href={pageHref(pagination.page + 1)} rel="next">{f.next} →</SmartLink>}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className={s.assurance} aria-labelledby="assurance-title">
          <div className={cx('container', s.assuranceGrid)}>
            <div>
              <Eyebrow inverse>{f.assuranceEyebrow}</Eyebrow>
              <h2 className={s.sectionTitle} id="assurance-title">{f.assuranceTitle} <em>{f.assuranceTitleEm}</em></h2>
              <p className={s.lead}>{f.assuranceBody}</p>
              <ButtonLink href={sectionPath(locale, 'itinerary')}>{f.assuranceCta}</ButtonLink>
            </div>
            <ol className={s.steps}>
              {f.steps.map((step, i) => (
                <li key={step.title} className={s.step}>
                  <span className={s.stepNumber}>{pad(i + 1)}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.contact} aria-labelledby="contact-title">
          <div className="container">
            <div className={s.contactBox}>
              <div className={s.contactCopy}>
                <Eyebrow>{f.contactEyebrow}</Eyebrow>
                <h2 id="contact-title">{f.contactTitle} <em>{f.contactTitleEm}</em></h2>
                <p>{f.contactBody}</p>
                <div className={s.contactActions}>
                  <ButtonLink href={contactPath}>{f.contactPrimary}</ButtonLink>
                  {info.email && <ButtonLink href={`mailto:${info.email}`} variant="outline">{f.contactEmail}</ButtonLink>}
                </div>
              </div>
              <div className={s.contactVisual}>
                <Image src={CONTACT_IMAGE} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" />
                <p>{f.contactCaption}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      {faqs.length > 0 && <JsonLd data={faqPageSchema(faqs)} />}
    </>
  );
}
