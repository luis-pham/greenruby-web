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
  // Laravel served English without a prefix and 301'd any /en/... URL to it; keep those links working.
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      // Early drafts of the brand facts page used /about/brand-facts.
      { source: '/about/brand-facts', destination: '/about-us/brand-facts', permanent: true },
      // VI destinations section renamed 2026-10-24 (Điểm đến → Địa điểm tham quan).
      { source: '/vi/diem-den', destination: '/vi/dia-diem-tham-quan', permanent: true },
      { source: '/vi/diem-den/:slug', destination: '/vi/dia-diem-tham-quan/:slug', permanent: true },
      // Destination slug renamed 2026-10-24.
      { source: '/destinations/titop-island', destination: '/destinations/ti-top-island', permanent: true },
      { source: '/destinations/dark-and-bright-cave', destination: '/destinations/dark-bright-cave', permanent: true },
    ];
  },
  async rewrites() {
    const origin = (process.env.LARAVEL_ORIGIN || process.env.CONTENT_API_URL || '').replace(/\/+$/, '');
    if (!origin) return [];
    return [
      { source: '/api/booking/:path*', destination: `${origin}/api/booking/:path*` },
      { source: '/api/payment/:path*', destination: `${origin}/api/payment/:path*` },
      { source: '/payment/sepay/form', destination: `${origin}/payment/sepay/form` },
    ];
  },
  // Baseline security headers (Screaming Frog / Lighthouse). CSP only restricts framing and upgrades
  // http subresources: a script allow-list would need GTM, chat and payment origins audited first.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; upgrade-insecure-requests" },
        ],
      },
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
