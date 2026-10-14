import { DM_Sans, Playfair_Display } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';
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

/** <html>/<body> shared by the per-language root layouts in app/(en) and app/(vi). */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
