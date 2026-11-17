// Recruitment URLs. The pages are Vietnamese only and live at the root (/tuyen-dung, no /vi prefix), rendered by
// the Vietnamese root layout (app/(vi)/tuyen-dung). Laravel's SitemapController::CAREERS_PATH mirrors the segment.

export const CAREERS_PATH = '/tuyen-dung';

export const jobPath = (slug: string) => `${CAREERS_PATH}/${slug}`;

/** Slugs the CMS generates: lowercase ASCII words joined by "-" (AppJobService::slugify). */
export const isJobSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

/** mailto: link with an encoded subject "Ứng tuyển – {title} – Green Ruby Cruises". */
export function applyMailto(email: string, title: string): string {
  const subject = `Ứng tuyển – ${title} – Green Ruby Cruises`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
