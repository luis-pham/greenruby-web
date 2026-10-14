import { contactRoute } from '@/views/contact/route';

export const ensureStatic = 'navigation';

const route = contactRoute('en');
export const generateMetadata = route.generateMetadata;
export default route.Page;
