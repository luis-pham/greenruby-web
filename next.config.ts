import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  output: 'standalone',
  poweredByHeader: false,
  experimental: {
    // Two root layouts (app/(en), app/(vi)) means unmatched URLs need app/global-not-found.tsx.
    globalNotFound: true,
  },
  images: {
    // Images are resized by the Laravel /thumbnail proxy (WebP + disk cache), not by Next.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    qualities: [75, 80, 85, 90],
  },
};

export default nextConfig;
