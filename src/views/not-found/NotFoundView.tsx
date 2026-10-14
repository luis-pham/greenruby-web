import Link from 'next/link';
import { homePath, sectionPath, type Locale } from '@/lib/i18n';
import s from './not-found.module.css';

const copy = {
  en: { eyebrow: 'Page not found', title: 'This part of the bay is uncharted.', body: 'The page you are looking for has moved or no longer exists.', home: 'Back to home', contact: 'Contact our team' },
  vi: { eyebrow: 'Không tìm thấy trang', title: 'Vùng vịnh này chưa có trên bản đồ.', body: 'Trang bạn tìm đã được chuyển hoặc không còn tồn tại.', home: 'Về trang chủ', contact: 'Liên hệ chúng tôi' },
};

/** Self-contained 404 (no CMS data), so it renders even when the Content API is down. */
export function NotFoundView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <main className={s.page}>
      <div className={s.inner}>
        <p className={s.eyebrow}>404 · {t.eyebrow}</p>
        <h1 className={s.title}>{t.title}</h1>
        <p className={s.body}>{t.body}</p>
        <div className={s.links}>
          <Link href={homePath(locale)} className={s.primary}>{t.home}</Link>
          <Link href={sectionPath(locale, 'contact')} className={s.secondary}>{t.contact}</Link>
        </div>
      </div>
    </main>
  );
}
