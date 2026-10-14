'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Laravel served search results on the listing URL itself (/blog?k=…). The listing is now fully
 * static, so an old ?k= link is forwarded to the noindex search route. Renders nothing.
 */
export function SearchRedirect({ searchHref, category }: { searchHref: string; category?: string }) {
  const keyword = useSearchParams().get('k')?.trim();
  const router = useRouter();
  useEffect(() => {
    if (!keyword) return;
    const query = new URLSearchParams({ k: keyword, ...(category ? { category } : {}) });
    router.replace(`${searchHref}?${query}`);
  }, [keyword, category, searchHref, router]);
  return null;
}
