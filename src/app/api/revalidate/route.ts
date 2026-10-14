import { revalidateTag } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';

// Called by Laravel after an admin saves content:
//   POST /api/revalidate  { "secret": "...", "tags": ["cabin:24", "cabins"] }
// Stale pages keep being served while fresh ones render in the background.

const matches = (given: string, expected: string) => {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return Response.json({ error: 'revalidate_not_configured' }, { status: 503 });

  const body = (await request.json().catch(() => null)) as { secret?: unknown; tags?: unknown } | null;
  if (typeof body?.secret !== 'string' || !matches(body.secret, expected)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === 'string' && t.length <= 100) : [];
  if (tags.length === 0) return Response.json({ error: 'no_tags' }, { status: 422 });

  for (const tag of tags) revalidateTag(tag, 'max');
  return Response.json({ revalidated: tags });
}
