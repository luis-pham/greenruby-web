'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useReducer, useRef, type Dispatch } from 'react';
import { cx } from '@/components/ui';
import { isLegacyLocale, type Locale } from '@/lib/i18n';
import { wordSpace } from '@/lib/typography';
import { bookingApi, type ServerBooking } from './api';
import { paymentAllowed } from './format';
import { handoffQuery, inventoryOf, restorable, switchTarget, takeHandoff, writeHandoff, type Handoff } from './handoff';
import { fmt, normalizeQueryDate, payloadFromState, summaryFromBooking, summaryFromState, todayYmd, type T } from './model';
import {
  buildInquiryBody,
  buildPaymentInitBody,
  classifyInitFailure,
  clearPaymentAccess,
  effectivePlan,
  methodSupportsCurrency,
  outcomeFromStatus,
  parseReturnParams,
  planOptions,
  pollPaymentStatus,
  readPaymentAccess,
  storePaymentAccess,
  termsLocale,
} from './payment';
import { currencyForLocale } from './pricing';
import { StepBookingInfo } from './StepBookingInfo';
import { OutcomePanel, StepConfirmation, StepGuest, StepReview } from './StepDetails';
import { StepsBar } from './StepsBar';
import { Summary, type Contact } from './Summary';
import { initialState, reducer, type Action, type Step } from './state';
import { validateStep1, validateStep2 } from './validation';
import s from './booking.module.css';

const session = (): Storage | null => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

/**
 * Coming back from a gateway with the browser's Back button (the gateway's own return link adds
 * ?result=): the stored session is cancelled and the attempt shown as failed, like the Laravel page.
 */
function cancelStalePayment(dispatch: Dispatch<Action>): boolean {
  const storage = session();
  const { tx, token } = readPaymentAccess(storage);
  if (!tx || !token) return false;
  dispatch({ type: 'outcome', outcome: 'error', checking: true });
  bookingApi
    .cancelPayment(tx, token)
    .catch(() => null)
    .then(() => {
      clearPaymentAccess(storage);
      dispatch({ type: 'outcome', outcome: 'error' });
    });
  return true;
}

export type WizardProps = {
  locale: Locale;
  t: T;
  contact: Contact;
  homeHref: string;
  bookingHref: string;
  privacyHref: string;
  /**
   * Booking Terms page (legal/booking-terms.ts). Step 2 links to it once published; the acceptance
   * checkbox appears whenever the server requires acceptance, and `version` is what the guest accepts.
   */
  terms: { href: string; published: boolean; version: string | null };
  image: string;
};

/**
 * The booking wizard: 1 voyage, date, cabins and amenities; 2 guest details; 3 confirmation method;
 * 4 review and submit. Also handles the return from a payment gateway (?result=&tx=&token=).
 * Reads the URL with useSearchParams, so it renders in the browser below a <Suspense> boundary.
 */
export function BookingWizard({ locale, t, contact, homeHref, bookingHref, privacyHref, terms, image }: WizardProps) {
  const params = useSearchParams();
  const currency = currencyForLocale(locale);
  // An intl page starts with the request only and offers payment once the CMS policy allows it (paymentAllowed).
  const [state, dispatch] = useReducer(reducer, currency, (c) => initialState(c === 'vnd' ? 'sepay' : 'stripe', paymentAllowed(null, locale)));
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  });
  const started = useRef(false);
  const alive = useRef(true);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstStepRender = useRef(true);

  // Boot: payment return, back-from-gateway cancel, or prefill from ?cabin_id / ?cruise_id / ?itinerary_id / ?start_at.
  useEffect(() => {
    alive.current = true;
    if (started.current) return () => void (alive.current = false);
    started.current = true;
    const storage = session();
    const ret = parseReturnParams(params);

    if (ret) {
      clearPaymentAccess(storage);
      dispatch({ type: 'outcome', outcome: 'pending', checking: true });
      const onBooking = (booking: unknown) => dispatch({ type: 'outcome', outcome: 'pending', checking: true, booking: booking as ServerBooking });
      if (ret.result === 'success') {
        pollPaymentStatus(() => bookingApi.paymentStatus({ internal_tx_id: ret.tx, token: ret.token }), { onBooking, isCancelled: () => !alive.current }).then(
          (outcome) => dispatch({ type: 'outcome', outcome }),
        );
      } else {
        bookingApi
          .paymentStatus({ tx: ret.tx, result: ret.result, token: ret.token })
          .then((data) => dispatch({ type: 'outcome', outcome: outcomeFromStatus(data), booking: data.booking ?? undefined }))
          .catch(() => dispatch({ type: 'outcome', outcome: 'error' }));
      }
    } else if (!cancelStalePayment(dispatch)) {
      boot();
    }
    return () => void (alive.current = false);

    function boot() {
      bookingApi.policy().then((policy) => alive.current && dispatch({ type: 'policyLoaded', policy, paymentAllowed: paymentAllowed(policy, locale) }));
      // Coming from the same wizard in another language (language switcher): selection and guest details.
      const handoff = takeHandoff(storage, Date.now());
      const carried = handoff ? restorable(handoff, locale) : null;
      const cabinId = params.get('cabin_id');
      const cruiseId = params.get('cruise_id');
      const itineraryId = params.get('itinerary_id');
      const startAt = normalizeQueryDate(params.get('start_at') || params.get('date'));
      Promise.all([
        bookingApi.departureDates(locale, { cruiseId, itineraryId }).catch(() => [] as string[]),
        cabinId || cruiseId ? bookingApi.suggest(locale, { cabinId, cruiseId }).catch(() => null) : Promise.resolve(null),
      ]).then(([dates, suggestion]) => {
        let date = '';
        if (startAt && dates.includes(startAt)) date = startAt;
        // Language handoff into a page without listed departures (free date entry): keep the guest's date.
        else if (!dates.length && handoff?.date && startAt === handoff.date && handoff.date >= todayYmd()) date = startAt;
        else if (itineraryId && dates.length) date = dates[0];
        else if (suggestion?.date) date = suggestion.date;
        else if (cruiseId && dates.length) date = dates[0];
        const prefill = {
          itineraryId: Number(itineraryId) || suggestion?.itinerary_id || null,
          cruiseId: Number(cruiseId) || suggestion?.cruise_id || null,
          cabinId: Number(cabinId) || null,
          // Intl pages link with inventory ids (content API `booking`); an unknown cabin must not become another one.
          ...(isLegacyLocale(locale) && !carried ? {} : { exactCabin: true }),
          ...(carried?.rooms.length ? { rooms: carried.rooms, amenityQty: carried.amenityQty } : {}),
        };
        dispatch({ type: 'boot', dates, date, prefill: prefill.itineraryId || prefill.cabinId ? prefill : null, guest: carried?.guest });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per page load; the URL is read at that moment.
  }, []);

  // Same check when the page is restored from the bfcache.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      if (parseReturnParams(new URLSearchParams(window.location.search))) clearPaymentAccess(session());
      else cancelStalePayment(dispatch);
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  // Language switcher: carry the selection to the same wizard in the other language (handoff.ts). Only links to
  // another language's booking page are touched; the page's own HTML is unchanged.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.('a[hreflang]') as HTMLAnchorElement | null;
      const target = anchor && switchTarget(anchor.href, locale, '', window.location.origin);
      if (!anchor || !target) return;
      const st = stateRef.current;
      if (st.outcome) return;
      const handoff: Handoff = {
        v: 1,
        at: Date.now(),
        inventory: inventoryOf(locale),
        date: st.date,
        itineraryId: st.itinerary?.itinerary_id ?? null,
        cruiseId: st.itinerary?.cruise_id ?? null,
        rooms: st.rooms.map((r) => ({ cabinId: r.cabinId, guests: r.guests })),
        amenityQty: st.amenityQty,
        guest: st.guest,
      };
      writeHandoff(session(), handoff);
      const url = new URL(anchor.href, window.location.origin);
      anchor.href = url.pathname + handoffQuery(st.date ? handoff : null, locale, target, new URLSearchParams(window.location.search));
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [locale]);

  // Voyages for the chosen date.
  useEffect(() => {
    if (state.itinerariesStatus !== 'loading' || !state.date) return;
    const date = state.date;
    const ctrl = new AbortController();
    bookingApi
      .itineraries(locale, date, ctrl.signal)
      .then((items) => dispatch({ type: 'itinerariesLoaded', date, items }))
      .catch(() => ctrl.signal.aborted || dispatch({ type: 'itinerariesFailed', date }));
    return () => ctrl.abort();
  }, [state.itinerariesStatus, state.date, locale]);

  // Cabins, amenities and route details for the chosen voyage.
  const itinerary = state.itinerary;
  useEffect(() => {
    if (!itinerary) return;
    const id = itinerary.id;
    const ctrl = new AbortController();
    bookingApi
      .cabins(locale, itinerary.cruise_id, itinerary.duration, ctrl.signal)
      .then((items) => dispatch({ type: 'cabinsLoaded', itineraryId: id, items }))
      .catch(() => ctrl.signal.aborted || dispatch({ type: 'cabinsFailed', itineraryId: id }));
    bookingApi
      .amenities(locale, itinerary.itinerary_id, ctrl.signal)
      .then((items) => dispatch({ type: 'amenitiesLoaded', itineraryId: id, items }))
      .catch(() => ctrl.signal.aborted || dispatch({ type: 'amenitiesLoaded', itineraryId: id, items: [] }));
    bookingApi
      .itineraryDetail(locale, itinerary.itinerary_id, ctrl.signal)
      .then((detail) => dispatch({ type: 'detailLoaded', itineraryId: id, detail }))
      .catch(() => ctrl.signal.aborted || dispatch({ type: 'detailLoaded', itineraryId: id, detail: null }));
    return () => ctrl.abort();
  }, [itinerary, locale]);

  // Move focus to the new step's heading so keyboard and screen reader users land on it.
  useEffect(() => {
    if (firstStepRender.current) {
      firstStepRender.current = false;
      return;
    }
    document.getElementById('booking-steps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [state.step, state.outcome]);

  const go = (step: Step) => dispatch({ type: 'goTo', step });

  function next() {
    if (state.step === 1) {
      const result = validateStep1(
        {
          date: state.date,
          itineraryId: state.itinerary?.id ?? null,
          rooms: state.rooms.map((room) => ({ name: state.cabins.find((c) => c.id === room.cabinId)?.name ?? '', guests: room.guests })),
        },
        t.errors,
      );
      if (!result.valid) {
        dispatch({ type: 'setErrors', errors: result.fieldErrors });
        const { date, voyage } = result.fieldErrors;
        if (date || voyage) document.getElementById(date ? 'booking-date' : 'booking-voyage')?.focus();
        else document.getElementById('booking-in-voyage')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    if (state.step === 2) {
      const result = validateStep2(state.guest, t.errors);
      if (!result.valid) {
        dispatch({ type: 'setErrors', errors: result.fieldErrors });
        const first = (['fullName', 'email', 'phone'] as const).find((f) => result.fieldErrors[f]);
        document.getElementById(`guest-${first}`)?.focus();
        return;
      }
    }
    if (state.step < 4) go((state.step + 1) as Step);
  }

  /** Message for a refused submit; `fallback` when the refusal is not about terms or the departure date. */
  function failureMessage(data: Record<string, unknown> | null, fallback: string): string {
    const failure = classifyInitFailure(data);
    if (failure === 'usd_only') return t.errors.currencyUsdOnly;
    if (failure === 'vnd_only') return t.errors.currencyVndOnly;
    if (failure === 'amount') return t.errors.amountFailed;
    if (failure === 'terms') return t.errors.termsRequired;
    if (failure === 'termsUpdated') return t.errors.termsUpdated;
    if (failure === 'departure') return t.errors.departureInvalid;
    if (failure === 'unavailable') return t.errors.bookingUnavailable;
    if (failure === 'paymentLocale') return t.errors.paymentNotOffered;
    return fallback;
  }

  async function submit() {
    const payload = payloadFromState(state, t, currency);
    if (!payload.full_name) return dispatch({ type: 'submitFailed', message: t.errors.fullNameRequired });

    // Rule 8: explicit acceptance before the booking is confirmed or paid (only once the server requires it).
    const termsRequired = state.policy?.termsRequired === true;
    if (termsRequired && !state.termsAccepted) {
      dispatch({ type: 'setErrors', errors: { terms: t.errors.termsRequired } });
      document.getElementById('booking-terms-accept')?.focus();
      return;
    }
    // terms.locale is the language of the TERMS (en for ja: no Japanese terms); `locale` is the page language.
    const acceptance = termsRequired ? ({ accepted: true, version: terms.version, locale: termsLocale(locale) } as const) : undefined;

    if (state.confirmation === 'inquiry') {
      dispatch({ type: 'submit', mode: 'sending' });
      try {
        const { ok, data } = await bookingApi.inquiry(buildInquiryBody(payload, currency, acceptance, locale));
        if (ok && data?.success) {
          // A stored request, not a payment: the result screen says so ('requested', format.ts outcomeView).
          dispatch({ type: 'outcome', outcome: 'requested', reference: typeof data.code === 'string' ? data.code : null });
        } else {
          dispatch({ type: 'submitFailed', message: failureMessage(data, t.errors.inquiryFailed) });
        }
      } catch {
        dispatch({ type: 'submitFailed', message: t.errors.connection });
      }
      return;
    }

    // Payment guard: never start a payment the CMS would refuse (it refuses anyway: payment_locale_not_allowed).
    if (!state.paymentAllowed) return dispatch({ type: 'submitFailed', message: t.errors.paymentNotOffered });
    if (!payload.email) return dispatch({ type: 'submitFailed', message: t.errors.emailForPayment });
    if (!methodSupportsCurrency(state.method, currency)) {
      return dispatch({ type: 'submitFailed', message: state.method === 'sepay' ? t.errors.currencyVndOnly : t.errors.currencyUsdOnly });
    }
    dispatch({ type: 'submit', mode: 'sending' });
    try {
      const body = buildPaymentInitBody({
        method: state.method,
        booking: payload,
        currency,
        returnBase: window.location.origin + window.location.pathname,
        plan: effectivePlan(planOptions(state.policy, state.date), state.paymentPlan),
        terms: acceptance,
        locale,
      });
      const { ok, data } = await bookingApi.initPayment(body);
      if (ok && data?.success && typeof data.payment_url === 'string') {
        if (typeof data.internal_tx_id === 'string') storePaymentAccess(session(), data.internal_tx_id, typeof data.status_token === 'string' ? data.status_token : null);
        dispatch({ type: 'submit', mode: 'redirecting' });
        window.location.href = data.payment_url;
        return;
      }
      dispatch({ type: 'submitFailed', message: failureMessage(data, t.errors.paymentFailed) });
    } catch {
      dispatch({ type: 'submitFailed', message: t.errors.connection });
    }
  }

  const baseSummary = state.serverBooking ? summaryFromBooking(state.serverBooking, t, currency) : summaryFromState(state, t, currency);
  const summary = { ...baseSummary, code: baseSummary.code ?? state.reference };

  const panels: Record<Step, { title: string; em: string; intro: string }> = {
    1: { title: t.step1Title, em: t.step1TitleEm, intro: t.step1Intro },
    2: { title: t.step2Title, em: t.step2TitleEm, intro: t.step2Intro },
    3: { title: t.step3Title, em: t.step3TitleEm, intro: t.step3Intro },
    4: { title: t.step4Title, em: t.step4TitleEm, intro: t.step4Intro },
  };
  const panel = panels[state.step];
  const errorList = Object.values(state.errors);
  const busy = state.submitting !== 'idle';
  const props = { t, locale, state, dispatch, currency };

  return (
    <>
      <StepsBar t={t} step={state.step} allDone={state.outcome !== null} onGo={go} />
      <main className={s.main}>
        <div className={cx('container', s.cols)}>
          <div className={s.flow}>
            {state.outcome ? (
              <OutcomePanel
                t={t}
                outcome={state.outcome}
                checking={state.checking}
                reference={summary.code}
                booking={state.serverBooking}
                locale={locale}
                homeHref={homeHref}
                bookingHref={bookingHref}
              />
            ) : state.boot === 'loading' ? (
              <p className={s.loadingPanel} role="status">
                {t.loadingWizard}
              </p>
            ) : (
              <form
                className={s.panel}
                noValidate
                aria-labelledby="booking-step-title"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (state.step === 4) submit();
                  else next();
                }}
              >
                <div className={s.intro}>
                  <span className={s.eyebrowGold}>{fmt(t.stepCounter, { n: String(state.step).padStart(2, '0'), total: '04' })}</span>
                  <h2 id="booking-step-title" ref={headingRef} tabIndex={-1}>
                    {panel.title}{wordSpace(locale)}<em>{panel.em}</em>
                  </h2>
                  <p>{panel.intro}</p>
                </div>

                {state.step === 1 && <StepBookingInfo {...props} routeImage={image} />}
                {state.step === 2 && <StepGuest {...props} privacyHref={privacyHref} termsHref={terms.published ? terms.href : undefined} />}
                {state.step === 3 && <StepConfirmation {...props} />}
                {state.step === 4 && <StepReview {...props} termsHref={terms.href} privacyHref={privacyHref} />}

                <div aria-live="assertive" className={s.liveRegion}>
                  {errorList.length > 0 && (
                    <div className={s.errorBox} role="alert">
                      <strong>{t.errorsTitle}</strong>
                      <ul>
                        {errorList.map((message) => (
                          <li key={message}>{message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {state.submitError && (
                    <p className={s.errorBox} role="alert">
                      {state.submitError}
                    </p>
                  )}
                </div>

                <div className={s.controlBar}>
                  {state.step === 1 ? (
                    <span className={s.fieldHint}>
                      {t.needHelp}{' '}
                      {contact.email ? <a href={`mailto:${contact.email}`}>{t.talkToTeam}</a> : t.talkToTeam}
                    </span>
                  ) : (
                    <button type="button" className={s.ghostBtn} onClick={() => go((state.step - 1) as Step)} disabled={busy}>
                      ← {state.step === 2 ? t.backToBooking : state.step === 3 ? t.backToGuests : t.changeMethod}
                    </button>
                  )}
                  <button type="submit" className={s.mainBtn} disabled={busy} aria-busy={busy}>
                    {state.step === 1 && t.continueToGuests}
                    {state.step === 2 && t.continue}
                    {state.step === 3 && t.reviewRequest}
                    {state.step === 4 &&
                      (state.submitting === 'redirecting'
                        ? t.redirecting
                        : state.submitting === 'sending'
                          ? t.submitting
                          : state.confirmation === 'inquiry'
                            ? t.submitInquiry
                            : t.submitPayment)}{' '}
                    <span aria-hidden="true">↗︎</span>
                  </button>
                </div>
              </form>
            )}
          </div>
          <Summary t={t} locale={locale} model={summary} contact={contact} image={image} />
        </div>
      </main>
    </>
  );
}
