'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import s from './experience.module.css';

export type Photo = { src: string; alt: string; kicker: string; title: string };

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Photo grid (server-rendered via SSR of this client component) with a <dialog> lightbox.
 * The native dialog handles focus trapping and Escape; arrows step through the photos.
 */
export function PhotoJournal({
  photos,
  label,
  openLabel,
  closeLabel,
  previousLabel,
  nextLabel,
}: {
  photos: Photo[];
  label: string;
  openLabel: string[];
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const step = (delta: number) => setIndex((i) => (i === null ? 0 : (i + delta + photos.length) % photos.length));

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };

  const current = index === null ? null : photos[index];

  return (
    <>
      <div className={s.galleryGrid} data-count={Math.min(photos.length, 3)}>
        {photos.map((photo, i) => (
          <button key={photo.src + i} type="button" className={s.galleryBtn} aria-label={openLabel[i]} onClick={() => open(i)}>
            <Image src={photo.src} alt={photo.alt} fill sizes={i === 0 ? '(max-width: 850px) 100vw, 42vw' : '(max-width: 850px) 50vw, 30vw'} />
            <span className={s.expand} aria-hidden="true">↗</span>
            <span className={s.caption}>
              <small>{photo.kicker}</small>
              <strong>{photo.title}</strong>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={s.lightbox}
        aria-label={label}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
      >
        {current && index !== null && (
          <>
            <span className={s.lightboxCount}>{pad(index + 1)} / {pad(photos.length)}</span>
            <button type="button" className={s.lightboxClose} aria-label={closeLabel} onClick={() => dialog.current?.close()} autoFocus>
              ×
            </button>
            {photos.length > 1 && (
              <button type="button" className={s.lightboxPrev} aria-label={previousLabel} onClick={() => step(-1)}>
                ←
              </button>
            )}
            <figure className={s.lightboxFigure}>
              <div className={s.lightboxImage}>
                <Image src={current.src} alt={current.alt} fill sizes="90vw" quality={90} />
              </div>
              <figcaption>{current.title}</figcaption>
            </figure>
            {photos.length > 1 && (
              <button type="button" className={s.lightboxNext} aria-label={nextLabel} onClick={() => step(1)}>
                →
              </button>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
