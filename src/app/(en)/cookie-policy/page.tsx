import { cookiePolicyRoute } from '@/views/legal/route';

export const ensureStatic = 'navigation';

const route = cookiePolicyRoute('en');
export const generateMetadata = route.generateMetadata;
export default route.Page;
