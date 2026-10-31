// Intl 404s (phase 2B): only URLs of an intl tree reach the proxy's public/closed decision; English and Vietnamese
// paths never do.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CATCH_ALL, intlTreeLocale } from './intl-404.ts';
import { appRoutes } from './routes.generated.ts';

describe('intlTreeLocale', () => {
  it('is null for English and Vietnamese paths', () => {
    for (const path of ['/', '/xyz', '/cruise/a-1.html', '/vi', '/vi/xyz', '/japan', '/jaxyz', '/booking']) assert.equal(intlTreeLocale(path), null, path);
  });

  it('is the locale for every URL of the Japanese tree, its home included', () => {
    for (const path of ['/ja', '/ja/', '/ja/xyz', '/ja/contact', '/ja/cruise/green-ruby-1-3.html', '/ja/booking']) assert.equal(intlTreeLocale(path), 'ja', path);
  });

  it('the generated registry lists the Japanese catch-all', () => {
    assert.ok(appRoutes.includes(`/(ja)/ja/${CATCH_ALL}`), 'routes-generate.mjs writes the catch-all');
  });
});
