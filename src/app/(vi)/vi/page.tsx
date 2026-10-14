import { homeRoute } from '@/views/home/route';

export const ensureStatic = 'navigation';

const route = homeRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
