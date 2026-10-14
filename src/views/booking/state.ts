import type { Amenity, Cabin, Itinerary, ItineraryDetail, ServerBooking } from './api';
import type { Outcome, PaymentMethod } from './payment';
import { guestLimits, toCabinPricing, type GuestType, type Guests } from './pricing';

export type Step = 1 | 2 | 3 | 4;
export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';
export type Confirmation = 'direct' | 'inquiry';

export type Room = { key: number; cabinId: number; guests: Guests };

/** What the URL asked for (cabin page, ship page or itinerary page "Book" links); applied once. */
export type Prefill = { itineraryId: number | null; cruiseId: number | null; cabinId: number | null };

export type State = {
  boot: LoadStatus;
  step: Step;
  outcome: Outcome | null;
  /** True while a payment return is being checked (outcome shows "checking"). */
  checking: boolean;
  serverBooking: ServerBooking | null;
  /** Booking code returned by POST /api/booking/inquiry. */
  reference: string | null;

  enabledDates: string[];
  date: string;
  itineraries: Itinerary[];
  itinerariesStatus: LoadStatus;
  itinerary: Itinerary | null;
  detail: ItineraryDetail | null;
  cabins: Cabin[];
  cabinsStatus: LoadStatus;
  amenities: Amenity[];
  prefill: Prefill | null;

  rooms: Room[];
  nextRoomKey: number;
  amenityQty: Record<number, number>;

  guest: { fullName: string; phone: string; email: string };
  confirmation: Confirmation;
  method: PaymentMethod;

  errors: Record<string, string>;
  submitting: 'idle' | 'sending' | 'redirecting';
  submitError: string | null;
};

/** BookingPricer::MAX_QUANTITY on the server. */
export const MAX_AMENITY_QTY = 10;

export function initialState(defaultMethod: PaymentMethod): State {
  return {
    boot: 'loading',
    step: 1,
    outcome: null,
    checking: false,
    serverBooking: null,
    reference: null,
    enabledDates: [],
    date: '',
    itineraries: [],
    itinerariesStatus: 'idle',
    itinerary: null,
    detail: null,
    cabins: [],
    cabinsStatus: 'idle',
    amenities: [],
    prefill: null,
    rooms: [],
    nextRoomKey: 1,
    amenityQty: {},
    guest: { fullName: '', phone: '', email: '' },
    confirmation: 'direct',
    method: defaultMethod,
    errors: {},
    submitting: 'idle',
    submitError: null,
  };
}

export type Action =
  | { type: 'boot'; dates: string[]; date: string; prefill: Prefill | null }
  | { type: 'bootFailed' }
  | { type: 'setDate'; date: string }
  | { type: 'itinerariesLoaded'; date: string; items: Itinerary[] }
  | { type: 'itinerariesFailed'; date: string }
  | { type: 'retryItineraries' }
  | { type: 'selectItinerary'; id: string }
  | { type: 'detailLoaded'; itineraryId: string; detail: ItineraryDetail | null }
  | { type: 'cabinsLoaded'; itineraryId: string; items: Cabin[] }
  | { type: 'cabinsFailed'; itineraryId: string }
  | { type: 'amenitiesLoaded'; itineraryId: string; items: Amenity[] }
  | { type: 'addRoom'; cabinId: number }
  | { type: 'removeRoom'; key: number }
  | { type: 'changeGuests'; key: number; guest: GuestType; delta: 1 | -1 }
  | { type: 'changeAmenity'; id: number; delta: 1 | -1 }
  | { type: 'setGuestField'; field: keyof State['guest']; value: string }
  | { type: 'setConfirmation'; value: Confirmation }
  | { type: 'setMethod'; value: PaymentMethod }
  | { type: 'goTo'; step: Step }
  | { type: 'setErrors'; errors: Record<string, string> }
  | { type: 'submit'; mode: 'sending' | 'redirecting' }
  | { type: 'submitFailed'; message: string }
  | { type: 'outcome'; outcome: Outcome; checking?: boolean; booking?: ServerBooking | null; reference?: string | null };

function newRoom(state: State, cabinId: number): State {
  const cabin = state.cabins.find((c) => c.id === cabinId);
  if (!cabin) return state;
  const limits = guestLimits(toCabinPricing(cabin, state.itinerary?.duration));
  // Two adults is the most common party; the Laravel page started every cabin at zero guests.
  const room: Room = { key: state.nextRoomKey, cabinId, guests: { adults: Math.max(1, Math.min(2, limits.adults)), children_6_12: 0, children_2_5: 0, infants: 0 } };
  return { ...state, rooms: [...state.rooms, room], nextRoomKey: state.nextRoomKey + 1, errors: dropCabinErrors(state.errors) };
}

const dropCabinErrors = (errors: Record<string, string>) =>
  Object.fromEntries(Object.entries(errors).filter(([key]) => key !== 'cabin' && !key.startsWith('cabin_')));

const without = (errors: Record<string, string>, ...keys: string[]) => Object.fromEntries(Object.entries(errors).filter(([key]) => !keys.includes(key)));

/** Changing the date or voyage clears everything chosen after it, as on the Laravel page. */
const clearSelection = { rooms: [] as Room[], amenityQty: {} as Record<number, number> };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'boot':
      return {
        ...state,
        boot: 'ready',
        enabledDates: action.dates,
        prefill: action.prefill,
        date: action.date,
        itinerariesStatus: action.date ? 'loading' : 'idle',
      };
    case 'bootFailed':
      return { ...state, boot: 'ready' };

    case 'setDate':
      if (action.date === state.date) return state;
      return {
        ...state,
        ...clearSelection,
        date: action.date,
        itineraries: [],
        itinerariesStatus: action.date ? 'loading' : 'idle',
        itinerary: null,
        detail: null,
        cabins: [],
        cabinsStatus: 'idle',
        amenities: [],
        errors: without(state.errors, 'date', 'voyage'),
      };

    case 'itinerariesLoaded': {
      if (action.date !== state.date) return state;
      const next: State = { ...state, itineraries: action.items, itinerariesStatus: 'ready' };
      const p = state.prefill;
      if (p?.itineraryId) {
        const match = action.items.find((it) => it.itinerary_id === p.itineraryId && (!p.cruiseId || it.cruise_id === p.cruiseId));
        if (match) return reducer(next, { type: 'selectItinerary', id: match.id });
      }
      return { ...next, prefill: null };
    }
    case 'itinerariesFailed':
      return action.date === state.date ? { ...state, itinerariesStatus: 'error', prefill: null } : state;
    case 'retryItineraries':
      return state.date ? { ...state, itinerariesStatus: 'loading' } : state;

    case 'selectItinerary': {
      const itinerary = state.itineraries.find((it) => it.id === action.id) ?? null;
      if (itinerary?.id === state.itinerary?.id) return state;
      return {
        ...state,
        ...clearSelection,
        itinerary,
        detail: null,
        cabins: [],
        cabinsStatus: itinerary ? 'loading' : 'idle',
        amenities: [],
        errors: dropCabinErrors(without(state.errors, 'voyage')),
      };
    }
    case 'detailLoaded':
      return action.itineraryId === state.itinerary?.id ? { ...state, detail: action.detail } : state;
    case 'cabinsLoaded': {
      if (action.itineraryId !== state.itinerary?.id) return state;
      let next: State = { ...state, cabins: action.items, cabinsStatus: 'ready' };
      // A cabin page link (?cabin_id=) adds that cabin once, falling back to the first one like before.
      if (state.prefill?.cabinId && action.items.length > 0) {
        const target = action.items.find((c) => c.id === state.prefill?.cabinId) ?? action.items[0];
        next = newRoom(next, target.id);
      }
      return { ...next, prefill: null };
    }
    case 'cabinsFailed':
      return action.itineraryId === state.itinerary?.id ? { ...state, cabinsStatus: 'error', prefill: null } : state;
    case 'amenitiesLoaded':
      return action.itineraryId === state.itinerary?.id ? { ...state, amenities: action.items } : state;

    case 'addRoom':
      return newRoom(state, action.cabinId);
    case 'removeRoom':
      return { ...state, rooms: state.rooms.filter((r) => r.key !== action.key) };
    case 'changeGuests': {
      const rooms = state.rooms.map((room) => {
        if (room.key !== action.key) return room;
        const cabin = state.cabins.find((c) => c.id === room.cabinId);
        const limit = cabin ? guestLimits(toCabinPricing(cabin, state.itinerary?.duration))[action.guest] : Infinity;
        const value = Math.min(limit, Math.max(0, room.guests[action.guest] + action.delta));
        return value === room.guests[action.guest] ? room : { ...room, guests: { ...room.guests, [action.guest]: value } };
      });
      return { ...state, rooms, errors: dropCabinErrors(state.errors) };
    }
    case 'changeAmenity': {
      const value = Math.min(MAX_AMENITY_QTY, Math.max(0, (state.amenityQty[action.id] ?? 0) + action.delta));
      return { ...state, amenityQty: { ...state.amenityQty, [action.id]: value } };
    }

    case 'setGuestField':
      return { ...state, guest: { ...state.guest, [action.field]: action.value }, errors: without(state.errors, action.field) };
    case 'setConfirmation':
      return { ...state, confirmation: action.value, submitError: null };
    case 'setMethod':
      return { ...state, method: action.value, submitError: null };

    case 'goTo':
      return { ...state, step: action.step, errors: {}, submitError: null };
    case 'setErrors':
      return { ...state, errors: action.errors };

    case 'submit':
      return { ...state, submitting: action.mode, submitError: null };
    case 'submitFailed':
      return { ...state, submitting: 'idle', submitError: action.message };
    case 'outcome':
      return {
        ...state,
        boot: 'ready',
        outcome: action.outcome,
        checking: action.checking ?? false,
        submitting: 'idle',
        serverBooking: action.booking === undefined ? state.serverBooking : action.booking,
        reference: action.reference === undefined ? state.reference : action.reference,
      };
  }
}
