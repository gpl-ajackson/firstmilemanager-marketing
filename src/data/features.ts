/**
 * Every product claim on the site comes from here. A feature that has not reached the demo yet
 * must be 'in-development', which shows a label wherever it appears (AGENTS.md, content rule 2).
 * When a feature reaches the demo, change its status here and the labels change site-wide.
 *
 * The areas follow the slices in the First Mile Manager Product Plan, in the order they are built.
 */
import { site } from './site';

export type FeatureStatus = 'available' | 'in-development';

interface FeatureDetails {
  id: string;
  name: string;
  summary: string;
  points: string[];
  href?: string;
}

/**
 * Only a feature on the demo can name its guide: the help centre publishes an Article only once its
 * feature reaches the demo.
 */
export type FeatureArea = FeatureDetails &
  (
    | {
        status: 'available';
        /**
         * The Article Name of the help centre's guide to this feature, as in its address
         * `help.firstmilemanager.co.uk/articles/<Article Name>`. Fill it in once that Article is published.
         */
        articleName?: string;
      }
    | { status: 'in-development'; articleName?: never }
  );

export const featureAreas: FeatureArea[] = [
  {
    id: 'team',
    name: 'Your team and sign-ins',
    status: 'in-development',
    summary: 'Invite your office team and your drivers by email or text message, and give each person only the jobs they do.',
    points: [
      'Roles for the owner, finance, account managers, the transport manager, drivers and the warehouse team',
      'Drivers invited by mobile number, with no work email needed',
      'Your transport manager invites the drivers, so you don’t have to',
    ],
  },
  {
    id: 'clients',
    name: 'Clients and rate cards',
    status: 'in-development',
    summary: 'Every client set up once, with its contacts, collection addresses and the prices it pays for each service.',
    points: [
      'Several collection addresses per client, each with its own site contact, hours and access notes',
      'Contacts for bookings, collection alerts and invoices',
      'A standard rate card, and one per client changed line by line from a given date',
      'Collection, minimum and failed-collection charges where you need them',
    ],
  },
  {
    id: 'bookings',
    name: 'Bookings by your clients',
    status: 'in-development',
    summary: 'Clients book their own collections and see where their goods are, so fewer booking emails and calls reach you.',
    points: [
      'Regular collections set up once, and one-off pickups booked in a minute',
      'An instant price from the client’s rate card',
      'Quote requests for large or unusual loads',
      'Updates by email or text message at the moments each client chooses',
    ],
  },
  {
    id: 'rounds',
    name: 'Collection rounds and check-in',
    status: 'in-development',
    summary: 'Plan tomorrow’s rounds across your vehicles, collect with a phone or a paper runsheet, and check goods in without typing.',
    points: [
      'Rounds planned against each vehicle’s pallets, weight and space',
      'A phone app for drivers, with proof of collection and the reason for a failed one',
      'A printed runsheet for drivers who prefer paper',
      'Goods checked in at the depot by scanning, with differences flagged',
    ],
  },
  {
    id: 'billing',
    name: 'Billing and profitability',
    status: 'in-development',
    summary: 'Every collection priced from the client’s rate card and invoiced on the client’s schedule, with profit by client, round and vehicle.',
    points: [
      'Invoices daily, weekly, fortnightly or monthly, as each client needs',
      'Failed collections and weight differences charged by your rules',
      'Profit by client, round and vehicle, including what you pay to send goods on',
    ],
  },
];

export const statusLabel: Record<FeatureStatus, string> = {
  available: 'On the demo',
  'in-development': 'In development',
};

/** Article Names are lower case words joined by single hyphens, as the help centre's addresses are. */
const isArticleName = (name: string) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name);

/**
 * The address of a feature's guide in the help centre, or null when there is none to show: the help centre is not
 * public yet (no `site.helpUrl`), the feature is still in development, or its guide is not published.
 */
export function guideUrl(feature: FeatureArea): string | null {
  if (!site.helpUrl || feature.status !== 'available' || !feature.articleName) {
    return null;
  }
  if (!isArticleName(feature.articleName)) {
    throw new Error(`Feature "${feature.id}" has articleName "${feature.articleName}", which is not an Article Name.`);
  }
  return `${site.helpUrl}/articles/${feature.articleName}`;
}
