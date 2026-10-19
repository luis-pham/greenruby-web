import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

// Decision 2026-10-14: AI crawlers, including training crawlers, are explicitly welcome.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
];

// Booking wizard deep links (?cruise_id=…&cabin_id=…) are noindex and endless; keep crawlers out of both languages.
const disallow = ['/api/', '/admincp/', '/booking?', '/vi/booking?'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: AI_CRAWLERS, allow: '/', disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
