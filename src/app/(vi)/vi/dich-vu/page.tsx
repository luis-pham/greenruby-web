import { servicesRoute } from '@/views/services/route';

export const ensureStatic = 'navigation';

const route = servicesRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
