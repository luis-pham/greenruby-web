import { payRoute } from '@/views/booking/route';

// Static shell; the form reads the payment link token in the browser (below <Suspense>).
export const ensureStatic = 'navigation';

const route = payRoute('vi');
export const generateMetadata = route.generateMetadata;
export default route.Page;
