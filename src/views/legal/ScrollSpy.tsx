'use client';

import { useEffect } from 'react';

/**
 * Progressive enhancement for the server-rendered "On this page" index: marks the link of the
 * section in view with aria-current, and closes the mobile <details> index after a jump.
 */
export function ScrollSpy({ tocId, mobileTocId }: { tocId: string; mobileTocId: string }) {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(`#${tocId} a[href^="#"]`));
    const targets = links
      .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
      .filter((el): el is HTMLElement => el !== null);

    const mark = (id: string) => {
      for (const a of links) {
        if (a.hash.slice(1) === id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      }
    };

    let observer: IntersectionObserver | undefined;
    if (targets.length > 0 && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) mark(visible[0].target.id);
        },
        { rootMargin: '-5% 0px -72% 0px', threshold: 0 },
      );
      targets.forEach((el) => observer?.observe(el));
    }

    const mobile = document.getElementById(mobileTocId);
    const close = (event: Event) => {
      if ((event.target as Element).closest('a') && mobile instanceof HTMLDetailsElement) mobile.open = false;
    };
    mobile?.addEventListener('click', close);

    return () => {
      observer?.disconnect();
      mobile?.removeEventListener('click', close);
    };
  }, [tocId, mobileTocId]);

  return null;
}
