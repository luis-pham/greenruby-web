/**
 * Step validation, ported from public/assets/frontend/js/modules/booking/validation.js.
 * Messages are passed in so the rules stay free of i18n.
 */

export type ValidationResult = { valid: boolean; errors: string[]; fieldErrors: Record<string, string> };

export type Step1Input = {
  date: string;
  itineraryId: string | null;
  rooms: { name: string; guests: { adults: number; children_6_12: number; children_2_5: number; infants: number } }[];
};

export type Step1Messages = { dateRequired: string; voyageRequired: string; cabinRequired: string; guestPerCabin: string };

function result(fieldErrors: Record<string, string>): ValidationResult {
  const errors = Object.values(fieldErrors);
  return { valid: errors.length === 0, errors, fieldErrors };
}

/** A voyage (which implies a date), at least one cabin, and at least one guest of any age per cabin. */
export function validateStep1(input: Step1Input, msg: Step1Messages): ValidationResult {
  const fieldErrors: Record<string, string> = {};
  if (!input.date) fieldErrors.date = msg.dateRequired;
  if (!input.itineraryId) fieldErrors.voyage = msg.voyageRequired;
  if (input.rooms.length === 0) {
    fieldErrors.cabin = msg.cabinRequired;
  } else {
    input.rooms.forEach((room, i) => {
      const g = room.guests;
      const sum = [g.adults, g.children_6_12, g.children_2_5, g.infants].reduce((acc, v) => acc + (v > 0 ? v : 0), 0);
      if (sum < 1) fieldErrors[`cabin_${i}`] = `${room.name || `Cabin ${i + 1}`}: ${msg.guestPerCabin}`;
    });
  }
  return result(fieldErrors);
}

export type Step2Input = { fullName: string; phone: string; email: string };

export type Step2Messages = {
  fullNameRequired: string;
  phoneRequired: string;
  phoneNumeric: string;
  emailRequired: string;
  emailInvalid: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Name required; phone digits with optional leading + (spaces, dashes, dots and brackets allowed); basic email shape. */
export function validateStep2(input: Step2Input, msg: Step2Messages): ValidationResult {
  const fieldErrors: Record<string, string> = {};
  const fullName = input.fullName.trim();
  const phone = input.phone.trim();
  const email = input.email.trim();

  if (!fullName) fieldErrors.fullName = msg.fullNameRequired;

  if (!phone) fieldErrors.phone = msg.phoneRequired;
  else if (!/^\+?\d+$/.test(phone.replace(/[\s\-.()]/g, ''))) fieldErrors.phone = msg.phoneNumeric;

  if (!email) fieldErrors.email = msg.emailRequired;
  else if (!EMAIL.test(email)) fieldErrors.email = msg.emailInvalid;

  return result(fieldErrors);
}
