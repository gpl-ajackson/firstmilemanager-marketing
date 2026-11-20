import type { APIRoute } from 'astro';
import { site } from '../data/site';

// A plain-text summary for AI assistants (https://llmstxt.org), built from the same data as the pages.
export const GET: APIRoute = () => {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Stage: ${site.stage}.`,
    `Contact: ${site.email}`,
    '',
    '## Pages',
    '',
    `- [Home](${site.url}/): what First Mile Manager is for and who it suits`,
    `- [Early access](${site.url}/early-access): how to apply, what you get and what we ask`,
    ...(site.helpUrl
      ? [`- [Help centre](${site.helpUrl}): how to use First Mile Manager; its own llms.txt (${site.helpUrl}/llms.txt) lists every guide`]
      : []),
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
