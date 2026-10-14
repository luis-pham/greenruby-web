import { llmsIndex } from '@/lib/llms';

// llms.txt (https://llmstxt.org): curated Markdown map of the site for AI assistants (see lib/llms.ts).
export async function GET() {
  return new Response(await llmsIndex(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
