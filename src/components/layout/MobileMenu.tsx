'use client';

import { useRef, type ReactNode } from 'react';
import s from './layout.module.css';

/** <details> disclosure (works without JS); closes itself when a link inside is followed. */
export function MobileMenu({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      ref={ref}
      className={s.mobileMenu}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a')) ref.current?.removeAttribute('open');
      }}
    >
      <summary aria-label={label}>☰</summary>
      <div className={s.mobilePanel}>{children}</div>
    </details>
  );
}
