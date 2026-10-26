import { bookingTermsRoute } from '@/views/legal/route';

export const ensureStatic = 'navigation';

const route = bookingTermsRoute('en');
export const generateMetadata = route.generateMetadata;
export default route.Page;
