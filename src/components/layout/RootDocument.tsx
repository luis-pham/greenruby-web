import { DM_Sans, Playfair_Display } from 'next/font/google';
import type { ReactNode } from 'react';
import { defaultLocale, type Locale } from '@/lib/i18n';
import { hasDictionary } from '@/messages';
import '@/styles/tokens.css';
import '@/styles/base.css';

const serif = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

/**
 * <html>/<body> shared by the per-language root layouts (app/(en), app/(vi), generated app/(ja)). A locale without its
 * own dictionary renders English, so it is labelled English. `className`: a language's own fonts (src/styles/locales,
 * passed only by an intl layout); en/vi pass none and keep exactly their previous class list.
 */
export function RootDocument({ locale, className, children }: { locale: Locale; className?: string; children: ReactNode }) {
  return (
    <html lang={hasDictionary(locale) ? locale : defaultLocale} className={`${serif.variable} ${sans.variable}${className ? ` ${className}` : ''}`}>
      <body>{children}</body>
    </html>
  );
}
