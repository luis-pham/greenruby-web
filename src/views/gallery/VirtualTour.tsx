'use client';

import { lazy, Suspense, useState, type MouseEvent, type ReactNode } from 'react';

export type ViewerLabels = { label: string; close: string; loading: string; unsupported: string; hint: string };

// WebGL viewer code (and the video itself) load only when a visitor opens a tour.
const Viewer360 = lazy(() => import('./Viewer360'));

/**
 * Wraps the server-rendered 360° posters. Each poster links to the video file (works without JS);
 * with JS, clicking `[data-tour]` opens the interactive viewer.
 */
export function VirtualTour({
  tours,
  labels,
  className,
  children,
}: {
  tours: { src: string }[];
  labels: ViewerLabels;
  className?: string;
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [opener, setOpener] = useState<HTMLElement | null>(null);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-tour]');
    if (!link) return;
    event.preventDefault();
    setOpener(link);
    setIndex(Number(link.dataset.tour));
  };

  const tour = index === null ? null : tours[index];
  return (
    <>
      <div className={className} onClick={onClick}>
        {children}
      </div>
      {tour && (
        <Suspense fallback={null}>
          <Viewer360
            src={tour.src}
            labels={labels}
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
