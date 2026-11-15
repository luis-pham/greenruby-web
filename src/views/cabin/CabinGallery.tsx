'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { byLocale, type Locale } from '@/lib/i18n';
import s from './cabin.module.css';

type Photo = { src: string; alt?: string | null };

type Copy = { previous: string; next: string; show: (n: number, total: number) => string; thumbs: string; photo: (name: string, n: number, total: number) => string };

const COPY = byLocale<Copy>({
  en: { previous: 'Previous photo', next: 'Next photo', show: (n, t) => `Show photo ${n} of ${t}`, thumbs: 'Choose a photo', photo: (name, n, t) => `${name}, photo ${n} of ${t}` },
  vi: { previous: 'Ảnh trước', next: 'Ảnh tiếp theo', show: (n, t) => `Xem ảnh ${n} trên ${t}`, thumbs: 'Chọn ảnh', photo: (name, n, t) => `${name}, ảnh ${n}/${t}` },
  ja: { previous: '前の写真', next: '次の写真', show: (n, t) => `写真 ${n} / ${t} を表示`, thumbs: '写真を選択', photo: (name, n, t) => `${name} 写真 ${n} / ${t}` },
  fr: { previous: 'Photo précédente', next: 'Photo suivante', show: (n, t) => `Afficher la photo ${n} sur ${t}`, thumbs: 'Choisir une photo', photo: (name, n, t) => `${name}, photo ${n} sur ${t}` },
  es: { previous: 'Foto anterior', next: 'Foto siguiente', show: (n, t) => `Ver la foto ${n} de ${t}`, thumbs: 'Elegir una foto', photo: (name, n, t) => `${name}, foto ${n} de ${t}` },
  de: { previous: 'Vorheriges Foto', next: 'Nächstes Foto', show: (n, t) => `Foto ${n} von ${t} anzeigen`, thumbs: 'Foto auswählen', photo: (name, n, t) => `${name}, Foto ${n} von ${t}` },
  ko: { previous: '이전 사진', next: '다음 사진', show: (n, t) => `사진 ${n}/${t} 보기`, thumbs: '사진 선택', photo: (name, n, t) => `${name} 사진 ${n}/${t}` },
});

/** One large photo with a row of thumbnails underneath; a thumbnail (or the arrows / arrow keys) changes the large photo. */
export function CabinGallery({ photos, name, ship, locale }: { photos: Photo[]; name: string; ship?: string; locale: Locale }) {
  const [current, setCurrent] = useState(0);
  const thumbs = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const c = COPY[locale];
  const total = photos.length;
  // The CMS gives most gallery photos the cabin name as alt text; each one gets its own ("Imperial Suite – Green Ruby 1,
  // photo 3 of 10") unless an editor wrote a real description.
  const label = ship ? `${name} – ${ship}` : name;
  const altOf = (p: Photo, i: number) => (p.alt && p.alt.trim() !== name ? p.alt : i === 0 ? label : c.photo(label, i + 1, total));

  const show = (i: number) => {
    const next = (i + total) % total;
    setCurrent(next);
    // Keep the active thumbnail in view without moving the page.
    const el = thumbs.current?.children[next] as HTMLElement | undefined;
    if (el && thumbs.current) thumbs.current.scrollTo({ left: el.offsetLeft - thumbs.current.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  };

  // The slide nearest the track's scroll position is the current one.
  const onSwipe = () => {
    const el = track.current;
    if (!el || el.clientWidth === 0) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== current && i >= 0 && i < total) setCurrent(i);
  };

  const photo = photos[current];
  return (
    <div
      className={s.viewer}
      // Arrow keys while focus is on an arrow or a thumbnail.
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
      }}
    >
      <div className={s.viewerDesktop}>
      <figure className={s.viewerMain}>
        <Image key={photo.src} src={photo.src} alt={altOf(photo, current)} fill sizes="(max-width: 1300px) 94vw, 1208px" quality={82} className={s.viewerImage} />
        {total > 1 && (
          <>
            <button type="button" className={`${s.viewerArrow} ${s.viewerPrev}`} onClick={() => show(current - 1)} aria-label={c.previous}>
              <span aria-hidden="true">‹</span>
            </button>
            <button type="button" className={`${s.viewerArrow} ${s.viewerNext}`} onClick={() => show(current + 1)} aria-label={c.next}>
              <span aria-hidden="true">›</span>
            </button>
            <figcaption className={s.viewerCount} aria-live="polite">
              {current + 1} / {total}
            </figcaption>
          </>
        )}
      </figure>
      {total > 1 && (
        <div className={s.viewerThumbs} ref={thumbs} role="group" aria-label={c.thumbs}>
          {photos.map((p, i) => (
            <button
              key={p.src + i}
              type="button"
              className={s.viewerThumb}
              aria-label={c.show(i + 1, total)}
              aria-current={i === current ? 'true' : undefined}
              onClick={() => show(i)}
            >
              <Image src={p.src} alt="" fill sizes="160px" quality={60} />
            </button>
          ))}
        </div>
      )}
      </div>

      {/* Phones: a swipeable carousel (scroll snap) with a counter and dots. */}
      <div className={s.viewerMobile}>
        <div className={s.viewerTrack} ref={track} onScroll={onSwipe}>
          {photos.map((p, i) => (
            <figure key={p.src + i} className={s.viewerSlide} aria-label={c.show(i + 1, total)}>
              <Image src={p.src} alt={altOf(p, i)} fill sizes="100vw" quality={75} />
            </figure>
          ))}
        </div>
        {total > 1 && (
          <>
            <span className={s.viewerCount} aria-live="polite">
              {current + 1} / {total}
            </span>
            <div className={s.viewerDots} role="group" aria-label={c.thumbs}>
              {photos.map((p, i) => (
                <button
                  key={p.src + i}
                  type="button"
                  className={s.viewerDot}
                  aria-label={c.show(i + 1, total)}
                  aria-current={i === current ? 'true' : undefined}
                  onClick={() => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' })}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
