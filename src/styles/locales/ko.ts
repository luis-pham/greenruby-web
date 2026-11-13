import { Noto_Serif_KR } from 'next/font/google';
import './ko.css';

// Korean web font and typography. Imported only by the generated Korean root layout (app/(ko)/layout.tsx,
// scripts/i18n/routes-generate.mjs), so other languages load none of it. Same approach as ja.ts:
// one web font, Noto Serif KR 400, for the display serif (the Playfair role); body and interface text use the system
// Korean sans (Apple SD Gothic Neo on Apple, Noto Sans CJK KR on Android, Malgun Gothic on Windows; stack in ko.css).
// Playfair Display / DM Sans stay first in both stacks, so Latin text, digits and the brand keep their faces.
// Google serves the font as unicode-range slices (only the ones the page needs are downloaded); no preload, swap,
// no metric fallback (Times New Roman has no Hangul to adjust).
const serif = Noto_Serif_KR({ weight: '400', display: 'swap', preload: false, adjustFontFallback: false, variable: '--font-noto-serif-kr' });

/** Classes for <html> on Korean pages (the font CSS variable used by ko.css). */
export const localeClassName = serif.variable;
