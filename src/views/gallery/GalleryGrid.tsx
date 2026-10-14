'use client';

import { lazy, Suspense, useState, type MouseEvent, type ReactNode } from 'react';

export type Slide = { src: string; alt: string; caption: string };
export type LightboxLabels = { label: string; close: string; previous: string; next: string };

// The viewer's code is only fetched the first time someone opens a photo.
const Lightbox = lazy(() => import('./Lightbox'));

/**
 * Wraps the server-rendered photo grid. Each card is a plain link to the large image (works without JS);
 * with JS, clicks on `[data-slide]` links open the lightbox instead.
 */
export function GalleryGrid({
  slides,
  labels,
  className,
  children,
}: {
  slides: Slide[];
  labels: LightboxLabels;
  className?: string;
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [opener, setOpener] = useState<HTMLElement | null>(null);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-slide]');
    if (!link) return;
    event.preventDefault();
    setOpener(link);
    setIndex(Number(link.dataset.slide));
  };

  return (
    <>
      <div className={className} onClick={onClick}>
        {children}
      </div>
      {index !== null && (
        <Suspense fallback={null}>
          <Lightbox
            slides={slides}
            index={index}
            labels={labels}
            onIndex={setIndex}
            onClose={() => {
              setIndex(null);
              // After the dialog unmounts, so focus isn't lost to <body>.
              requestAnimationFrame(() => opener?.focus());
            }}
          />
        </Suspense>
      )}
    </>
  );
}
