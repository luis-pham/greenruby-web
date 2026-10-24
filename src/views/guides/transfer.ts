// Planning maths for the transfer selector. All durations are estimates (ranges in minutes), never
// schedules: the selector only turns them into "leave by" and "earliest flight" suggestions.

/** Planned check-in at the Tuan Chau lounge (published itineraries: from about 10:45). */
export const CHECK_IN = '10:45';
/** Latest planned disembarkation at Tuan Chau on the final day (published itineraries: about 11:00–11:30). */
export const DISEMBARK = '11:30';
/** Extra margin on top of the longest estimate. */
export const BUFFER_MINUTES = 30;
/** Time to allow at the airport before departure. */
export const AIRPORT_MINUTES = { domestic: 90, international: 180 } as const;

export type Origin = 'hanoi' | 'noibai' | 'catbi' | 'vandon' | 'ninhbinh';

/** Door-to-door road time to Tuan Chau, in minutes [typical, long]. Estimates, see the guide copy. */
export const ROAD_MINUTES: Record<Origin, [number, number]> = {
  hanoi: [150, 180],
  noibai: [150, 180],
  catbi: [50, 70],
  vandon: [50, 70],
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

/** Latest departure from the origin to make the check-in, using the long estimate plus a buffer. */
export function leaveBy(origin: Origin, shuttle = false): string {
  const long = ROAD_MINUTES[origin][1] + (shuttle ? SHUTTLE_EXTRA_MINUTES : 0);
  return toClock(toMinutes(CHECK_IN) - long - BUFFER_MINUTES);
}

/** Earliest flight to book on the last day from an airport reached by road from Tuan Chau. */
export function earliestFlight(airport: Exclude<Origin, 'hanoi' | 'ninhbinh'>, kind: keyof typeof AIRPORT_MINUTES): string {
  const arrive = toMinutes(DISEMBARK) + ROAD_MINUTES[airport][1] + BUFFER_MINUTES;
  return toClock(arrive + AIRPORT_MINUTES[kind]);
}

/** Estimated arrival back in the origin city on the last day. */
export function backBy(origin: Origin): string {
  return toClock(toMinutes(DISEMBARK) + ROAD_MINUTES[origin][1]);
}
