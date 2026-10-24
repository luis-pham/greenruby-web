import { guideRoute } from '@/views/guides/route';

// Whole page must be prerendered: crawlers (incl. AI bots that don't run JS) get complete HTML.
export const ensureStatic = 'navigation';
// Navigations wait for the full page instead of showing a shell, so the 404 of a page switched off in the CMS stays correct.
export const instant = false;

const route = guideRoute('guideTransfer', 'vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
