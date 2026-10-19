import { NextResponse, type NextRequest } from 'next/server';

// Renamed CMS entities change their slug. The pages 308 old slugs themselves, but when the old URL was
// prerendered that redirect gets cached without a Location header, so redirect here, before rendering.
// Fails open: any error or timeout lets the page handle the request as before.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.endsWith('.html')) return NextResponse.next();
  try {
    const url = `http://127.0.0.1:${process.env.PORT ?? 3000}/api/canonical?path=${encodeURIComponent(pathname)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
    const { canonical } = (await res.json()) as { canonical: string | null };
    if (canonical && canonical !== pathname) {
      // Proxy redirects must be absolute. Behind Nginx, rebuild the public origin from the forwarded headers.
      const proto = request.headers.get('x-forwarded-proto')?.split(',')[0] ?? request.nextUrl.protocol.replace(':', '');
      const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? request.nextUrl.host;
      return NextResponse.redirect(`${proto}://${host}${canonical}${request.nextUrl.search}`, 308);
    }
  } catch {
    // fall through
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cruise/:file',
    '/cabin/:file',
    '/itinerary/:file',
    '/experiences/:file',
    '/vi/du-thuyen/:file',
    '/vi/phong-nghi/:file',
    '/vi/hanh-trinh/:file',
    '/vi/hoat-dong-trai-nghiem/:file',
  ],
};
