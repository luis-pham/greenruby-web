import type { Locale } from '@/lib/i18n';

/**
 * Note under "Rates on request" on the cabin page (cabin funnel pass of 2026-11-15): when sailings start, that a
 * request is not a payment, and where each voyage lists what the fare includes. en and vi only; other languages keep
 * the page as it was, which is why this lives outside the translated message modules (scripts/i18n/copy/scope.mjs).
 * Launch month: owner-confirmed brand fact (February 2027).
 */
type RateNotes = { launch: string; inclusions: string };

const NOTES: Partial<Record<Locale, RateNotes>> = {
  en: {
    launch: 'First sailings are planned for February 2027. Sending a request is free and involves no payment.',
    inclusions: 'What each voyage includes:',
  },
  vi: {
    launch: 'Du thuyền dự kiến đón khách từ tháng 2/2027. Gửi yêu cầu hoàn toàn miễn phí và không phát sinh thanh toán.',
    inclusions: 'Dịch vụ bao gồm của từng hành trình:',
  },
};

export const rateNotes = (locale: Locale): RateNotes | undefined => NOTES[locale];
