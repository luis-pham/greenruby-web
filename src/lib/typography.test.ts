// Locale-aware joins (phase 2B): English and Vietnamese get exactly the text they had before; Japanese drops the
// half-width spaces and uses the full-width colon.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { headlineStop, labelled, splitAt, topicJoin, wordSpace } from './typography.ts';

describe('wordSpace', () => {
  it('is the JSX space it replaces for en/vi, nothing for ja', () => {
    assert.equal(wordSpace('en'), ' ');
    assert.equal(wordSpace('vi'), ' ');
    assert.equal(wordSpace('ja'), '');
  });
});

describe('headlineStop', () => {
  it('keeps the decorative full stop for en/vi, drops it for ja', () => {
    assert.equal(headlineStop('en'), true);
    assert.equal(headlineStop('vi'), true);
    assert.equal(headlineStop('ja'), false);
  });
});

describe('topicJoin', () => {
  it('is the JSX space for en/vi and の for ja', () => {
    assert.equal(topicJoin('en'), ' ');
    assert.equal(topicJoin('vi'), ' ');
    assert.equal(`ご予約・お支払い${topicJoin('ja')}よくあるご質問`, 'ご予約・お支払いのよくあるご質問');
  });
});

describe('labelled', () => {
  it('keeps "label: value" for en/vi, full-width colon for ja', () => {
    assert.equal(labelled('Next departure', '15 Feb 2027', 'en'), 'Next departure: 15 Feb 2027');
    assert.equal(labelled('Khởi hành gần nhất', '15 thg 2, 2027', 'vi'), 'Khởi hành gần nhất: 15 thg 2, 2027');
    assert.equal(labelled('次回の出発日', '2027年2月15日', 'ja'), '次回の出発日：2027年2月15日');
  });
  it('is the template it replaces for en/vi', () => {
    for (const locale of ['en', 'vi'] as const) assert.equal(labelled('A', 'b', locale), `${'A'}: ${'b'}`);
  });
});

describe('splitAt', () => {
  it('splits at the placeholder', () => {
    assert.deepEqual(splitAt('詳しくは{link}をご覧ください。', 'link'), ['詳しくは', 'をご覧ください。']);
    assert.deepEqual(splitAt('{link} first', 'link'), ['', ' first']);
  });
  it('is null without the placeholder (en/vi copy keeps its own layout)', () => {
    assert.equal(splitAt('We use your details only to answer this enquiry. See our', 'link'), null);
    assert.equal(splitAt('{other}', 'link'), null);
  });
});
