import { contactRoute } from '@/views/contact/route';

export const ensureStatic = 'navigation';

const route = contactRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
