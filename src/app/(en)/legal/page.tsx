import { legalHubRoute } from '@/views/legal/route';

export const ensureStatic = 'navigation';

const route = legalHubRoute('en');
export const generateMetadata = route.generateMetadata;
export default route.Page;
