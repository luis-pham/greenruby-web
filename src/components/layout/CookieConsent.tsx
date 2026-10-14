'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui';
import s from './layout.module.css';

type Labels = { title: string; description: string; accept: string; decline: string; learnMore: string };

/** Fired by <CookieSettingsButton> to show the banner again. */
const SETTINGS_EVENT = 'gr:cookie-settings';

const COOKIE = 'cookie_consent';

function readConsent(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)cookie_consent=([^;]*)/);
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === 'accepted' || value === 'declined' ? value : null;
}

function writeConsent(value: 'accepted' | 'declined') {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE}=${value}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax${secure}`;
}

/** Withdrawing consent: drop the Google Analytics cookies on this host and its parent domain. */
function clearAnalyticsCookies() {
  const names = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => /^_ga($|_)|^_gid$|^_gat/.test(n));
  const host = location.hostname;
  const domains = ['', `; Domain=${host}`, `; Domain=.${host.split('.').slice(-2).join('.')}`];
  for (const name of names) for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
}

/** Google Tag Manager snippet, injected once and only after consent (same behaviour as the Laravel site). */
function loadGtm(id: string) {
  const w = window as unknown as { dataLayer?: unknown[]; __grGtm?: boolean };
  w.dataLayer = w.dataLayer || [];
  if (w.__grGtm) return;
  w.__grGtm = true;
  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

/**
 * Cookie banner + consent-gated GTM. Runs client-side only, so pages stay fully static.
 * The choice is stored for a year in the `cookie_consent` cookie (accepted | declined).
 */
export function CookieConsent({ gtmId, labels, policyHref }: { gtmId: string | null; labels: Labels; policyHref: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!gtmId) return;
    const consent = readConsent();
    if (consent === 'accepted') loadGtm(gtmId);
    // Reading a cookie can only happen after hydration, hence the state update in an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (consent === null) setOpen(true);
  }, [gtmId]);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(SETTINGS_EVENT, reopen);
  }, []);

  if (!gtmId || !open) return null;

  const choose = (value: 'accepted' | 'declined') => {
    writeConsent(value);
    if (value === 'accepted') loadGtm(gtmId);
    else clearAnalyticsCookies();
    setOpen(false);
  };

  return (
    <div className={s.cookieBanner} role="dialog" aria-live="polite" aria-label={labels.title}>
      <div>
        <p className={s.cookieTitle}>{labels.title}</p>
        <p className={s.cookieText}>
          {labels.description} <a href={policyHref}>{labels.learnMore}</a>
        </p>
      </div>
      <div className={s.cookieActions}>
        <button type="button" className={s.cookieDecline} onClick={() => choose('declined')}>{labels.decline}</button>
        <button type="button" className={s.cookieAccept} onClick={() => choose('accepted')}>{labels.accept}</button>
      </div>
    </div>
  );
}

/** Reopens the cookie banner so a visitor can change an earlier choice. */
export function CookieSettingsButton({ children }: { children: ReactNode }) {
  return (
    <Button type="button" variant="dark" onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}>
      {children}
    </Button>
  );
}
