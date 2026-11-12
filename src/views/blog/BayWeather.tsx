import { byLocale, localeInfo, type Locale } from '@/lib/i18n';
import { BAYS, getBayWeather, type Bay, type BayWeather as Forecast, type Condition } from '@/lib/weather';
import s from './article.module.css';

type Copy = {
  /** H2 with the language's "<bay> weather today" search query. */
  title: string;
  intro: string;
  bays: Record<Bay, string>;
  now: string;
  wind: string;
  humidity: string;
  rain6h: string;
  next3: string;
  updated: (time: string) => string;
  source: string;
  note: string;
  conditions: Record<Condition, string>;
  /** Compass points the wind blows FROM, N clockwise. */
  compass: readonly [string, string, string, string, string, string, string, string];
};

const COPY = byLocale<Copy>({
  en: {
    title: 'Ha Long Bay weather today',
    intro: 'Current conditions and a three-day forecast for Ha Long Bay and Lan Ha Bay, updated automatically every 30 minutes.',
    bays: { halong: 'Ha Long Bay', lanha: 'Lan Ha Bay' },
    now: 'Now',
    wind: 'Wind',
    humidity: 'Humidity',
    rain6h: 'Rain, next 6 h',
    next3: 'Next three days',
    updated: (t) => `Forecast updated at ${t} (Vietnam time).`,
    source: 'Data: MET Norway',
    note: 'This is an automatic forecast, not a sailing notice. In a storm the port authority decides whether ships may leave port; if your cruise is affected, our team will contact you directly.',
    conditions: { clear: 'Clear', partly: 'Partly cloudy', cloudy: 'Cloudy', fog: 'Fog', lightRain: 'Light rain', rain: 'Rain', heavyRain: 'Heavy rain', thunder: 'Thunderstorms' },
    compass: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
  },
  vi: {
    title: 'Thời tiết Hạ Long hôm nay',
    intro: 'Thời tiết hiện tại và dự báo 3 ngày tới ở vịnh Hạ Long và vịnh Lan Hạ, tự động cập nhật 30 phút một lần.',
    bays: { halong: 'Vịnh Hạ Long', lanha: 'Vịnh Lan Hạ' },
    now: 'Hiện tại',
    wind: 'Gió',
    humidity: 'Độ ẩm',
    rain6h: 'Mưa trong 6 giờ tới',
    next3: '3 ngày tới',
    updated: (t) => `Dự báo cập nhật lúc ${t} (giờ Việt Nam).`,
    source: 'Dữ liệu: MET Norway',
    note: 'Đây là dự báo tự động, không phải thông báo lịch tàu. Khi có bão, Cảng vụ quyết định tàu có được rời bến hay không; nếu chuyến đi của bạn bị ảnh hưởng, Green Ruby sẽ liên hệ trực tiếp với bạn.',
    conditions: { clear: 'Trời quang', partly: 'Ít mây', cloudy: 'Nhiều mây', fog: 'Sương mù', lightRain: 'Mưa nhỏ', rain: 'Có mưa', heavyRain: 'Mưa to', thunder: 'Có dông' },
    compass: ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'],
  },
  ja: {
    title: '今日のハロン湾の天気',
    intro: 'ハロン湾とランハ湾の現在の天気と、3日間の予報です。30分ごとに自動で更新されます。',
    bays: { halong: 'ハロン湾', lanha: 'ランハ湾' },
    now: '現在',
    wind: '風',
    humidity: '湿度',
    rain6h: '降水量（6時間）',
    next3: '3日間の予報',
    updated: (t) => `予報の更新：${t}（ベトナム時間）`,
    source: 'データ：MET Norway（ノルウェー気象研究所）',
    note: 'この予報は自動配信であり、運航のお知らせではありません。台風などの荒天時は、出港できるかどうかを港湾当局が判断します。ご予約のクルーズに影響がある場合は、Green Rubyから直接ご連絡いたします。',
    conditions: { clear: '晴れ', partly: '晴れ時々曇り', cloudy: '曇り', fog: '霧', lightRain: '小雨', rain: '雨', heavyRain: '大雨', thunder: '雷雨' },
    compass: ['北', '北東', '東', '南東', '南', '南西', '西', '北西'],
  },
  fr: {
    title: 'Météo de la baie d’Halong aujourd’hui',
    intro: 'Conditions actuelles et prévisions sur trois jours pour la baie d’Halong et la baie de Lan Ha, mises à jour automatiquement toutes les 30 minutes.',
    bays: { halong: 'Baie d’Halong', lanha: 'Baie de Lan Ha' },
    now: 'En ce moment',
    wind: 'Vent',
    humidity: 'Humidité',
    rain6h: 'Pluie sur 6\u00a0h',
    next3: 'Les trois prochains jours',
    updated: (t) => `Prévisions mises à jour à ${t} (heure du Vietnam).`,
    source: 'Données : MET Norway',
    note: 'Il s’agit d’une prévision automatique, pas d’un avis de navigation. En cas de tempête, l’autorité portuaire décide si les bateaux peuvent quitter le port ; si votre croisière est concernée, notre équipe vous contactera directement.',
    conditions: { clear: 'Ciel dégagé', partly: 'Éclaircies', cloudy: 'Nuageux', fog: 'Brouillard', lightRain: 'Pluie faible', rain: 'Pluie', heavyRain: 'Forte pluie', thunder: 'Orages' },
    compass: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'],
  },
  es: {
    title: 'El tiempo hoy en la bahía de Halong',
    intro: 'Condiciones actuales y previsión de tres días para la bahía de Halong y la bahía de Lan Ha, actualizadas automáticamente cada 30 minutos.',
    bays: { halong: 'Bahía de Halong', lanha: 'Bahía de Lan Ha' },
    now: 'Ahora',
    wind: 'Viento',
    humidity: 'Humedad',
    rain6h: 'Lluvia en 6 h',
    next3: 'Próximos tres días',
    updated: (t) => `Previsión actualizada a las ${t} (hora de Vietnam).`,
    source: 'Datos: MET Norway',
    note: 'Es una previsión automática, no un aviso de navegación. En caso de temporal, la autoridad portuaria decide si los barcos pueden zarpar; si su crucero se ve afectado, nuestro equipo se pondrá en contacto con usted directamente.',
    conditions: { clear: 'Despejado', partly: 'Intervalos nubosos', cloudy: 'Nublado', fog: 'Niebla', lightRain: 'Lluvia débil', rain: 'Lluvia', heavyRain: 'Lluvia fuerte', thunder: 'Tormentas' },
    compass: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'],
  },
});

const TZ = 'Asia/Ho_Chi_Minh';

/** Live weather for both bays, shown on the "best time to visit" articles. Renders nothing when both forecasts fail. */
export async function BayWeather({ locale }: { locale: Locale }) {
  const bays = Object.keys(BAYS) as Bay[];
  const forecasts = await Promise.all(bays.map((bay) => getBayWeather(bay)));
  const shown = bays.flatMap((bay, i) => (forecasts[i] ? [{ bay, forecast: forecasts[i] }] : []));
  if (shown.length === 0) return null;

  const c = COPY[locale];
  const tag = localeInfo[locale].intlTag;
  const time = new Intl.DateTimeFormat(tag, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: TZ });
  const day = new Intl.DateTimeFormat(tag, { weekday: 'short', day: 'numeric', month: 'numeric', timeZone: 'UTC' });
  const num = new Intl.NumberFormat(tag, { maximumFractionDigits: 1 });
  const updatedAt = shown.map((x) => x.forecast.updatedAt).sort()[0];

  return (
    <section className={s.weather} aria-labelledby="weather-today">
      <h2 id="weather-today" className={s.weatherTitle}>{c.title}</h2>
      <p className={s.weatherIntro}>{c.intro}</p>
      <div className={s.weatherGrid}>
        {shown.map(({ bay, forecast }) => (
          <BayCard key={bay} name={c.bays[bay]} ship={BAYS[bay].ship} f={forecast} c={c} dayFmt={day} num={num} />
        ))}
      </div>
      <p className={s.weatherMeta}>
        {c.updated(time.format(new Date(updatedAt)))}{' '}
        <a href="https://api.met.no/" target="_blank" rel="noreferrer noopener">{c.source}</a> (CC BY 4.0).
      </p>
      <p className={s.weatherNote}>{c.note}</p>
    </section>
  );
}

function BayCard({ name, ship, f, c, dayFmt, num }: { name: string; ship: string; f: Forecast; c: Copy; dayFmt: Intl.DateTimeFormat; num: Intl.NumberFormat }) {
  const compass = c.compass[Math.round(f.now.windFrom / 45) % 8];
  return (
    <div className={s.weatherCard}>
      <p className={s.weatherBay}>
        <strong>{name}</strong> <span>{ship}</span>
      </p>
      <div className={s.weatherNow}>
        <WeatherIcon condition={f.now.condition} className={s.weatherIconLarge} />
        <div>
          <span className={s.weatherLabel}>{c.now}</span>
          <span className={s.weatherTemp}>{f.now.temp}°C</span>
          <span className={s.weatherCondition}>{c.conditions[f.now.condition]}</span>
        </div>
      </div>
      <dl className={s.weatherFacts}>
        <div><dt>{c.wind}</dt><dd>{f.now.wind} km/h {compass}</dd></div>
        <div><dt>{c.humidity}</dt><dd>{f.now.humidity}%</dd></div>
        <div><dt>{c.rain6h}</dt><dd>{num.format(f.now.rain6h)} mm</dd></div>
      </dl>
      {f.days.length > 0 && (
        <>
          <p className={s.weatherLabel}>{c.next3}</p>
          <ul className={s.weatherDays}>
            {f.days.map((d) => (
              <li key={d.date}>
                <span className={s.weatherDay}>{dayFmt.format(new Date(`${d.date}T00:00:00Z`))}</span>
                <WeatherIcon condition={d.condition} className={s.weatherIconSmall} />
                <span className={s.weatherCondition}>{c.conditions[d.condition]}</span>
                <span className={s.weatherRange}>{d.min}–{d.max}°C</span>
                {d.rain >= 0.5 && <span className={s.weatherRain}>{num.format(d.rain)} mm</span>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/** Line icons (stroke = currentColor); decorative, the condition is always written next to them. */
function WeatherIcon({ condition, className }: { condition: Condition; className?: string }) {
  const sun = <><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" /></>;
  const cloud = <path d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.5A3.3 3.3 0 0 0 7 18z" />;
  const smallSun = <><circle cx="8" cy="8" r="3" /><path d="M8 2.5v1.2M2.5 8h1.2M4.1 4.1l.9.9M11.9 4.1l-.9.9" /></>;
  const cloudHigh = <path d="M7 15h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.5A3.3 3.3 0 0 0 7 15z" />;
  const parts: Record<Condition, React.ReactNode> = {
    clear: sun,
    partly: <>{smallSun}<path d="M9 19h8a3.5 3.5 0 0 0 .3-7 4.8 4.8 0 0 0-9.1 1.2A2.9 2.9 0 0 0 9 19z" /></>,
    cloudy: cloud,
    fog: <><path d="M7 13h10a3.5 3.5 0 0 0 .3-7 4.8 4.8 0 0 0-9.2 1.3A2.9 2.9 0 0 0 7 13z" /><path d="M4 17h16M6 20.5h12" /></>,
    lightRain: <>{cloudHigh}<path d="M10 18.5v1.5M14 18.5v1.5" /></>,
    rain: <>{cloudHigh}<path d="M8.5 18l-1 3M12.5 18l-1 3M16.5 18l-1 3" /></>,
    heavyRain: <>{cloudHigh}<path d="M7.5 18l-1.5 4M11 18l-1.5 4M14.5 18l-1.5 4M18 18l-1.5 4" /></>,
    thunder: <>{cloudHigh}<path d="M12.5 16l-2 3.5h3l-2 3.5" /></>,
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {parts[condition]}
    </svg>
  );
}
