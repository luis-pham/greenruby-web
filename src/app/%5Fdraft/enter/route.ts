import { cookies, draftMode } from 'next/headers';
import { PREVIEW_COOKIE, verifyPreviewToken } from '@/lib/preview';

// POST /_draft/enter (amendment A-7: never under /api/*, which Nginx sends to Laravel). The CMS posts the single-use
// preview token in the form body (never a URL: no access log, referrer or analytics sees it). The token is verified
// server-to-server; the preview session goes into an httpOnly cookie and Next draft mode is enabled for this browser.

const noStore = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' };

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const token = form?.get('token');
  const verified = typeof token === 'string' ? await verifyPreviewToken(token) : null;
  if (!verified || !verified.path?.startsWith('/')) {
    return new Response('Preview link invalid, expired or already used. Open the preview again from the CMS.', { status: 403, headers: noStore });
  }
  (await draftMode()).enable();
  const maxAge = Math.max(60, Math.min(1800, Math.floor((Date.parse(verified.expiresAt) - Date.now()) / 1000) || 1800));
  (await cookies()).set(PREVIEW_COOKIE, verified.session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
  return new Response(null, { status: 303, headers: { ...noStore, Location: verified.path } });
}

export function GET() {
  return new Response('Method Not Allowed', { status: 405, headers: { ...noStore, Allow: 'POST' } });
}
