// The homepage "Life on board" icon is picked from the facility name, in every site language.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { facilityKind } from './facility-kind.ts';

test('facility names map to the same icon in every language', () => {
  const cases: [string, string][] = [
    ['Main Restaurant', 'dining'], ['Restaurant principal', 'dining'], ['Restaurante principal', 'dining'], ['メインレストラン', 'dining'],
    ['Sky Bar & Lounge', 'bar'],
    ['Sundeck Pool', 'pool'], ['Piscine du pont soleil', 'pool'], ['Piscina superior', 'pool'], ['サンデッキのプール', 'pool'], ['Hồ bơi', 'pool'],
    ['Spa & Wellness Centre', 'wellness'], ['Spa et centre de bien-être', 'wellness'], ['Spa y bienestar', 'wellness'],
    ['Imperial Suite', 'cabin'], ['Camarote', 'cabin'],
    ['Hauptrestaurant', 'dining'], ['Speisesaal', 'dining'], ['Sky Bar & Lounge (Getränke)', 'bar'], ['Weinbar', 'bar'],
    ['Pool auf dem Sonnendeck', 'pool'], ['Schwimmbecken', 'pool'], ['Spa & Wellness', 'wellness'], ['Massage und Sauna', 'wellness'],
    ['Kabine Ocean Breeze Premium', 'cabin'], ['Kabinen und Suiten', 'cabin'], ['Livemusik am Abend', 'entertainment'], ['Kino an Deck', 'entertainment'],
    ['Geringerer Energieverbrauch', 'default'],
    ['메인 레스토랑', 'dining'], ['선상 다이닝', 'dining'], ['스카이 바 & 라운지', 'bar'], ['와인바', 'bar'], ['칵테일 라운지', 'bar'],
    ['선데크 수영장', 'pool'], ['인피니티 풀', 'pool'], ['스파 & 웰니스', 'wellness'], ['피트니스 센터', 'wellness'], ['마사지 룸', 'wellness'],
    ['Imperial Suite 객실', 'cabin'], ['객실과 스위트', 'cabin'], ['캐빈', 'cabin'], ['라이브 공연', 'entertainment'], ['노래방', 'entertainment'],
    ['엔터테인먼트', 'entertainment'], ['바다 전망 선실', 'cabin'], ['에너지 사용량 절감', 'default'], ['태양광 발전 설비', 'default'],
    ['Lower Energy Use', 'default'], ['Menor consumo energético', 'default'],
  ];
  for (const [name, kind] of cases) assert.equal(facilityKind(name), kind, name);
});
