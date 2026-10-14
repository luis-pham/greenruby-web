import { experiencePath, type Locale } from '@/lib/i18n';
import type { ExperienceSummary } from './data';
import type { ExperienceMessages } from './messages';

export const pad = (n: number) => String(n).padStart(2, '0');

export function experienceUrl(locale: Locale, item: Pick<ExperienceSummary, 'slug' | 'id'>): string {
  return experiencePath(locale, item.slug, item.id);
}

/** "Onboard experience" / "Outdoor experience" from the item's group tab. */
export function tabLabel(m: ExperienceMessages, item: ExperienceSummary): string {
  return item.group?.tab ? m.tabLabel[item.group.tab] : m.tabFallback;
}

/** Landscape card photo: the 16:9 cover first, then the portrait card image. */
export const cardImage = (item: ExperienceSummary) => item.cover ?? item.image;

/** "15:00 – 16:00", or null when the CMS has no times. */
export function timeRange(item: Pick<ExperienceSummary, 'startTime' | 'endTime'>): string | null {
  if (!item.startTime) return null;
  return item.endTime ? `${item.startTime} – ${item.endTime}` : item.startTime;
}

/** CMS durations are minutes stored as text ("90"). */
export function durationMinutes(item: Pick<ExperienceSummary, 'duration'>): number | null {
  const n = Number(item.duration);
  return item.duration && Number.isFinite(n) && n > 0 ? n : null;
}
