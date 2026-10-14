import { blogIndexRoute } from '@/views/blog/route';

// Whole page must be prerendered: crawlers (incl. AI bots that don't run JS) get complete HTML.
export const ensureStatic = 'navigation';

const route = blogIndexRoute('en');
export const generateMetadata = route.generateMetadata;
export default route.Page;
