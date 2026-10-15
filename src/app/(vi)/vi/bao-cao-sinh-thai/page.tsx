import { ecoDashboardRoute } from '@/views/eco/route';

export const ensureStatic = 'navigation';

const route = ecoDashboardRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
