import Image from 'next/image';
import type { ReactNode } from 'react';
import { Eyebrow, SmartLink, TextLink } from '@/components/ui';
import s from './travel-links.module.css';

export type PlaceCard = { href: string; name: string; label?: string | null; summary?: string | null; image?: { src: string; alt: string } | null };
export type GuideCard = { href: string; title: string; body?: string | null };

/**
 * Cross-links between products and the travel guide: places visited on an itinerary or a ship's routes, the
 * experiences at a place, the guides on the home page. Server-rendered links only; the section is left out
 * when there is nothing to link.
 */
export function TravelLinksSection({
  id,
  eyebrow,
  title,
  lede,
  more,
  tinted,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  more?: { href: string; label: string } | null;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={tinted ? `${s.section} ${s.tinted}` : s.section} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className={s.head}>
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 id={`${id}-title`}>{title}</h2>
          </div>
          {lede && <p>{lede}</p>}
        </div>
        {children}
        {more && (
          <p className={s.more}>
            <TextLink href={more.href}>{more.label}</TextLink>
          </p>
        )}
      </div>
    </section>
  );
}

export function PlaceCards({ items }: { items: PlaceCard[] }) {
  return (
    <ul className={s.places}>
      {items.map((p) => (
        <li key={p.href}>
          <SmartLink href={p.href} className={s.place}>
            <span className={s.placePhoto}>
              {p.image && <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" />}
            </span>
            <span className={s.placeBody}>
              {p.label && <span className={s.label}>{p.label}</span>}
              <strong>{p.name}</strong>
              {p.summary && <span className={s.summary}>{p.summary}</span>}
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

export function GuideCards({ items }: { items: GuideCard[] }) {
  return (
    <ul className={s.guides}>
      {items.map((g) => (
        <li key={g.href}>
          <SmartLink href={g.href} className={s.guide}>
            <strong>{g.title}</strong>
            {g.body && <span>{g.body}</span>}
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

/** Compact inline list of links (e.g. "Where it happens" on an experience page). */
export function LinkChips({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className={s.chips}>
      {items.map((l) => (
        <li key={l.href}>
          <SmartLink href={l.href}>{l.label}</SmartLink>
        </li>
      ))}
    </ul>
  );
}
