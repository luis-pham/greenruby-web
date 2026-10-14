'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import s from './home.module.css';

/** Horizontal scroll-snap track with prev/next buttons. Slides are server-rendered children. */
export function Carousel({
  label,
  count,
  caption,
  previous,
  next,
  children,
}: {
  label: string;
  count: number;
  caption: string;
  previous: string;
  next: string;
  children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: count <= 1 });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scroll = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: 'smooth' });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className={s.carouselToolbar}>
        <p className={s.carouselCaption}>
          {caption} <span aria-hidden="true">/</span> <strong>{String(count).padStart(2, '0')}</strong>
        </p>
        <div className={s.carouselControls}>
          <button type="button" className={s.carouselArrow} aria-label={previous} disabled={edges.start} onClick={() => scroll(-1)}>←</button>
          <button type="button" className={s.carouselArrow} aria-label={next} disabled={edges.end} onClick={() => scroll(1)}>→</button>
        </div>
      </div>
      <div className={s.carouselTrack} ref={track} onScroll={update} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}
