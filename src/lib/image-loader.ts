'use client';

import type { ImageLoaderProps } from 'next/image';

const mediaOrigin = process.env.NEXT_PUBLIC_MEDIA_ORIGIN ?? '';

// Maps next/image requests onto the Laravel thumbnail proxy:
//   /upload/2026/03/10/a.png  ->  {origin}/thumbnail/upload/2026/03/10/a.png?w=960&q=80
// Absolute URLs and SVGs are passed through unchanged.
export default function thumbnailLoader({ src, width, quality }: ImageLoaderProps): string {
  if (/^https?:\/\//.test(src) || src.endsWith('.svg')) return src;
  const path = src.startsWith('/') ? src : `/${src}`;
  return `${mediaOrigin}/thumbnail${path}?w=${width}&q=${quality ?? 80}`;
}
