import type { APIRoute } from 'astro';
import { featureAreas, guideUrl, statusLabel } from '../data/features';
import { formatPence, formatPrice, pricing } from '../data/pricing';
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
    // Prices reach llms.txt only once confirmed (see src/data/pricing.ts).
    ...(pricing.confirmed
      ? [
          '## Pricing',
          '',
          `Prices in GBP, excluding VAT. ${pricing.basis}`,
          '',
          ...pricing.plans.map(
            (plan) => `- ${plan.name}: up to ${plan.vehicles} active vehicles, ${formatPrice(plan.monthly)} a month or ${formatPrice(plan.yearly)} a year`,
          ),
          `- More than 25 active vehicles: quoted.`,
          `- Texts to clients: ${formatPence(pricing.texts.price)} each, billed quarterly.`,
          '',
          `${pricing.activeVehicle} ${pricing.start} ${pricing.terms} Founding partners (${pricing.foundingPartner.places} places): ${pricing.foundingPartner.discount}; ${pricing.foundingPartner.lock.toLowerCase()}.`,
          '',
        ]
      : []),
    '## Features',
    '',
    ...featureAreas.map((feature) => {
      const guide = guideUrl(feature);
      return `- ${feature.name} (${statusLabel[feature.status].toLowerCase()}): ${feature.summary}${guide ? ` Guide: ${guide}` : ''}`;
    }),
    '',
    '## Pages',
    '',
    `- [Home](${site.url}/): what First Mile Manager does, who it is for and what is being built`,
    `- [Pricing](${site.url}/pricing): plans by active vehicles, what every plan includes and the founding partner offer`,
    `- [Early access](${site.url}/early-access): how to apply, what you get and what we ask`,
    ...(site.helpUrl
      ? [`- [Help centre](${site.helpUrl}): how to use First Mile Manager; its own llms.txt (${site.helpUrl}/llms.txt) lists every guide`]
      : []),
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
