import { Noto_Serif_JP } from 'next/font/google';
import './ja.css';

// Japanese web font and typography (phase 2B). Imported only by the generated Japanese root layout (app/(ja)/layout.tsx,
// scripts/i18n/routes-generate.mjs), first, so English and Vietnamese pages load none of it.
//
// One web font: Noto Serif JP 400 for the display serif (headings, the Playfair role), a Mincho that sits well with
// Playfair Display. Body and interface text use the system Japanese sans (Hiragino Sans on Apple, Noto Sans CJK on
// Android, Yu Gothic / Meiryo on Windows; stack in ja.css): high quality everywhere, and a Noto Sans JP web font would
// add roughly a megabyte of slices on a text-heavy page for little visible gain. Playfair Display / DM Sans stay first
// in both stacks, so Latin text, digits and the brand keep their faces.
//
// Google serves the font as ~120 unicode-range slices; a browser downloads only the slices its page's characters need.
// - no preload: a preload could only target one slice, not the ones the page uses, and would compete with the LCP image;
// - display swap: text paints at once in the system Mincho, then swaps. Japanese glyphs are full-width squares in every
//   Japanese font and line heights are fixed by the design tokens, so the swap barely moves anything (CLS); the LCP is
//   painted without waiting for the font;
// - adjustFontFallback off: the generated metric fallback is Times New Roman, which has no Japanese glyphs to adjust.
const serif = Noto_Serif_JP({ weight: '400', display: 'swap', preload: false, adjustFontFallback: false, variable: '--font-noto-serif-jp' });

/** Classes for <html> on Japanese pages (the font CSS variable used by ja.css). */
export const localeClassName = serif.variable;
