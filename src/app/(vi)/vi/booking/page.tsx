import { bookingRoute } from '@/views/booking/route';

// Static shell; the wizard reads the query string in the browser (below <Suspense>).
export const ensureStatic = 'navigation';

const route = bookingRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
