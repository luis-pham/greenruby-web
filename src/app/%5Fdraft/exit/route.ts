import { cookies, draftMode } from 'next/headers';
import { PREVIEW_COOKIE } from '@/lib/preview';

// GET /_draft/exit: ends the preview (draft mode off, session cookie removed) and returns to the public site.
export async function GET(request: Request) {
  (await draftMode()).disable();
  (await cookies()).delete(PREVIEW_COOKIE);
  const back = new URL(request.url).searchParams.get('to');
  const location = back && back.startsWith('/') && !back.startsWith('//') ? back : '/';
  return new Response(null, { status: 303, headers: { Location: location, 'Cache-Control': 'private, no-store' } });
}
