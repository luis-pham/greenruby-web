import { SOCIAL_PATHS } from './social-paths';

/** Single-colour brand logo (inherits currentColor). Returns null for unknown networks. */
export function SocialIcon({ name }: { name: string }) {
  if (name === 'linkedin') {
    // Simple LinkedIn "in" mark: rounded square with the letters cut out.
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <mask id="li-cutout">
          <rect width="24" height="24" rx="3" fill="#fff" />
          <circle cx="6.6" cy="6.7" r="1.75" fill="#000" />
          <rect x="5" y="9.4" width="3.2" height="9.6" fill="#000" />
          <path d="M10.4 9.4h3.05v1.35c.5-.9 1.65-1.6 3.15-1.6 2.7 0 3.6 1.65 3.6 4.4V19h-3.15v-5c0-1.3-.35-2.25-1.65-2.25-1.4 0-1.85.95-1.85 2.35V19H10.4z" fill="#000" />
        </mask>
        <rect width="24" height="24" rx="3" fill="currentColor" mask="url(#li-cutout)" />
      </svg>
    );
  }
  const icon = SOCIAL_PATHS[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

export const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  tripadvisor: 'Tripadvisor',
  linkedin: 'LinkedIn',
  twitter: 'X',
  pinterest: 'Pinterest',
};
