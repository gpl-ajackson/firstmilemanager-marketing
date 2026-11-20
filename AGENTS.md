# Agent instructions

This is the marketing website for First Mile Manager, at firstmilemanager.co.uk. It is a static Astro site on Cloudflare Pages, copied from Stockist's marketing site and given First Mile Manager's own brand, words and pages. The plan behind it is the First Mile Manager "Demo, Help and Marketing Plan" (https://claude.ai/artifact/Kma12yFYgiRdVSk9Pg6PGh), and the decisions are on gpl-ajackson/firstmilemanager issue #56. Read them before adding or changing pages.

## Content rules

Follow them on every page.

1. **First Mile Manager stands on its own.** Never present it as part of another product, an add-on to one, or priced on another product's plans. A page may mention the benefits of using it together with a warehouse system, and only a page written for people who use both may name Stockist. No page names a Stockist price or plan.
2. **Never claim what isn't built.** Every product claim comes from `src/data/features.ts`. A feature that is not built is `in-development` and shows an "In development" label wherever it appears. When a feature reaches the demo, change its status there, and the labels change everywhere at once.
3. **Facts about First Mile Manager stay identical everywhere.** Name, description, stage, address and contact live in `src/data/site.ts` and feed the pages, structured data and `llms.txt`. The help centre (gpl-ajackson/firstmilemanager-help) copies the name, description, stage and url word for word into its `content/facts.yaml`, and its Launch Check 9 fails when they differ. Change them here first, then there, and keep each one a single piece of quoted text.
4. **Write in the brand voice** (`brand/README.md`): short plain sentences, everyday words, "you" and "we", no hype and no exclamation marks. Write for an owner who also drives on busy days. Use the words in the product's `GLOSSARY.md` (in gpl-ajackson/firstmilemanager), the same way every time: clients (not customers), collection, Collection Address, rate card. Write the name in full, never "FMM".
5. **The call to action is early access** until slice 1, when "Try the demo" joins it (`site.demo.live`). Early access applications are made on the CloudBusiness account site, never on this site (see README, "Early access").
6. **Screenshots and examples use the Trentside Logistics demo only**, never real customer data.
7. **Every page passes the checks below** before it is merged.

## Brand

The brand is in `brand/`, approved by AJ on 15 November 2026 (PR #4). `src/styles/global.css` holds its tokens for Tailwind. Route teal (`brand`) is the one accent: a fill, icons and big type on light pages, with ink labels on it. Small accent text uses `brand-strong`. Route teal never means a status; status colours stay green and orange. `src/components/Logo.astro` is a copy of `brand/logo/fmm-lockup-light.svg`, and `public/` holds the favicons, app icons, `og-default.png`, `logo.png` and the self-hosted Atkinson Hyperlegible fonts. If the brand folder changes, change these to match.

## Building and checking

Node 24 (see `.nvmrc`; Astro 7 needs 22.23.4 or later).

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # astro check, then the static build into dist/
```

Before merging a page, check it at 320px, 390px and desktop widths with no sideways scrolling, and run an axe accessibility scan (WCAG 2.2 AA). Keep titles under about 45 characters before the " | First Mile Manager" suffix and descriptions under about 160 characters.

## Where things live

- `src/pages/`: one file per page. Legal pages are Markdown in `src/content/legal/`; a page with `draft: true` shows a banner and stays out of search and the sitemap.
- `src/data/`: site facts, features and the FAQ schema helper.
- `src/layouts/Base.astro`: head tags, canonical URLs, Open Graph and JSON-LD (Organization on every page, BreadcrumbList from `breadcrumbs`, extra schema per page).
- `src/pages/llms.txt.ts`: the plain-text summary for AI assistants, built from the data files.
- The privacy notice's "The help centre" section (`#the-help-centre`) is where the help centre's `/privacy` sends readers. Keep that heading, and keep the section in step with what the help centre records.
