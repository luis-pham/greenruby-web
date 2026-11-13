/** Inline flag images for the language switcher (no external requests). `uid` keeps SVG ids unique per instance. */
export function FlagGB({ uid }: { uid: string }) {
  return (
    <svg viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id={`gb-s-${uid}`}><path d="M0,0 v30 h60 v-30 z" /></clipPath>
      <clipPath id={`gb-t-${uid}`}><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <g clipPath={`url(#gb-s-${uid})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#gb-t-${uid})`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function FlagVN() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#DA251D" />
      <polygon fill="#FFFF00" points="15,4 16.76,9.43 22.47,9.43 17.85,12.79 19.61,18.21 15,14.86 10.39,18.21 12.15,12.79 7.53,9.43 13.24,9.43" />
    </svg>
  );
}

export function FlagJP() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#BC002D" />
    </svg>
  );
}

export function FlagFR() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="10" height="20" fill="#002654" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
    </svg>
  );
}

/** Spanish edition (one neutral Spanish for Spain and Latin America): the flag of Spain, simplified (no coat of arms). */
export function FlagES() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  );
}

/** German edition (Germany, Austria, Switzerland): the flag of Germany. */
export function FlagDE() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#000" />
      <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
      <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
    </svg>
  );
}

/** Korean edition (South Korea): the flag of South Korea (Taegukgi, simplified at flag-icon size). */
export function FlagKR() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <g transform="translate(15 10)">
        <path d="M-4.2 0a4.2 4.2 0 0 1 8.4 0a2.1 2.1 0 0 1-4.2 0a2.1 2.1 0 0 0-4.2 0" fill="#CD2E3A" />
        <path d="M-4.2 0a4.2 4.2 0 0 0 8.4 0a2.1 2.1 0 0 0-4.2 0a2.1 2.1 0 0 1-4.2 0" fill="#0047A0" />
      </g>
      <g stroke="#000" strokeWidth="0.9">
        <path d="M6.2 4.2l2.6-1.7M6.7 5l2.6-1.7M7.2 5.8l2.6-1.7" transform="rotate(0)" />
        <path d="M20.2 14.2l2.6 1.7M20.7 13.4l2.6 1.7M21.2 12.6l2.6 1.7" />
        <path d="M6.2 15.8l2.6 1.7M6.7 15l2.6 1.7M7.2 14.2l2.6 1.7" />
        <path d="M20.2 5.8l2.6-1.7M20.7 6.6l2.6-1.7M21.2 7.4l2.6-1.7" />
      </g>
    </svg>
  );
}
