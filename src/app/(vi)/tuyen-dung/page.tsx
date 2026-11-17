import { careersRoute } from '@/views/careers/route';

// Vietnamese-only page at the root (/tuyen-dung), rendered by the Vietnamese root layout of this route group.
// Whole page must be prerendered: crawlers (incl. AI bots that don't run JS) get complete HTML.
export const ensureStatic = 'navigation';
// Navigations wait for the full page instead of showing a shell, so 404 status codes stay correct.
export const instant = false;

const route = careersRoute();
export const generateMetadata = route.generateMetadata;
export default route.Page;
