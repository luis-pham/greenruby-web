import { legacyExperienceRoute } from '@/views/experiences/route';

// Laravel's old /experience/{slug}-{id}.html URLs: 301 to the canonical /experiences/… page (404 if unknown).
export const ensureStatic = 'navigation';
export const instant = false;

const route = legacyExperienceRoute('en');
export const generateStaticParams = route.generateStaticParams;
export default route.DetailPage;
