import { getCabin, getCruise, getItinerary } from '@/lib/api/content';
import { detailPath, experiencePath, itineraryPath, parseDetailFile, sectionPath, type Locale, type Section } from '@/lib/i18n';
import { getExperience } from '@/views/experiences/data';

// GET /api/canonical?path=/vi/phong-nghi/old-slug-38.html -> { canonical: "/vi/phong-nghi/imperial-suite-38.html" }
// Used by src/proxy.ts to 308 renamed detail URLs before rendering: a redirect thrown while rendering a
// prerendered page is cached without its Location header. canonical is null for unknown entities.

const DETAIL_SECTIONS = ['cruise', 'cabin', 'itinerary', 'experiences'] as const satisfies readonly Section[];

async function canonicalFor(locale: Locale, section: (typeof DETAIL_SECTIONS)[number], file: string): Promise<string | null> {
  if (section === 'itinerary') {
    const m = /^(.+)-(\d+)-(\d+)\.html$/.exec(file);
    const it = m ? await getItinerary(Number(m[2]), Number(m[3]), locale) : null;
    return it ? itineraryPath(locale, it.canonical.slug, it.canonical.cruiseId, it.canonical.itineraryId) : null;
  }
  const parsed = parseDetailFile(file);
  if (!parsed) return null;
  if (section === 'experiences') {
    const x = await getExperience(parsed.id, locale);
    return x ? experiencePath(locale, x.canonicalSlug, x.id) : null;
  }
  const entity = section === 'cabin' ? await getCabin(parsed.id, locale) : await getCruise(parsed.id, locale);
  return entity ? detailPath(locale, section, entity.slug, entity.id) : null;
}

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path') ?? '';
  const slash = path.lastIndexOf('/');
  const dir = path.slice(0, slash);
  const file = path.slice(slash + 1);
  for (const locale of ['en', 'vi'] as const) {
    for (const section of DETAIL_SECTIONS) {
      if (dir === sectionPath(locale, section)) {
        return Response.json({ canonical: await canonicalFor(locale, section, file) });
      }
    }
  }
  return Response.json({ canonical: null });
}
