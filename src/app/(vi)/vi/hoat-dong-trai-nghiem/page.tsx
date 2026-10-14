import { experiencesRoute } from '@/views/experiences/route';

export const ensureStatic = 'navigation';

const route = experiencesRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
