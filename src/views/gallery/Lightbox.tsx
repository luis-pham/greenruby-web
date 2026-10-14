'use client';

import { useEffect, useRef } from 'react';
import type { LightboxLabels, Slide } from './GalleryGrid';
import s from './gallery.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

/** Modal photo viewer on a native <dialog> (focus trap, Esc and inert background come for free). */
export default function Lightbox({
  slides,
  index,
  labels,
  onIndex,
  onClose,
}: {
  slides: Slide[];
  index: number;
  labels: LightboxLabels;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const slide = slides[index];
  const go = (step: number) => onIndex((index + step + slides.length) % slides.length);

  useEffect(() => {
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!slide) return null;

  return (
    <dialog
      ref={dialog}
      className={s.lightbox}
      aria-label={labels.label}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        else if (e.key === 'ArrowRight') go(1);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={s.lightboxBar}>
        <span className={s.lightboxCount} aria-live="polite">{pad(index + 1)} / {pad(slides.length)}</span>
        <button type="button" className={s.lightboxClose} onClick={onClose} autoFocus>
          {labels.close} <span aria-hidden="true">✕</span>
        </button>
      </div>
      <div className={s.lightboxMain}>
        <button type="button" className={s.lightboxArrow} onClick={() => go(-1)} aria-label={labels.previous} disabled={slides.length < 2}>←</button>
        <div className={s.lightboxImage}>
          {/* The large image comes straight from the thumbnail proxy at 1920px; next/image would add nothing here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={slide.src} src={slide.src} alt={slide.alt} />
        </div>
        <button type="button" className={s.lightboxArrow} onClick={() => go(1)} aria-label={labels.next} disabled={slides.length < 2}>→</button>
      </div>
      <p className={s.lightboxFooter}>
        <strong>{slide.caption}</strong>
        <span>{slide.alt}</span>
      </p>
    </dialog>
  );
}
