import { aboutRoute } from '@/views/about/route';

export const ensureStatic = 'navigation';

const route = aboutRoute('en');
export const generateMetadata = route.generateMetadata;
export default route.Page;
