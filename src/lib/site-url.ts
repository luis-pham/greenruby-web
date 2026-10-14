export const siteUrl = (process.env.SITE_URL ?? 'https://greenrubycruises.com').replace(/\/$/, '');

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Absolute URL of a CMS upload, resized by the thumbnail proxy (for OG images and JSON-LD). */
export function absoluteImageUrl(uploadPath: string, width = 1200, height?: number): string {
  if (/^https?:\/\//.test(uploadPath)) return uploadPath;
  const size = height ? `w=${width}&h=${height}&cr=1` : `w=${width}`;
  return `${siteUrl}/thumbnail${uploadPath}?${size}&q=85`;
}
