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
