'use client';

import { useEffect, useState } from 'react';
import s from './experience.module.css';

/** In-page anchor links; highlights the section currently in view (plain anchors without JS). */
export function SectionNav({ links }: { links: { id: string; label: string }[] }) {
  const [active, setActive] = useState(links[0]?.id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -63% 0px', threshold: [0, 0.1, 0.5] },
    );
    links.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [links]);

  return (
    <div className={s.subnavLinks}>
      {links.map((link) => (
        <a key={link.id} href={`#${link.id}`} className={active === link.id ? s.subnavActive : undefined}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
