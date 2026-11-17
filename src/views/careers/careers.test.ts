import assert from 'node:assert/strict';
import { test } from 'node:test';
import { jobDescriptionHtml, jobPostingSchema } from './jsonld.ts';
import { formatDay } from './messages.ts';
import { applyMailto, isJobSlug, jobPath } from './paths.ts';
import { jobListSchema, jobSchema, type Job } from './schemas.ts';

const headings = { intro: 'Giới thiệu công việc', description: 'Mô tả công việc', requirements: 'Yêu cầu công việc', benefits: 'Quyền lợi' };
const org = { id: 'https://greenrubycruises.com/#organization', name: 'Green Ruby Cruises', url: 'https://greenrubycruises.com', logo: 'https://greenrubycruises.com/upload/logo.png' };

const job: Job = jobSchema.parse({
  id: 1,
  slug: 'chuyen-vien-marketing',
  title: 'Chuyên viên Marketing',
  department: 'Marketing',
  employmentType: 'full-time',
  location: 'Tuần Châu, Hạ Long, Quảng Ninh',
  postedAt: '2026-11-17',
  deadline: '2026-12-15',
  state: 'open',
  summary: 'Phụ trách truyền thông thương hiệu.',
  introHtml: null,
  descriptionHtml: '<ul><li>Lập kế hoạch nội dung</li></ul>',
  requirementsHtml: '<p>Tối thiểu 2 năm kinh nghiệm</p>',
  benefitsHtml: null,
  applyEmail: 'hrm@greenrubycruises.com',
  address: { locality: 'Hạ Long', region: 'Quảng Ninh' },
  seo: { title: null, description: null },
  updatedAt: null,
});

test('applyMailto encodes the Vietnamese subject with en dashes', () => {
  const href = applyMailto('hrm@greenrubycruises.com', 'Sales OTA');
  assert.equal(href, 'mailto:hrm@greenrubycruises.com?subject=%E1%BB%A8ng%20tuy%E1%BB%83n%20%E2%80%93%20Sales%20OTA%20%E2%80%93%20Green%20Ruby%20Cruises');
  assert.equal(decodeURIComponent(href.split('subject=')[1]), 'Ứng tuyển – Sales OTA – Green Ruby Cruises');
});

test('applyMailto keeps reserved characters of a title inside the subject', () => {
  const subject = decodeURIComponent(applyMailto('a@b.vn', 'Sales & Admin?').split('subject=')[1]);
  assert.equal(subject, 'Ứng tuyển – Sales & Admin? – Green Ruby Cruises');
});

test('job paths and slugs', () => {
  assert.equal(jobPath('sales-ota'), '/tuyen-dung/sales-ota');
  assert.ok(isJobSlug('sales-ota'));
  assert.ok(!isJobSlug('_none'));
  assert.ok(!isJobSlug('Sales-OTA'));
  assert.ok(!isJobSlug('../x'));
});

test('formatDay renders a calendar day without a time zone shift', () => {
  assert.equal(formatDay('2026-12-01'), '01/12/2026');
});

test('JobPosting: an open posting with real values only', () => {
  const schema = jobPostingSchema(job, { url: 'https://greenrubycruises.com/tuyen-dung/chuyen-vien-marketing', org, description: jobDescriptionHtml(job, headings) });
  assert.ok(schema);
  assert.equal(schema['@type'], 'JobPosting');
  assert.equal(schema.title, 'Chuyên viên Marketing');
  assert.equal(schema.datePosted, '2026-11-17');
  assert.equal(schema.validThrough, '2026-12-15T23:59:59+07:00');
  assert.equal(schema.employmentType, 'FULL_TIME');
  assert.deepEqual(schema.jobLocation, { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Hạ Long', addressRegion: 'Quảng Ninh', addressCountry: 'VN' } });
  assert.equal((schema.hiringOrganization as { name: string }).name, 'Green Ruby Cruises');
  assert.ok(!('baseSalary' in schema), 'no invented salary');
  // Only the sections that have content, under their headings.
  assert.match(String(schema.description), /Mô tả công việc.*Lập kế hoạch nội dung.*Yêu cầu công việc/);
  assert.doesNotMatch(String(schema.description), /Quyền lợi|Giới thiệu công việc/);
});

test('JobPosting: optional properties are left out when the CMS has no value', () => {
  const plain = { ...job, deadline: null, employmentType: null, address: { locality: null, region: 'Quảng Ninh' } };
  const schema = jobPostingSchema(plain, { url: 'u', org: { ...org, logo: null }, description: '<p>x</p>' });
  assert.ok(schema);
  assert.ok(!('validThrough' in schema));
  assert.ok(!('employmentType' in schema));
  assert.ok(!('logo' in (schema.hiringOrganization as object)));
  assert.deepEqual((schema.jobLocation as { address: object }).address, { '@type': 'PostalAddress', addressRegion: 'Quảng Ninh', addressCountry: 'VN' });
});

test('JobPosting: none for a closed posting or when a required value is missing', () => {
  const args = { url: 'u', org, description: '<p>x</p>' };
  assert.equal(jobPostingSchema({ ...job, state: 'closed' }, args), null);
  assert.equal(jobPostingSchema({ ...job, postedAt: null }, args), null);
  assert.equal(jobPostingSchema({ ...job, address: { locality: null, region: null } }, args), null);
  assert.equal(jobPostingSchema(job, { ...args, description: null }), null);
});

test('jobDescriptionHtml escapes the plain-text summary', () => {
  const html = jobDescriptionHtml({ ...job, summary: 'A <b> & C', descriptionHtml: null, requirementsHtml: null }, headings);
  assert.equal(html, '<p>A &lt;b&gt; &amp; C</p>');
});

test('list schema: rejects an unknown employment type (CMS and website must agree)', () => {
  const item = { id: 1, slug: 's', title: 't', department: 'd', employmentType: 'freelance', location: null, postedAt: null, deadline: null };
  assert.throws(() => jobListSchema.parse({ email: 'hrm@greenrubycruises.com', items: [item] }));
  assert.equal(jobListSchema.parse({ email: 'x@y.vn', items: [{ ...item, employmentType: null }] }).items.length, 1);
});
