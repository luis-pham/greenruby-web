import type { PlaceCard } from '@/components/sections/TravelLinks';
import { destinationPath, type Locale } from '@/lib/i18n';
import type { DestinationSummary } from './data';
import { destinationMessages } from './messages';

/** A destination as a cross-link card: "Bay · Type", name, one-line summary, photo. */
export function placeCard(locale: Locale, d: DestinationSummary): PlaceCard {
  const m = destinationMessages[locale];
  return {
    href: destinationPath(locale, d.slug),
    name: d.name,
    label: `${m.bays[d.bay]} · ${m.category[d.category]}`,
    summary: d.summary,
    image: d.image ? { src: d.image.src, alt: d.image.alt } : null,
  };
}
