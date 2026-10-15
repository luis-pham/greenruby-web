import type { ReactNode } from 'react';

// Line icons for the homepage "Life on board" cards. The cards come from the CMS (homepage-service), so the
// icon is picked from the service name in either language; unknown names get the compass.

type Kind = 'dining' | 'bar' | 'entertainment' | 'wellness' | 'pool' | 'cabin' | 'default';

const MATCHERS: [Kind, RegExp][] = [
  ['dining', /restaurant|dining|cuisine|nha hang|am thuc|bua an/],
  ['bar', /\bbar\b|bars|drink|cocktail|wine|lounge|do uong|ruou/],
  ['entertainment', /entertain|music|karaoke|cinema|show|giai tri|am nhac/],
  ['wellness', /spa|fitness|gym|wellness|massage|yoga|thu gian|cham soc/],
  ['pool', /pool|swim|jacuzzi|be boi|ho boi/],
  ['cabin', /cabin|suite|room|phong|giuong/],
];

const fold = (text: string) =>
  text
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export function facilityKind(name: string): Kind {
  const key = fold(name);
  return MATCHERS.find(([, re]) => re.test(key))?.[0] ?? 'default';
}

const PATHS: Record<Kind, ReactNode> = {
  // Cloche on a plate
  dining: (
    <>
      <path d="M6 29h28M9 29a11 11 0 0 1 22 0" />
      <path d="M18.5 14.5h3M20 14.5v3.6" />
      <path d="M8 33h24" />
      <path d="M14.5 24.5a7 7 0 0 1 3.5-3.6" />
    </>
  ),
  // Cocktail glass with garnish
  bar: (
    <>
      <path d="M8 9h24L20 22.5Z" />
      <path d="M20 22.5V32M14 32.5h12" />
      <path d="M11.5 13h17" />
      <circle cx="25" cy="10.5" r="2.4" />
      <path d="m27 8.5 3.5-3.5" />
    </>
  ),
  // Two beamed notes
  entertainment: (
    <>
      <path d="M15.5 28.5V11.5l15-3.5v17" />
      <path d="M15.5 16.5l15-3.5" />
      <ellipse cx="11.8" cy="28.5" rx="3.7" ry="3" />
      <ellipse cx="26.8" cy="25" rx="3.7" ry="3" />
    </>
  ),
  // Lotus on still water
  wellness: (
    <>
      <path d="M20 8.5c3.6 3.6 4.4 11.4 0 18.5-4.4-7.1-3.6-14.9 0-18.5Z" />
      <path d="M20 27c-5.8-.6-10.6-5.2-11-12.2 4.4 0 8.2 2.3 10.2 6" />
      <path d="M20 27c5.8-.6 10.6-5.2 11-12.2-4.4 0-8.2 2.3-10.2 6" />
      <path d="M8 32.5c2 1 4 1 6 0s4-1 6 0 4 1 6 0 4-1 6 0" />
    </>
  ),
  // Pool ladder over waves
  pool: (
    <>
      <path d="M14 26V9.5a3 3 0 0 1 6 0M24 24V9.5a3 3 0 0 1 6 0M14 15h10M14 21h10" />
      <path d="M6 28.5c2.3 1.3 4.7 1.3 7 0s4.7-1.3 7 0 4.7 1.3 7 0 4.7-1.3 7 0M6 33c2.3 1.3 4.7 1.3 7 0s4.7-1.3 7 0 4.7 1.3 7 0 4.7-1.3 7 0" />
    </>
  ),
  // Bed with pillows
  cabin: (
    <>
      <path d="M5 32V12M35 32V21.5a3.5 3.5 0 0 0-3.5-3.5H17v8M5 26h30" />
      <rect x="8" y="18.5" width="7" height="4" rx="2" />
    </>
  ),
  // Compass rose
  default: (
    <>
      <circle cx="20" cy="20" r="13" />
      <path d="m24.5 15.5-3 6-6 3 3-6Z" />
      <path d="M20 4v3M20 33v3M4 20h3M33 20h3" />
    </>
  ),
};

export function FacilityIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[facilityKind(name)]}
    </svg>
  );
}
