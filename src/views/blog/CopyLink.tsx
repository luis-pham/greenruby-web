'use client';

import { useState } from 'react';

/** "Copy link" share button. The URL is passed in so it matches the canonical URL. */
export function CopyLink({ url, label, copied, failed, className, toastClass }: { url: string; label: string; copied: string; failed: string; className: string; toastClass: string }) {
  const [message, setMessage] = useState<string | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage(copied);
    } catch {
      setMessage(failed);
    }
    window.setTimeout(() => setMessage(null), 2400);
  }

  return (
    <>
      <button type="button" className={className} onClick={copy} title={label} aria-label={label}>↗</button>
      <span className={toastClass} role="status" aria-live="polite" data-visible={message ? 'true' : undefined}>{message}</span>
    </>
  );
}
