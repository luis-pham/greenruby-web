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
  // Booking and payment calls go from the browser to Laravel. In production Nginx routes these paths to
  // Laravel; locally the dev/prod server proxies them. /api/revalidate stays on Next.
  // Rewrites are baked in at build time, so LARAVEL_ORIGIN must be set for `next build`.
  async rewrites() {
    const origin = (process.env.LARAVEL_ORIGIN || process.env.CONTENT_API_URL || '').replace(/\/+$/, '');
    if (!origin) return [];
    return [
      { source: '/api/booking/:path*', destination: `${origin}/api/booking/:path*` },
      { source: '/api/payment/:path*', destination: `${origin}/api/payment/:path*` },
      { source: '/payment/sepay/form', destination: `${origin}/payment/sepay/form` },
    ];
  },
  images: {
    // Images are resized by the Laravel /thumbnail proxy (WebP + disk cache), not by Next.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    qualities: [75, 80, 85, 90],
    // Capped at 1920: the Laravel proxy decodes originals with GD (256 MB limit), and 2048/3840 variants
    // of large PNGs fail there. 1920 still covers full-width heroes on retina laptops.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
  },
};

export default nextConfig;
