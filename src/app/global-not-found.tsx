import type { Metadata } from 'next';
import { RootDocument } from '@/components/layout/RootDocument';
import { NotFoundView } from '@/views/not-found/NotFoundView';

export const metadata: Metadata = { title: '404 · Green Ruby Cruises', robots: { index: false } };

// Unmatched URLs bypass the (en)/(vi) root layouts, so this renders its own <html>.
export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <NotFoundView locale="en" />
    </RootDocument>
  );
}
