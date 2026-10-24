'use client';

import { useState, type ReactNode } from 'react';
import s from './layout.module.css';

/**
 * One footer menu. The heading is plain text (so crawlers read just the title); on phones a separate
 * disclosure button covers the heading row and toggles the list (accordion). From 601px up the list
 * is always shown and the button is not rendered visually. Links are always in the HTML.
 */
export function FooterColumn({ id, title, toggleLabel, children }: { id: string; title: string; toggleLabel: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={s.footerCol} aria-label={title} data-open={open || undefined}>
      <div className={s.footerColHead}>
        <h2>{title}</h2>
        <button
          type="button"
          className={s.footerToggle}
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${title}: ${toggleLabel}`}
          onClick={() => setOpen(!open)}
        >
          <span className={s.footerToggleIcon} aria-hidden="true" />
        </button>
      </div>
      <div id={id} className={s.footerColBody}>
        {children}
      </div>
    </nav>
  );
}
