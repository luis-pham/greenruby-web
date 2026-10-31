import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { timingSafeEqual } from 'node:crypto';
import { frontendManifest, routesFromAppPaths } from '@/lib/i18n-manifest';
import { appRoutes } from '@/lib/routes.generated';
import { hasDictionary } from '@/messages';

// Internal: the CMS pulls this from each web instance (http://green-ruby-web:3000/api/i18n/manifest) to decide whether
// a new language may be public (docs/i18n-audit/phase-1/1b-report.md). Nginx sends every public /api/* request to
// Laravel, so this is reachable only on the private network, and it also requires FRONTEND_MANIFEST_SECRET.

const matches = (given: string, expected: string) => {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

function buildId(): string {
  try {
    return readFileSync(join(process.cwd(), '.next', 'BUILD_ID'), 'utf8').trim() || 'unknown';
  } catch {
    return 'unknown';
  }
}

/** The routes this build really contains (its app-paths manifest); the generated registry when that is unreadable. */
function builtRoutes(): readonly string[] {
  try {
    const routes = routesFromAppPaths(JSON.parse(readFileSync(join(process.cwd(), '.next', 'server', 'app-paths-manifest.json'), 'utf8')));
    return routes.length > 0 ? routes : appRoutes;
  } catch {
    return appRoutes;
  }
}

export async function GET(request: Request) {
  const expected = process.env.FRONTEND_MANIFEST_SECRET;
  if (!expected) return Response.json({ error: 'manifest_not_configured' }, { status: 503 });
  if (!matches(request.headers.get('x-manifest-key') ?? '', expected)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  return Response.json(frontendManifest(buildId(), { routes: builtRoutes(), dictionary: hasDictionary }), { headers: { 'Cache-Control': 'no-store' } });
}
