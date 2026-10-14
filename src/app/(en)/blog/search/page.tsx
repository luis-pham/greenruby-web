import { blogSearchRoute } from '@/views/blog/route';

// Search results depend on ?k=, so this route renders per request (and is noindex). Keeping it
// separate lets the blog listings stay fully static. instant = false: searchParams are awaited
// before rendering so redirects (empty keyword) and 404s get real status codes.
export const instant = false;

const route = blogSearchRoute('en');
export const generateMetadata = route.generateMetadata;
export default route.Page;
