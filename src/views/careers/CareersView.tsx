import Link from 'next/link';
import { PageIntro, SiteFooter, type Chrome, type Crumb } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui';
import { homePath } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site-url';
import { careersMessages as m, formatDay } from './messages';
import { CAREERS_PATH, jobPath } from './paths';
import type { JobList, JobSummary } from './schemas';
import s from './careers.module.css';

const LIST_ID = 'vi-tri';

/** /tuyen-dung: intro, the open postings (CMS order) or an empty notice, and the recruitment e-mail. */
export function CareersView({ chrome, list }: { chrome: Chrome; list: JobList }) {
  const crumbs: Crumb[] = [
    { label: chrome.t.breadcrumb.home, href: homePath('vi') },
    { label: m.breadcrumb, href: CAREERS_PATH },
  ];

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={CAREERS_PATH}
        crumbs={crumbs}
        eyebrow={m.heroEyebrow}
        title={m.heroTitle}
        tagline={m.heroTagline}
        lead={m.heroLead}
        actions={<ButtonLink href={`#${LIST_ID}`} arrow={false}>{m.heroCta}</ButtonLink>}
        stacked
      />

      <main>
        <section className={s.listSection} id={LIST_ID} aria-labelledby="careers-list-title">
          <div className="container">
            <div className={s.listHead}>
              <h2 id="careers-list-title" className={s.listTitle}>{m.listTitle}</h2>
              <p className={s.listIntro}>{m.listIntro}</p>
            </div>

            {list.items.length > 0 ? (
              <ul className={s.grid}>
                {list.items.map((job) => (
                  <li key={job.id}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={s.empty}>{m.empty}</p>
            )}
          </div>
        </section>

        <section className={s.contact} aria-labelledby="careers-contact-title">
          <div className="container">
            <h2 id="careers-contact-title" className={s.contactTitle}>{m.contactLabel}</h2>
            <p className={s.contactBody}>
              {m.contactBody}{' '}
              <a className={s.email} href={`mailto:${list.email}`}>{list.email}</a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: m.metaTitle,
          description: m.metaDescription,
          url: absoluteUrl(CAREERS_PATH),
          inLanguage: 'vi',
        }}
      />
    </>
  );
}

/** One posting: the whole card is the link (one tab stop), "Xem chi tiết" is its visual cue. */
function JobCard({ job }: { job: JobSummary }) {
  const facts = [
    job.employmentType ? m.employmentType[job.employmentType] : null,
    job.location,
    job.deadline ? `${m.meta.deadline}: ${formatDay(job.deadline)}` : null,
  ].filter((x): x is string => Boolean(x));
  return (
    <Link href={jobPath(job.slug)} className={s.card}>
      <span className={s.cardDept}>{job.department}</span>
      <h3 className={s.cardTitle}>{job.title}</h3>
      {facts.length > 0 && (
        <ul className={s.cardFacts}>
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      )}
      <span className={s.cardMore} aria-hidden="true">
        {m.viewDetail} <span className={s.arrow}>↗︎</span>
      </span>
    </Link>
  );
}
