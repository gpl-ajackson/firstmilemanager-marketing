/**
 * First Mile Manager's prices, in GBP excluding VAT. They copy the CloudBusiness account site's Catalogue
 * (cloudbusiness-subscription-site config/catalogue.php, ADR 0003), which is the one source of truth for prices and
 * builds Paddle's catalogue. AJ settled them on 21 November 2026 (the account site's First Mile Manager plan, FQ10 to
 * FQ15). A Catalogue change reaches this file by pull request on the same day, and cloudbusiness.software lists the
 * same prices.
 *
 * Set confirmed to false while proposing new figures: the pricing page then shows a draft banner and no prices are
 * put into structured data or llms.txt, so unconfirmed prices cannot reach search engines unnoticed.
 */
export const pricing = {
  confirmed: true,
  currency: 'GBP',
  vatNote: 'Prices exclude VAT.',
  basis: 'Priced by the number of vehicles that run collection rounds each month. Staff, drivers, clients and client sign-ins are unlimited, and every plan has every feature.',
  /** A vehicle counts in a month only if it ran at least one collection round that month (FQ10). */
  activeVehicle: 'A vehicle counts in a month only if it ran at least one collection round that month. A van that stays in the yard all month costs nothing.',
  terms: 'No contract: pay monthly or yearly, move up or down a plan, or cancel, whenever you like.',
  /** FQ1: £0 Setup Price, card at sign-up, billing from the first completed collection round. */
  start: 'Nothing to pay until your first collection round in First Mile Manager, however long setting up takes.',
  /** FQ13: annual is 2 months free. */
  yearly: 'Pay yearly and you pay for 10 months, not 12.',
  /** FQ12: the owner picks the plan; First Mile Manager warns after two months over and never moves it. */
  planChoice: 'You choose your plan. If you run more vehicles than your plan covers two months running, we tell you which plan fits, and we never move you up a plan automatically.',
  texts: {
    /** FQ14: 5p a text to clients' contacts, counted and charged by quarter. */
    price: 0.05,
    note: 'Texts to your clients, such as collection alerts, cost 5p each, billed every quarter for the texts actually sent. Texts to your own team and all emails are free.',
  },
  included: [
    'No contract: change plan or cancel any time',
    'Nothing to pay until your first collection round',
    'Unlimited staff and drivers',
    'Unlimited clients and client sign-ins',
    'Every feature on every plan',
    'Help from the people who build it, by email',
  ],
  plans: [
    { key: 'starter', name: 'Starter', monthly: 79, yearly: 790, vehicles: 3, bestFor: 'An owner-driver with a van or two, plus a spare.' },
    { key: 'growth', name: 'Growth', monthly: 179, yearly: 1790, vehicles: 10, bestFor: 'A courier with a few drivers on regular rounds.', featured: true },
    { key: 'fleet', name: 'Fleet', monthly: 349, yearly: 3490, vehicles: 25, bestFor: 'A haulier running rounds across a whole area.' },
  ],
  beyond: 'More than 25 vehicles out on rounds? Tell us about your business and we’ll quote.',
  foundingPartner: {
    places: 20,
    discount: '50% off for 12 months from your first collection round',
    lock: 'Your price fixed for 2 years from then, with no contract',
  },
};

export const fromPrice = Math.min(...pricing.plans.map((plan) => plan.monthly));

export const formatPence = (amount: number) => `${Math.round(amount * 100)}p`;

export const formatPrice = (amount: number) =>
  `£${amount.toLocaleString('en-GB', { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 })}`;
