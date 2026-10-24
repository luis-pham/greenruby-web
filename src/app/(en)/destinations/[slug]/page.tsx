import { destinationRoute } from '@/views/destinations/route';

// Whole page must be prerendered: crawlers (incl. AI bots that don't run JS) get complete HTML.
export const ensureStatic = 'navigation';
// Navigations wait for the full page instead of showing a shell, so 404 status codes stay correct.
export const instant = false;

const route = destinationRoute('en');
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
