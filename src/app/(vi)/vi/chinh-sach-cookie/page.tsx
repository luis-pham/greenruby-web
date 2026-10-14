import { cookiePolicyRoute } from '@/views/legal/route';

export const ensureStatic = 'navigation';

const route = cookiePolicyRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
