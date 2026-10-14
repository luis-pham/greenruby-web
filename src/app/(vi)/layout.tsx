import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { RootDocument } from '@/components/layout/RootDocument';
import { siteUrl } from '@/lib/site-url';

export const metadata: Metadata = { metadataBase: new URL(siteUrl) };

export default function VietnameseRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="vi">{children}</RootDocument>;
}
