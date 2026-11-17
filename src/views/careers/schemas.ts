import { z } from 'zod';

// Content API payloads of the recruitment pages (no server-only import, so tests can parse fixtures).

const text = z.string().nullable();
/** Stored keys; jsonld.ts maps them to schema.org employmentType, messages.ts to Vietnamese labels. */
export const employmentTypes = ['full-time', 'part-time', 'contract', 'temporary', 'intern'] as const;
export type EmploymentType = (typeof employmentTypes)[number];

export const jobSummarySchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  department: z.string(),
  employmentType: z.enum(employmentTypes).nullable(),
  location: text,
  /** YYYY-MM-DD */
  postedAt: text,
  /** Last day to apply, YYYY-MM-DD (inclusive, Vietnam time). */
  deadline: text,
});
export type JobSummary = z.infer<typeof jobSummarySchema>;

export const jobListSchema = z.object({ email: z.string(), items: z.array(jobSummarySchema) });
export type JobList = z.infer<typeof jobListSchema>;

export const jobSchema = jobSummarySchema.extend({
  /** open = listed, apply button, JobPosting schema; closed = status closed or past the deadline. */
  state: z.enum(['open', 'closed']),
  summary: text,
  introHtml: text,
  descriptionHtml: text,
  requirementsHtml: text,
  benefitsHtml: text,
  applyEmail: z.string(),
  address: z.object({ locality: text, region: text }),
  seo: z.object({ title: text, description: text }),
  updatedAt: text,
});
export type Job = z.infer<typeof jobSchema>;
