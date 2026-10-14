import { llmsFull } from '@/lib/llms';

// llms-full.txt: the llms.txt facts plus full text (FAQ answers, itinerary programmes, policies). See lib/llms.ts.
export async function GET() {
  return new Response(await llmsFull(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
