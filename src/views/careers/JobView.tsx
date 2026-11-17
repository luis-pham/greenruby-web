import Link from 'next/link';
import { Breadcrumb, SiteFooter, SolidHeader, type Chrome, type Crumb } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, Eyebrow } from '@/components/ui';
import { homePath } from '@/lib/i18n';
import { ORGANIZATION_ID } from '@/lib/organization';
import { siteInfo } from '@/lib/site-info';
import { absoluteUrl, siteUrl } from '@/lib/site-url';
import prose from '@/views/blog/article.module.css';
import { jobDescriptionHtml, jobPostingSchema } from './jsonld';
import { careersMessages as m, formatDay } from './messages';
import { applyMailto, CAREERS_PATH, jobPath } from './paths';
import type { Job } from './schemas';
import s from './careers.module.css';

const SECTIONS = ['intro', 'description', 'requirements', 'benefits'] as const;

/**
 * /tuyen-dung/{slug}: one posting in a centred reading column. An open posting has the apply buttons (mailto with
 * the encoded subject) and its JobPosting schema; a closed or expired one shows a notice instead of both.
 */
export function JobView({ chrome, job }: { chrome: Chrome; job: Job }) {
  const path = jobPath(job.slug);
  const open = job.state === 'open';
  const mailto = applyMailto(job.applyEmail, job.title);
  const crumbs: Crumb[] = [
    { label: chrome.t.breadcrumb.home, href: homePath('vi') },
    { label: m.breadcrumb, href: CAREERS_PATH },
    { label: job.title, href: path },
  ];
  const facts = [
    { label: m.meta.department, value: job.department },
    { label: m.meta.location, value: job.location },
    { label: m.meta.employmentType, value: job.employmentType ? m.employmentType[job.employmentType] : null },
    { label: m.meta.deadline, value: job.deadline ? formatDay(job.deadline) : null },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));
  const sections = SECTIONS.flatMap((key) => {
    const html = job[`${key}Html`];
    return html ? [{ key, html }] : [];
  });

  const info = siteInfo(chrome.site);
  const schema = open
    ? jobPostingSchema(job, {
        url: absoluteUrl(path),
        org: { id: ORGANIZATION_ID, name: info.name, url: siteUrl, logo: info.logo ? `${siteUrl}${info.logo}` : null },
        description: jobDescriptionHtml(job, m.sections),
      })
    : null;

  return (
    <>
      <SolidHeader chrome={chrome} currentHref={CAREERS_PATH} />

      <main>
        <article className={s.job} aria-labelledby="job-title">
          <header className={s.reading}>
            <Breadcrumb onLight items={crumbs} label={chrome.t.breadcrumb.label} />
            <Eyebrow className={s.jobEyebrow}>{job.department}</Eyebrow>
            <h1 id="job-title" className={s.jobTitle}>{job.title}</h1>
            {!open && <p className={s.closedBadge}>{m.closedBadge}</p>}
            {job.summary && <p className={s.jobSummary}>{job.summary}</p>}
            {facts.length > 0 && (
              <dl className={s.facts}>
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {open ? (
              <div className={s.jobActions}>
                <ButtonLink href={mailto}>{m.apply}</ButtonLink>
              </div>
            ) : (
              <div className={s.closedNotice} role="status">
                <p className={s.closedNoticeTitle}>{m.closedNotice}</p>
                <p>{m.closedBody}</p>
              </div>
            )}
          </header>

          {open && sections.length > 0 && (
            <div className={s.reading}>
              {sections.map(({ key, html }) => (
                <section key={key} className={s.jobSection} aria-labelledby={`job-${key}`}>
                  <h2 id={`job-${key}`} className={s.jobSectionTitle}>{m.sections[key]}</h2>
                  <div className={`${prose.prose} ${s.jobProse}`} dangerouslySetInnerHTML={{ __html: html }} />
                </section>
              ))}
            </div>
          )}

          {open && (
            <section className={s.closing} aria-labelledby="job-closing-title">
              <div className={s.reading}>
                <h2 id="job-closing-title" className={s.closingTitle}>{m.closingTitle}</h2>
                <p className={s.closingBody}>{m.closingBody}</p>
                <ButtonLink href={mailto}>{m.closingCta}</ButtonLink>
                <p className={s.closingEmail}>
                  {m.emailLabel}: <a className={s.email} href={`mailto:${job.applyEmail}`}>{job.applyEmail}</a>
                </p>
              </div>
            </section>
          )}

          <div className={s.reading}>
            <p className={s.back}>
              <Link href={CAREERS_PATH} className={s.backLink}>
                <span aria-hidden="true">←</span> {m.back}
              </Link>
            </p>
          </div>
        </article>
      </main>

      <SiteFooter {...chrome} />

      {schema && <JsonLd data={schema} />}
    </>
  );
}
