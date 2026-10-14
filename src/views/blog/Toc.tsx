'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from './headings';

/** Table of contents with scrollspy. The links are server-rendered; JS only adds the active state. */
export function Toc({ items, label, className, activeClass, numbered }: { items: TocItem[]; label: string; className: string; activeClass: string; numbered?: boolean }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;
    const update = () => {
      let current: string | null = null;
      for (const heading of headings) if (heading.getBoundingClientRect().top <= 140) current = heading.id;
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [items]);

  let h2 = 0;
  return (
    <nav className={className} aria-label={label}>
      {items.map((item) => {
        if (item.level === 2) h2++;
        return (
          <a key={item.id} href={`#${item.id}`} data-level={item.level} className={item.id === active ? activeClass : undefined} aria-current={item.id === active ? 'location' : undefined}>
            {numbered && item.level === 2 && <span aria-hidden="true">{String(h2).padStart(2, '0')}</span>}
            {item.text}
          </a>
        );
      })}
    </nav>
  );
}
