import type { EmploymentType, Job } from './schemas';

// schema.org JobPosting for one OPEN posting (Google job search: developers.google.com/search/docs/appearance/structured-data/job-posting).
// Only real CMS values are used; when a required property is missing (datePosted, a description, a work location)
// no JobPosting is emitted at all rather than an incomplete or invented one. Closed/expired postings get none.

const SCHEMA_TYPES: Record<EmploymentType, string> = {
  'full-time': 'FULL_TIME',
  'part-time': 'PART_TIME',
  contract: 'CONTRACTOR',
  temporary: 'TEMPORARY',
  intern: 'INTERN',
};

type Org = { id: string; name: string; url: string; logo: string | null };

/** The page's sections as one HTML description (Google accepts p, ul, li, strong, h-tags). */
export function jobDescriptionHtml(job: Job, headings: Record<'intro' | 'description' | 'requirements' | 'benefits', string>): string | null {
  const parts = (
    [
      ['intro', job.introHtml],
      ['description', job.descriptionHtml],
      ['requirements', job.requirementsHtml],
      ['benefits', job.benefitsHtml],
    ] as const
  ).flatMap(([key, html]) => (html ? [`<p><strong>${headings[key]}</strong></p>${html}`] : []));
  if (parts.length === 0) return job.summary ? `<p>${escapeHtml(job.summary)}</p>` : null;
  return [job.summary ? `<p>${escapeHtml(job.summary)}</p>` : '', ...parts].join('');
}

export function jobPostingSchema(job: Job, { url, org, description }: { url: string; org: Org; description: string | null }): Record<string, unknown> | null {
  if (job.state !== 'open' || !job.postedAt || !description) return null;
  const { locality, region } = job.address;
  if (!locality && !region) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description,
    datePosted: job.postedAt,
    // End of the last day to apply, Vietnam time (the CMS deadline is inclusive).
    ...(job.deadline && { validThrough: `${job.deadline}T23:59:59+07:00` }),
    ...(job.employmentType && { employmentType: SCHEMA_TYPES[job.employmentType] }),
    hiringOrganization: {
      '@type': 'Organization',
      '@id': org.id,
      name: org.name,
      sameAs: org.url,
      ...(org.logo && { logo: org.logo }),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        ...(locality && { addressLocality: locality }),
        ...(region && { addressRegion: region }),
        addressCountry: 'VN',
      },
    },
    url,
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
