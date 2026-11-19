# firstmilemanager-marketing

The marketing website for First Mile Manager, at [firstmilemanager.co.uk](https://firstmilemanager.co.uk). A static [Astro](https://astro.build) site with Tailwind CSS, copied from Stockist's marketing site with First Mile Manager's own brand (in [`brand/`](brand/README.md)).

The rules for writing pages are in [AGENTS.md](AGENTS.md).

## Run it

Needs Node 24 (see `.nvmrc`).

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # type-check and build the static site into dist/
npm run preview  # serve dist/
```

## Configure

All of it is in `src/data/site.ts`.

| Setting | What it does |
| --- | --- |
| `name`, `description`, `stage`, `url` | The facts every page, the structured data and `llms.txt` use. The help centre copies them word for word (its Launch Check 9 compares them). |
| `demo.live` | Set to `true` in slice 1, once the public Trentside demo is hosted and resetting each night; "Try the demo" then appears. |
| `plausibleScript` | The site's Plausible script, once a Plausible site exists. It loads only in Cloudflare's build of `main` (`CF_PAGES_BRANCH`), so previews and local builds aren't counted. Null loads nothing. |
| `helpUrl`, `signInUrl` | Links to the help centre and the app; hidden while `null`. Set `helpUrl` once help.firstmilemanager.co.uk is public. |

## Deploy

The site is hosted on Cloudflare Pages, like Stockist's. `npm run build` produces plain static files in `dist/`; there is no server code and no database.

The build writes `early-access.html` rather than `early-access/index.html` (`build.format: 'file'` in `astro.config.mjs`), because Cloudflare Pages serves `early-access.html` at `/early-access` but redirects `early-access/index.html` to `/early-access/`. Canonical URLs and the sitemap use the form without a trailing slash. Cloudflare serves `404.html` for unknown paths, and `public/_headers` sets security and caching headers.

### First-time setup (one-off, by an account owner)

1. In the Cloudflare dashboard, add `firstmilemanager.co.uk` as a site and change the domain's nameservers at its registrar to the two Cloudflare gives you. Cloudflare copies the existing DNS records first, so check that any email (MX) records for hello@firstmilemanager.co.uk came across.
2. Go to **Workers & Pages → Create → Pages → Connect to Git**, and choose `gpl-ajackson/firstmilemanager-marketing`.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`, production branch `main`. Add the environment variable `NODE_VERSION` = `24` (Cloudflare's default Node is too old for Astro 7).
4. Once the first deploy is green, open **Custom domains** on the project and add `firstmilemanager.co.uk` and `www.firstmilemanager.co.uk`.
5. Redirect `www.firstmilemanager.co.uk` and the project's `*.pages.dev` address to `https://firstmilemanager.co.uk` with a Bulk Redirect (**Rules → Redirect Rules → Bulk Redirects**), so search engines only see one address.
6. In Google Search Console, add `firstmilemanager.co.uk` as a domain property (Cloudflare can add the DNS record for you) and submit `https://firstmilemanager.co.uk/sitemap-index.xml`.

Every pull request then gets its own preview link, and every merge to `main` deploys the live site.

### Analytics

The site can use [Plausible](https://plausible.io), as Stockist's does: no cookies, nothing stored on the device, so no consent banner. To switch it on, add `firstmilemanager.co.uk` as a site in Plausible, copy its script URL into `site.plausibleScript`, and in Plausible's site settings:

1. Under **Tracking → Default tracking**, turn on outbound links (counts clicks through to the early access application).
2. Under **Goals**, add an outbound link goal for the account site's early access application.
3. Link Google Search Console, to see search terms next to visits.
