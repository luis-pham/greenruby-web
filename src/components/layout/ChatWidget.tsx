'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '@/components/ui';
import s from './ChatWidget.module.css';

type Labels = { open: string; close: string; zalo: string; messenger: string; whatsapp: string; ai: string; soon: string };

type Channel = { key: string; label: string; href: string | null; icon: ReactNode };

// Brand glyphs: WhatsApp from Simple Icons v16.35.0 (CC0-1.0); Messenger bubble and Zalo wordmark drawn here.
const WHATSAPP =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z';

const MESSENGER =
  'M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78c.02.57.61.94 1.13.71l1.98-.87c.17-.08.36-.09.53-.05.91.25 1.88.39 2.9.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z';

function ZaloIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="24" fill="#0068ff" />
      <path d="M11 14.5c0-2 1.6-3.5 3.5-3.5h19c2 0 3.5 1.6 3.5 3.5v15c0 2-1.6 3.5-3.5 3.5H21l-6.6 4.6c-.7.5-1.6 0-1.6-.8V33A3.5 3.5 0 0 1 11 29.5z" fill="#fff" />
      <text x="24" y="26.4" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="10.5" fontWeight="700" fill="#0068ff">Zalo</text>
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="gr-messenger" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0068ff" />
          <stop offset="1" stopColor="#00c6ff" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="24" fill="url(#gr-messenger)" />
      <path d={MESSENGER} transform="translate(9.6 9.6) scale(1.2)" fill="#fff" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="24" fill="#25d366" />
      <path d={WHATSAPP} transform="translate(11 11) scale(1.083)" fill="#fff" />
    </svg>
  );
}

/** AI assistant: chat bubble with a sparkle, in the brand green and gold. */
function AiIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="1" y="1" width="46" height="46" rx="23" fill="var(--color-green-900)" stroke="var(--color-gold-500)" strokeWidth="2" />
      <path d="M13 17a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-8l-5.5 4.2c-.6.5-1.5 0-1.5-.8V31a4 4 0 0 1-3-4z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 16.5c.4 2.7 1.8 4.1 4.5 4.5-2.7.4-4.1 1.8-4.5 4.5-.4-2.7-1.8-4.1-4.5-4.5 2.7-.4 4.1-1.8 4.5-4.5Z" fill="var(--color-gold-300)" />
      <circle cx="30" cy="25.5" r="1.3" fill="var(--color-gold-300)" />
    </svg>
  );
}

/**
 * Floating "chat with us" bubble in the bottom-right corner (same pattern as grandpioneers.com):
 * the button opens a stack of contact icons — Zalo, Facebook Messenger, WhatsApp and AI support.
 * Channels without a link from the CMS are shown as "soon" (AI) or left out.
 */
export function ChatWidget({
  zaloHref,
  messengerHref,
  whatsappHref,
  aiHref,
  labels,
}: {
  zaloHref: string | null;
  messengerHref: string | null;
  whatsappHref: string | null;
  aiHref: string | null;
  labels: Labels;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const channels: Channel[] = [
    { key: 'zalo', label: labels.zalo, href: zaloHref, icon: <ZaloIcon /> },
    { key: 'messenger', label: labels.messenger, href: messengerHref, icon: <MessengerIcon /> },
    { key: 'whatsapp', label: labels.whatsapp, href: whatsappHref, icon: <WhatsAppIcon /> },
    { key: 'ai', label: labels.ai, href: aiHref, icon: <AiIcon /> },
  ].filter((c) => c.href || c.key === 'ai');

  return (
    <div ref={root} className={cx(s.widget, open && s.open)}>
      <ul id="gr-chat-channels" className={s.channels}>
        {channels.map((c, i) => (
          <li key={c.key} style={{ transitionDelay: `${(channels.length - 1 - i) * 40}ms` }}>
            {c.href ? (
              <a className={s.channel} href={c.href} target="_blank" rel="noopener" aria-label={c.label} title={c.label} onClick={() => setOpen(false)}>
                <span className={s.icon}>{c.icon}</span>
              </a>
            ) : (
              <span className={cx(s.channel, s.disabled)} role="img" aria-label={`${c.label} (${labels.soon})`} title={`${c.label} · ${labels.soon}`}>
                <span className={s.icon}>{c.icon}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={s.toggle}
        aria-expanded={open}
        aria-controls="gr-chat-channels"
        aria-label={open ? labels.close : labels.open}
        title={open ? labels.close : labels.open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 3H6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h10.6l3.7 3.7c.3.3.7.1.7-.3V6a3 3 0 0 0-3-3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="8" cy="10.5" r="1.2" fill="currentColor" />
            <circle cx="12" cy="10.5" r="1.2" fill="currentColor" />
            <circle cx="16" cy="10.5" r="1.2" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
