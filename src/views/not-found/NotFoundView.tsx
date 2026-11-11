import Link from 'next/link';
import { byLocale, defaultLocale, homePath, isLegacyLocale, sectionPath, type Locale } from '@/lib/i18n';
import s from './not-found.module.css';

const copy = byLocale({
  en: { eyebrow: 'Page not found', title: 'This part of the bay is uncharted.', body: 'The page you are looking for has moved or no longer exists.', home: 'Back to home', contact: 'Contact our team' },
  vi: { eyebrow: 'Không tìm thấy trang', title: 'Vùng vịnh này chưa có trên bản đồ.', body: 'Trang bạn tìm đã được chuyển hoặc không còn tồn tại.', home: 'Về trang chủ', contact: 'Liên hệ chúng tôi' },
  ja: { eyebrow: 'ページが見つかりません', title: '湾のこのあたりは、まだ地図にありません。', body: 'お探しのページは移動したか、現在は存在しません。', home: 'ホームへ戻る', contact: 'お問い合わせ' },
  fr: { eyebrow: 'Page introuvable', title: "Cette page est introuvable.", body: 'La page que vous cherchez a été déplacée ou n’existe plus.', home: 'Retour à l’accueil', contact: 'Contacter notre équipe' },
  es: { eyebrow: 'Página no encontrada', title: 'No encontramos esta página.', body: 'La página que busca se ha trasladado o ya no existe.', home: 'Volver al inicio', contact: 'Contactar con nuestro equipo' },
});

/**
 * Self-contained 404 (no CMS data), so it renders even when the Content API is down. An intl locale's 404 links to
 * the English site: it cannot know whether its own home is open, and it has no contact page before 1E.
 */
export function NotFoundView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const target = isLegacyLocale(locale) ? locale : defaultLocale;
  return (
    <main className={s.page}>
      <div className={s.inner}>
        <p className={s.eyebrow}>404 · {t.eyebrow}</p>
        <h1 className={s.title}>{t.title}</h1>
        <p className={s.body}>{t.body}</p>
        <div className={s.links}>
          <Link href={homePath(target)} className={s.primary}>{t.home}</Link>
          <Link href={sectionPath(target, 'contact')} className={s.secondary}>{t.contact}</Link>
        </div>
      </div>
    </main>
  );
}
