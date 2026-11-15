import type { Locale } from '@/lib/i18n';

/**
 * Topic H1s for hubs whose design heading is a slogan (SEO passes of 2026-11-15, vi then en). Where a language has one,
 * the page's H1 names the topic and the slogan moves under it as a tagline (PageIntro `tagline`). Only en and vi have
 * them; every other language keeps its slogan H1, which is why this lives outside the translated message modules
 * (scripts/i18n/copy/scope.mjs OWN_CHECKS).
 */
type Hub = 'experiences' | 'faq' | 'services';

const TOPIC_H1: Partial<Record<Locale, Record<Hub, string>>> = {
  en: {
    experiences: 'Cruise Activities on Ha Long Bay & Lan Ha Bay',
    faq: 'Green Ruby Cruises — Frequently Asked Questions',
    services: 'Services Aboard Green Ruby Cruises',
  },
  vi: {
    experiences: 'Hoạt động trên du thuyền Hạ Long & Lan Hạ',
    faq: 'Câu hỏi thường gặp về du thuyền Green Ruby',
    services: 'Dịch vụ trên du thuyền Green Ruby',
  },
};

export const topicH1 = (locale: Locale, hub: Hub): string | undefined => TOPIC_H1[locale]?.[hub];
