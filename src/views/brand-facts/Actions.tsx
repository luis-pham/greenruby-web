'use client';

import { useState } from 'react';
import s from './brand.module.css';

/** Print, copy-link and copy-text buttons for the brand facts page. */
export function FactActions({ url, printLabel, copyLabel, copied }: { url: string; printLabel: string; copyLabel: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className={s.actions}>
      <button type="button" className={s.actionBtn} onClick={() => window.print()}>
        {printLabel}
      </button>
      <CopyButton text={url} label={copyLabel} copied={copied} onDone={setDone} />
      <span className={s.toast} role="status" aria-live="polite" data-visible={done ? 'true' : undefined}>
        {copied}
      </span>
    </div>
  );
}

export function CopyButton({ text, label, copied, onDone, className }: { text: string; label: string; copied: string; onDone?: (v: boolean) => void; className?: string }) {
  const [ok, setOk] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      onDone?.(true);
      window.setTimeout(() => {
        setOk(false);
        onDone?.(false);
      }, 2200);
    } catch {
      /* clipboard blocked: the text stays selectable on the page */
    }
  }
  return (
    <button type="button" className={className ?? s.actionBtn} onClick={copy}>
      {ok && !onDone ? copied : label}
    </button>
  );
}
