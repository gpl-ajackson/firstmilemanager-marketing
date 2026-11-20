/**
 * Facts about First Mile Manager that appear on many pages, in structured data and in
 * llms.txt. Keep them identical everywhere: AI assistants and search engines quote them.
 *
 * The help centre copies name, description, stage and url word for word into its
 * content/facts.yaml (gpl-ajackson/firstmilemanager-help), and its Launch Check 9 compares
 * the two. Change them here first, then there. Keep each one a single piece of quoted text.
 */
export const site = {
  name: 'First Mile Manager',
  shortName: 'First Mile Manager',
  url: 'https://firstmilemanager.co.uk',
  tagline: 'Collect from your clients, send it on.',
  description:
    "First Mile Manager is software for small couriers and hauliers that collect from local businesses. It takes your clients' bookings, plans your collection rounds and bills each client at the right rate.",
  email: 'hello@firstmilemanager.co.uk',
  locale: 'en_GB',
  country: 'United Kingdom',
  stage: 'Early access',

  /** The company behind First Mile Manager. The legal pages in src/content/legal repeat these, so change both. */
  company: {
    legalName: 'Gotham Projects Ltd',
    tradingName: 'CloudBusiness.Software',
    number: '06554421',
    registeredIn: 'England and Wales',
    address: { street: '1 Crow Hill Drive', town: 'Mansfield', county: 'Nottinghamshire', postcode: 'NG19 7AE', country: 'GB' },
    ico: 'ZB402964',
  },

  /**
   * Early access applications are made on the CloudBusiness account site, never here
   * (cloudbusiness-subscription-site ADR 0006). The early access page's "Apply" button is the
   * product's Start Link, https://account.cloudbusiness.software/start/<product key>, which opens
   * the account site's Early Access Application while the product is in Early Access there. Set
   * startLink once the account site is live and its Catalogue lists First Mile Manager; while it is
   * null, the page asks people to email their application instead. See README, "Early access".
   */
  earlyAccess: {
    startLink: null as string | null,
  },

  /**
   * The public Trentside Logistics demo. "Try the demo" arrives in slice 1, when the demo has
   * clients to show; until then live stays false and no page links to it.
   */
  demo: {
    live: false,
    url: 'https://demo.firstmilemanager.co.uk',
  },

  /**
   * Plausible analytics (no cookies): the site's own script, from Plausible's site installation
   * settings. Null loads no statistics at all. See README.md, "Analytics".
   */
  plausibleScript: null as string | null,

  /**
   * Links to the help centre and the app. Null hides the link until it exists. Set helpUrl once
   * help.firstmilemanager.co.uk is public.
   */
  helpUrl: null as string | null,
  signInUrl: null as string | null,
};

export const nav: { label: string; href: string }[] = [];

/**
 * A page's public path, as in canonical URLs and the sitemap: no `.html` and no trailing slash.
 * The build writes `early-access.html` (see astro.config.mjs), so Astro.url.pathname ends in `.html`.
 */
export const pagePath = (pathname: string) => pathname.replace(/(\/index)?\.html$/, '').replace(/\/$/, '') || '/';
