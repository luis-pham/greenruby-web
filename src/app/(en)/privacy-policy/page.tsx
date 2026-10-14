import { legalPageRoute } from '@/views/legal/route';

export const ensureStatic = 'navigation';

const route = legalPageRoute('en', 'privacyPolicy');
export const generateMetadata = route.generateMetadata;
export default route.Page;
