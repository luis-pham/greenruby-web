import { brandFactsRoute } from '@/views/brand-facts/route';

export const ensureStatic = 'navigation';

const route = brandFactsRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
