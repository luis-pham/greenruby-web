'use client';

import { useActionState } from 'react';
import { Button, SmartLink } from '@/components/ui';
import type { Locale } from '@/lib/i18n';
import type { Messages } from '@/messages';
import { sendContact, type ContactState } from './actions';
import s from './contact.module.css';

type Field = 'name' | 'email' | 'phone' | 'message';

export function ContactForm({ locale, t, privacyHref }: { locale: Locale; t: Messages['contact']; privacyHref: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: 'idle' });

  if (state.status === 'success') {
    return (
      <div className={s.success} role="status">
        <h3>{t.successTitle}</h3>
        <p>{t.successBody}</p>
        <Button type="button" variant="outline" onClick={() => window.location.reload()}>{t.sendAnother}</Button>
      </div>
    );
  }

  const errors = state.status === 'error' ? state.fieldErrors : {};
  const values = state.status === 'error' ? state.values : {};
  const general =
    state.status === 'error' && state.reason !== 'invalid' ? (state.reason === 'rate_limit' ? t.errorRateLimit : t.errorGeneric) : null;

  const field = (name: Field, label: string, input: (props: Record<string, unknown>) => React.ReactNode, wide = false) => (
    <div className={wide ? `${s.field} ${s.wide}` : s.field}>
      <label htmlFor={`contact-${name}`}>
        {label} <span className={s.required} aria-hidden="true">*</span>
      </label>
      {input({
        id: `contact-${name}`,
        name,
        required: true,
        defaultValue: values[name] ?? '',
        'aria-invalid': errors[name] ? true : undefined,
        'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
      })}
      {errors[name] && <p className={s.fieldError} id={`contact-${name}-error`}>{errors[name]}</p>}
    </div>
  );

  return (
    <form action={action} className={s.form} noValidate={false}>
      <input type="hidden" name="locale" value={locale} />
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={s.grid}>
        {field('name', t.fields.name, (p) => <input {...p} autoComplete="name" placeholder={t.fields.namePlaceholder} />, true)}
        {field('email', t.fields.email, (p) => <input {...p} type="email" autoComplete="email" placeholder={t.fields.emailPlaceholder} />)}
        {field('phone', t.fields.phone, (p) => <input {...p} type="tel" autoComplete="tel" placeholder={t.fields.phonePlaceholder} />)}
        {field('message', t.fields.message, (p) => <textarea {...p} rows={6} placeholder={t.fields.messagePlaceholder} />, true)}
      </div>
      <p className={s.consent}>
        {t.consent} <SmartLink href={privacyHref}>{t.privacyLink}</SmartLink>.
      </p>
      {general && <p className={s.errorBox} role="alert">{general}</p>}
      <Button type="submit" disabled={pending} aria-busy={pending}>
        {pending ? t.sending : t.submit} <span aria-hidden="true">↗︎</span>
      </Button>
    </form>
  );
}
