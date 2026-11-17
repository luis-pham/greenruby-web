import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { getContent } from '@/lib/api/client';
import { jobListSchema, jobSchema } from './schemas';

// Cached readers for GET /careers and GET /careers/{slug} (cms-develop app/Services/Content/CareerContentService.php).
// Vietnamese only: the endpoints take no ?lang. Drafts are never served; closed or expired postings answer with
// state 'closed'. Tags: 'careers' (admin "Tuyển dụng" saves), 'site' (the default application e-mail is a system
// config), 'content' (everything). cacheLife 'hours' also bounds how long a posting stays listed after its deadline.

export async function listJobs() {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'careers', 'site');
  const list = await getContent('/careers', {}, jobListSchema);
  if (!list) throw new Error('Careers list missing (GET /careers answered 404: CMS without the recruitment module?)');
  return list;
}

export async function getJob(slug: string) {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'careers', 'site', `career:${slug}`);
  return getContent(`/careers/${encodeURIComponent(slug)}`, {}, jobSchema);
}
