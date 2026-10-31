import type { ReactNode } from 'react';

/** Shown only in an authenticated preview (phase 1E-d): the page is a draft view, not the public site. */
export function PreviewBanner() {
  return (
    <div role="status" style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#7a1f1f', color: '#fff', padding: '8px 16px', fontSize: 14, textAlign: 'center' }}>
      Preview: unpublished content, visible only to you. Not indexed. <a href="/_draft/exit" style={{ color: '#fff', textDecoration: 'underline' }}>Exit preview</a>
    </div>
  );
}

/** The page, with the preview banner above it in an authenticated preview (unchanged otherwise). */
export function withPreviewBanner(preview: boolean, page: ReactNode): ReactNode {
  return preview ? (
    <>
      <PreviewBanner />
      {page}
    </>
  ) : (
    page
  );
}
