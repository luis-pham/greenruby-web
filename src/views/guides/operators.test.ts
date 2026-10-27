import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fareRanges, listedServices, OPERATORS, SERVICES, TRANSPORT_CHECKED } from './operators.ts';
import transferEn from './transfer.en.ts';
import transferVi from './transfer.vi.ts';

test('every service points to a known operator, cites https sources and has a check date', () => {
  for (const s of SERVICES) {
    const where = `${s.operatorId} ${s.routeId}`;
    assert.ok(OPERATORS.some((o) => o.operatorId === s.operatorId), `${where}: unknown operator`);
    assert.ok(s.sourceUrls.length > 0, `${where}: no source`);
    for (const url of s.sourceUrls) assert.match(url, /^https:\/\//, where);
    assert.match(s.verifiedAt, /^\d{4}-\d{2}-\d{2}$/, where);
    if (s.fareMin !== null && s.fareMax !== null) assert.ok(s.fareMin <= s.fareMax, `${where}: fare range`);
    if (s.listed) assert.ok(s.bookingUrl || OPERATORS.find((o) => o.operatorId === s.operatorId)!.phones.length > 0, `${where}: no way to book`);
  }
});

test('unverified entries are never shown', () => {
  assert.ok(SERVICES.some((s) => s.verificationStatus === 'unverified'));
  for (const s of SERVICES) if (s.verificationStatus === 'unverified') assert.equal(s.listed, false, `${s.operatorId} ${s.routeId}`);
  assert.ok(listedServices(['hanoi-halong']).every((s) => s.verificationStatus !== 'unverified'));
});

test('phone numbers: international ones dial as +84, 1900 numbers have no international form', () => {
  for (const o of OPERATORS) {
    for (const p of o.phones) {
      if (p.e164) assert.match(p.e164, /^84[1-9]\d{8,9}$/, `${o.operatorId} ${p.display}`);
      else assert.match(p.display, /^1900/, `${o.operatorId}: ${p.display} needs an e164 form`);
      if (p.whatsapp || p.zalo) assert.ok(p.e164, `${o.operatorId}: messaging needs a mobile number`);
    }
  }
});

test('fare ranges per route keep transport types, currencies and units apart', () => {
  const hanoi = fareRanges('hanoi-halong');
  assert.deepEqual(hanoi.find((r) => r.transportType === 'shared-limousine' && r.currency === 'VND'), { transportType: 'shared-limousine', min: 250000, max: 360000, currency: 'VND', unit: 'seat', open: false });
  assert.equal(hanoi.find((r) => r.transportType === 'bus')?.min, 160000, 'coach fares stay apart from limousine fares');
  assert.ok(hanoi.some((r) => r.transportType === 'shared-limousine' && r.currency === 'USD'));
  assert.ok(hanoi.some((r) => r.unit === 'vehicle'));
  assert.equal(fareRanges('vandon-halong').length, 0, 'only unverified data for Van Don');
  assert.equal(fareRanges('halong-ninhbinh').find((r) => r.unit === 'vehicle')?.open, true);
});

test('the transport check date is the latest verifiedAt', () => {
  assert.equal(TRANSPORT_CHECKED, SERVICES.map((s) => s.verifiedAt).sort().at(-1));
});

test('guides only reference routes that have listed operators, and selector anchors exist', () => {
  for (const g of [transferEn, transferVi]) {
    const ids = new Set(g.sections.map((s) => s.id));
    for (const section of g.sections) {
      for (const block of section.blocks) {
        if ('operators' in block) assert.ok(listedServices(block.operators).length > 0, `${section.id}: empty operator table`);
      }
    }
    for (const anchor of Object.values(g.selector!.labels.operatorsAnchor)) assert.ok(ids.has(anchor!), `missing section #${anchor}`);
  }
});
