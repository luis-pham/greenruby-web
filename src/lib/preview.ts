import 'server-only';
import { cookies, draftMode } from 'next/headers';
import type { z } from 'zod';

// Authenticated preview on the website (phase 1E-d; docs/i18n-audit/12 §8, amendment A-7).
// /_draft/enter (POST, token in the body) verifies a single-use CMS token server-to-server and stores the returned
// preview session in an httpOnly cookie, with Next draft mode on. Only then do the *For loaders read the CMS with
// the preview credential, through these functions: no 'use cache', fetch no-store, so draft data never enters a
// cache shared with anonymous visitors. Without both draft mode and the cookie every read is the public one.

export const PREVIEW_COOKIE = 'gr_preview';
const SESSION = /^[a-f0-9]{64}$/;

/** The preview session of this request, or null (anonymous, or draft mode off). */
export async function previewSession(): Promise<string | null> {
  const draft = await draftMode();
  if (!draft.isEnabled) return null;
  const value = (await cookies()).get(PREVIEW_COOKIE)?.value;
  return value && SESSION.test(value) ? value : null;
}

function cms() {
  const baseUrl = process.env.CONTENT_API_URL;
  const key = process.env.CONTENT_API_KEY;
  const previewKey = process.env.CONTENT_PREVIEW_KEY;
  if (!baseUrl || !key || !previewKey) return null;
  return { baseUrl: baseUrl.replace(/\/$/, ''), key, previewKey };
}

/** A Content API read as the preview session (uncached). null on 404, or when preview is not configured or refused. */
export async function previewContent<T extends z.ZodTypeAny>(
  session: string,
  path: string,
  query: Record<string, string | number | undefined>,
  schema: T,
): Promise<z.infer<T> | null> {
  const config = cms();
  if (!config) return null;
  const url = new URL(`${config.baseUrl}/api/v1/content${path}`);
  for (const [name, value] of Object.entries(query)) if (value !== undefined) url.searchParams.set(name, String(value));
  const res = await fetch(url, {
    cache: 'no-store',
    headers: { Accept: 'application/json', 'X-Content-Key': config.key, 'X-Preview-Key': config.previewKey, 'X-Preview-Session': session },
  });
  if (!res.ok) return null;
  return schema.parse(await res.json());
}

/** POST /api/v1/content/preview/verify: consumes the token; null when it is invalid, expired or replayed. */
export async function verifyPreviewToken(token: string): Promise<{ session: string; path: string | null; lang: string; expiresAt: string } | null> {
  const config = cms();
  if (!config || !/^[a-f0-9]{64}$/.test(token)) return null;
  const res = await fetch(`${config.baseUrl}/api/v1/content/preview/verify`, {
    method: 'POST',
    cache: 'no-store',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-Content-Key': config.key, 'X-Preview-Key': config.previewKey },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { session?: unknown; path?: unknown; lang?: unknown; expiresAt?: unknown };
  return typeof data.session === 'string' && SESSION.test(data.session)
    ? { session: data.session, path: typeof data.path === 'string' ? data.path : null, lang: String(data.lang ?? ''), expiresAt: String(data.expiresAt ?? '') }
    : null;
}
