import { permanentRedirect } from 'next/navigation';
import { sectionPath } from '@/lib/i18n';

// Laravel answers the legacy /service URL with a 301 to /services; keep that redirect.
export default function LegacyServiceRedirect() {
  permanentRedirect(sectionPath('en', 'services'));
}
