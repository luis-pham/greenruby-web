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
      // Relative Location, like the pages' own redirects: behind Nginx request.url may carry the internal host.
      return new NextResponse(null, { status: 308, headers: { Location: canonical + request.nextUrl.search } });
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
