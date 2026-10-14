import { itinerariesRoute } from '@/views/itineraries/route';

export const ensureStatic = 'navigation';

const route = itinerariesRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
