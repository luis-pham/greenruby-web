import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSite } from '@/lib/api/content';
import { homePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { CareersView } from './CareersView';
import { getJob, listJobs } from './data';
import { JobView } from './JobView';
import { careersMessages as m } from './messages';
import { CAREERS_PATH, isJobSlug, jobPath } from './paths';

// Route logic for /tuyen-dung and /tuyen-dung/{slug} (app/(vi)/tuyen-dung): Vietnamese only, rendered with the
// Vietnamese layout, no hreflang counterpart (the language switcher's English flag goes to the English home).
//   listing  open postings in CMS order; an empty list shows a notice (the page stays indexable)
//   detail   open → 200 + JobPosting; closed/expired → 200 noindex with a closed notice; draft/unknown → 404

const chrome = async () => ({ locale: 'vi' as const, site: await getSite('vi'), t: getMessages('vi'), alternateHref: homePath('en') });

export function careersRoute() {
  async function generateMetadata(): Promise<Metadata> {
    const site = await getSite('vi');
    return pageMetadata({ locale: 'vi', site: siteInfo(site), title: m.metaTitle, description: m.metaDescription, path: CAREERS_PATH });
  }

  async function Page() {
    const [c, list] = await Promise.all([chrome(), listJobs()]);
    return <CareersView chrome={c} list={list} />;
  }

  return { generateMetadata, Page };
}

type Params = { params: Promise<{ slug: string }> };

/** Never a real job slug (slugs are lowercase words joined by hyphens): keeps ensureStatic happy with no postings. */
const NO_JOBS_PLACEHOLDER = '_none';

const loadJob = async (slug: string) => (isJobSlug(slug) ? getJob(slug) : null);

export function jobRoute() {
  async function generateStaticParams() {
    const { items } = await listJobs();
    return items.length > 0 ? items.map((job) => ({ slug: job.slug })) : [{ slug: NO_JOBS_PLACEHOLDER }];
  }

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const job = await loadJob((await params).slug);
    if (!job) return {};
    const site = await getSite('vi');
    return pageMetadata({
      locale: 'vi',
      site: siteInfo(site),
      title: job.seo.title ?? m.jobMetaTitle(job.title),
      description: job.seo.description ?? m.jobMetaDescription(job.title, job.department),
      path: jobPath(job.slug),
      // A closed posting keeps its URL for people who saved it, but leaves the index (and Google Jobs).
      noIndex: job.state !== 'open',
    });
  }

  // Awaited outside <Suspense> so the status (200/404) is known before anything streams.
  async function Page({ params }: Params) {
    const job = await loadJob((await params).slug);
    if (!job) notFound();
    return <JobView chrome={await chrome()} job={job} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
