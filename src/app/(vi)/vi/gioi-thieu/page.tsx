import { aboutRoute } from '@/views/about/route';

export const ensureStatic = 'navigation';

const route = aboutRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
