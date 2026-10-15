import { ecoDashboardRoute } from '@/views/eco/route';

export const ensureStatic = 'navigation';

const route = ecoDashboardRoute('en');
export const generateMetadata = route.generateMetadata;
export default route.Page;
