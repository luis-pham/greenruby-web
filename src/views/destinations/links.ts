// Which published destinations a product page links to. Only real relations from the CMS are used:
// app_destination_itinerary (itineraryIds) and app_destination_experience (experienceIds). The destination
// list only holds published places, and is empty while the hub is switched off, so nothing hidden is linked.

type Linkable = { slug: string; itineraryIds: number[]; experienceIds?: number[] };

/** Places an itinerary plans to stop at, in the CMS order of the destination list. */
export function placesOnItinerary<T extends Linkable>(items: T[], itineraryId: number): T[] {
  return items.filter((d) => d.itineraryIds.includes(itineraryId));
}

/** Places on any of a ship's itineraries (each place once). */
export function placesOnItineraries<T extends Linkable>(items: T[], itineraryIds: number[]): T[] {
  const ids = new Set(itineraryIds);
  return items.filter((d) => d.itineraryIds.some((id) => ids.has(id)));
}

/** Places where an experience takes place. */
export function placesForExperience<T extends Linkable>(items: T[], experienceId: number): T[] {
  return items.filter((d) => (d.experienceIds ?? []).includes(experienceId));
}

const PLACE_LINK = /<a\b[^>]*\bhref="(?:https:\/\/greenrubycruises\.com)?(\/(?:vi\/dia-diem-tham-quan|destinations)(?:\/[^"#?]*)?)(?:[?#][^"]*)?"[^>]*>([\s\S]*?)<\/a>/gi;

/**
 * CMS copy may link to a place that is not published yet (or to the hub while it is switched off). Those links
 * would 404, so they render as plain text until the page goes live; links to live places are left alone.
 * `livePaths`: hub path when it is on, plus every published destination path, of the page's language.
 */
export function unlinkHiddenPlaces(html: string | null, livePaths: ReadonlySet<string>): string | null {
  if (!html) return html;
  return html.replace(PLACE_LINK, (link, path: string, text: string) => (livePaths.has(path.replace(/\/$/, '')) ? link : text));
}
