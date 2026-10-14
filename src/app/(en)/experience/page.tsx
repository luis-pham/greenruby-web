import { legacyExperienceRoute } from '@/views/experiences/route';

// Laravel's old /experience URL: 301 to /experiences.
export const ensureStatic = 'navigation';

export default legacyExperienceRoute('en').ListPage;
