import { faqRoute } from '@/views/faq/route';

// Whole page prerendered for crawlers; navigations wait for it so 404/301 status codes stay correct.
export const ensureStatic = 'navigation';
export const instant = false;

const route = faqRoute('vi');
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
