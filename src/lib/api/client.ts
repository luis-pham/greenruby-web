import 'server-only';
import type { z } from 'zod';

export class ContentApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

function config() {
  const baseUrl = process.env.CONTENT_API_URL;
  const key = process.env.CONTENT_API_KEY;
  if (!baseUrl || !key) {
    throw new Error('CONTENT_API_URL and CONTENT_API_KEY must be set (see .env.example)');
  }
  return { baseUrl: baseUrl.replace(/\/$/, ''), key };
}

function contentUrl(path: string, query: Record<string, string | number | undefined> = {}): string {
  const url = new URL(`${config().baseUrl}/api/v1/content${path}`);
  for (const [name, value] of Object.entries(query)) {
    if (value !== undefined) url.searchParams.set(name, String(value));
  }
  return url.toString();
}

/** GET a Content API resource and validate it. Returns null on 404. */
export async function getContent<T extends z.ZodTypeAny>(
  path: string,
  query: Record<string, string | number | undefined>,
  schema: T,
): Promise<z.infer<T> | null> {
  const res = await fetch(contentUrl(path, query), {
    headers: { Accept: 'application/json', 'X-Content-Key': config().key },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new ContentApiError(`Content API ${path} responded ${res.status}`, res.status);
  return schema.parse(await res.json());
}

/** POST to the Content API. Returns status and parsed JSON body (never throws on 4xx). */
export async function postContent(path: string, body: unknown): Promise<{ status: number; data: unknown }> {
  const res = await fetch(contentUrl(path), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Content-Key': config().key,
    },
    body: JSON.stringify(body),
  });
  const data: unknown = await res.json().catch(() => null);
  return { status: res.status, data };
}
