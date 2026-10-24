// Planning maths for the transfer selector. All durations are estimates (ranges in minutes), never
// schedules. The selector suggests a departure window with a margin; it never states a "latest safe"
// time or a flight time, and gives no duration where the route has not been checked (Cat Bi, Van Don).

/** Planned check-in at the Tuan Chau lounge (published itineraries: from about 10:45). Provisional. */
export const CHECK_IN = '10:45';
/** Planned disembarkation window at Tuan Chau on the final day (published itineraries). Provisional. */
export const DISEMBARK: [string, string] = ['11:00', '11:30'];
/** Margin added on top of the longer road estimate: [minimum, recommended]. */
export const MARGIN_MINUTES: [number, number] = [30, 60];
/** CAAV guidance: be at the airport at least 2 h (domestic) / 3 h (international) before departure. */
export const AIRPORT_HOURS = { domestic: 2, international: 3 } as const;

export type Origin = 'hanoi' | 'noibai' | 'catbi' | 'vandon' | 'ninhbinh';

/**
 * Door-to-door road time to Tuan Chau in minutes [typical, long], or null where we do not publish a
 * figure because it depends too much on the route and the provider.
 */
export const ROAD_MINUTES: Record<Origin, [number, number] | null> = {
  hanoi: [150, 180],
  noibai: [150, 210],
  catbi: null,
  vandon: null,
  ninhbinh: [210, 240],
};

/** Shared limousine vans add hotel pick-ups and a rest stop. Only offered from Hanoi city. */
export const SHUTTLE_EXTRA_MINUTES = 30;

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function toClock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/** Rounds down to the quarter hour, so suggestions don't look more precise than they are. */
const quarter = (minutes: number) => Math.floor(minutes / 15) * 15;

/**
 * Suggested departure window for the 10:45 check-in: the longer road estimate plus the recommended
 * margin (earlier end) or the minimum margin (later end). Null when no road estimate is published.
 */
export function departureWindow(origin: Origin, shuttle = false): [string, string] | null {
  const road = ROAD_MINUTES[origin];
  if (!road) return null;
  const long = road[1] + (shuttle ? SHUTTLE_EXTRA_MINUTES : 0);
  const checkIn = toMinutes(CHECK_IN);
  return [toClock(quarter(checkIn - long - MARGIN_MINUTES[1])), toClock(quarter(checkIn - long - MARGIN_MINUTES[0]))];
}

/** Estimated arrival range back at the origin on the last day (earliest disembark + typical, latest + long). */
export function returnWindow(origin: Origin): [string, string] | null {
  const road = ROAD_MINUTES[origin];
  if (!road) return null;
  return [toClock(toMinutes(DISEMBARK[0]) + road[0]), toClock(toMinutes(DISEMBARK[1]) + road[1])];
}
