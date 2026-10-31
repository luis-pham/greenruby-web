import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { getContent } from './client';
import { localesSchema } from './contract';

/**
 * GET /locales (phase 1B): the CMS language registry, incl. which languages are effectively public. Cached for
 * minutes, not hours: closing a language (status change, hold-back, an instance's manifest) must reach the pages
 * that use it (intl pages, and en/vi pages whose group has an intl member) within about a minute even when no
 * revalidation call arrives. en/vi pages without an intl member never call it.
 */
export async function getLocales() {
  'use cache';
  cacheLife('minutes');
  cacheTag('content', 'locales');
  return getContent('/locales', {}, localesSchema);
}
