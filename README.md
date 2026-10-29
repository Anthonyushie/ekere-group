# Ekere Group — website

The public website for Ekere Group, a purpose-driven corporate parent company
based in Port Harcourt, Rivers State, Nigeria.

Next.js 16 (App Router) and React 19, no UI framework, no animation library.
The home page prerenders as static HTML.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must stay fully static
npm run lint
```

---

## What this site has to do

Ekere Group is early. Most of what it does is intention rather than operation,
and the people it needs — development finance, banks, Rivers State ministries,
NGOs, technical partners — arrive sceptical and decide fast.

So the site's argument is not that the group has done a lot. It is that the
group says exactly where it stands. That is the only asset it has at launch,
and every decision below protects it.

**Two rules override anything convenient:**

- **Nothing may be fabricated.** No statistics, no completed-project counts,
  no logos, no testimonials, no team roster, no awards, no press. A missing
  fact ships as a visible `[VERIFY: …]` placeholder, never as plausible
  filler. The home page's ledger band states its zeros out loud — *00
  completed projects claimed* — rather than omitting the row.
- **Every venture carries its real stage** — `live`, `dev` or `open` — as a
  data field on the record in `src/content/ventures.ts`, never as prose, and
  shown by a pip *and* a word so it survives colour-blindness and printing.

If you are tempted to soften either one to make a section look fuller, the
section is wrong, not the rule.

## Design direction

A light, near-monochrome editorial grotesque, built to match the reference the
client supplied, **satoshilabs.com**: a warm-grey `#eeeeee` canvas, near-black
ink, very large Space Grotesk at regular weight, square corners, and
full-bleed night bands for the statements that carry weight.

The reference sets its display type in PP Neue Machina, which is commercial.
Space Grotesk is its closest OFL stand-in and was chosen to hit that target —
not as a default. (The `impeccable` design hook flags it as an overused face;
the suppression in `.impeccable/config.json` records why.)

**There is no photography, and no empty slots where photography would go.**
The client has none, and a layout built around image holes that never fill is
worse than one built without them. The only imagery is generated in CSS: an
iridescent bloom across the first viewport and a spectral orb mid-page. Both
cost zero network bytes, which on a Nigerian mobile connection is the point
rather than a nicety.

Credibility comes from typographic and structural rigour instead.

## Where the build has got to

**The home page is complete**, in eight bands: masthead, hero, purpose,
ventures, the orb, the ledger, method, invitation, footer. Motion, responsive
behaviour and the accessibility pass are done as part of it.

| Stage | What it adds | State |
|---|---|---|
| 0 | Scaffold, tokens, primitives | **done** |
| 1–2 | Home page, masthead, footer | **done** |
| — | Motion, responsive, WCAG AA | **done** |
| 3 | `/about-us/`, `/our-ventures/` | next |
| 4 | `/our-impact/`, a working `/contact/` form | |
| 5 | `/privacy/`, `/terms/`, SEO, launch | |

Six routes are linked from the masthead and footer and **none of them exist
yet** — `/about-us/`, `/our-ventures/`, `/our-impact/`, `/contact/`,
`/privacy/`, `/terms/`. Every one currently 404s. `/contact/` is the one the
site pushes hardest, so it is the most valuable thing to build next.

**Decide the trailing slash before building them.** Every link is written
`/contact/`, but `trailingSlash` is not set in `next.config.ts`, so Next
answers with a 308 to `/contact` and only then renders. Today that redirect
lands on a 404 either way; once the pages exist it becomes a wasted round trip
on every internal navigation, which on a Nigerian mobile connection is the
kind of cost this project treats as a credibility problem. Either set
`trailingSlash: true` or drop the slashes from the links — but pick one before
the URLs are indexed, because changing it later moves every page.

News & Insights is deliberately absent from the navigation until there is
genuine content to put in it.

## Layout

```
src/app/layout.tsx          Root layout, font preloads, theme-color
src/app/page.tsx            The home page: one block per band, in order
src/app/globals.css         Imports the stylesheets, in cascade order

src/styles/tokens.css       Every token, on :root. The single source of colour.
src/styles/fonts.css        @font-face for the two self-hosted families
src/styles/base.css         Ground, shell, type roles, night bands, focus
src/styles/components.css   Buttons, status slots, cards, edge labels, the orb
src/styles/site.css         The home surfaces, one block per band
src/styles/motion.css       Every animation. See "Motion" below before editing.

src/components/Masthead.tsx          Compacts past the hero so it stays legible on night
src/components/VentureRegisters.tsx  The three areas, each with its reverse face
src/components/Statement.tsx         The scroll-scrubbed manifesto
src/components/Reveal.tsx            Wrapper for a band or grid that enters on scroll
src/components/useReveal.ts          The observer behind both

src/content/ventures.ts     The venture records. The stage lives here.
public/fonts/               Four woff2 subsets (112K) + OFL licence and provenance
```

The ledger figures are derived from `ventures.ts`, not typed. A hand-written
count is the first thing to go stale when a status changes, and a stale count
is the one real risk a site built on stage honesty runs.

## Motion

Entrances are scroll-driven and the manifesto is scrubbed word by word as it
travels the viewport, both after the reference. One rule governs the layer:
**the page is finished without it.** Two gates enforce that, and nothing
animates outside them:

| Gate | Covers | If it never fires |
|---|---|---|
| `[data-reveal]`, written by `useReveal` at mount | scroll entrances | no attribute, so nothing was ever hidden |
| `@media (prefers-reduced-motion: no-preference)` | the hero's load animations | they need no script, so they still run |

The attributes that hide a pending element are written by script, so their
presence *is* the proof that script is alive and motion is wanted. The served
HTML therefore contains no hidden elements at all: if the bundle never
arrives, the reader gets a complete page rather than a blank one. The scrub
works the same way — `--progress` defaults to `1` in CSS, so an un-scrubbed
statement is a fully lit statement.

## Standing constraints

- **No hosted Google Fonts stylesheet, ever.** Space Grotesk and Archivo are
  self-hosted woff2 in `public/fonts`. A third-party request on the critical
  path is a credibility problem here, not just a performance one. See
  `public/fonts/README.md` for provenance and licence.
- **No hardcoded colour outside `tokens.css`.** The one exception is the
  `theme-color` meta in `src/app/layout.tsx`, which must be a resolved colour
  and cannot read a custom property. It mirrors `--canvas` and says so.
- **WCAG 2.1 AA, measured.** Every ink is measured against the *darkest*
  ground it is ever set on — the sunk `#e4e4e4` band, not the canvas. The
  ratios are recorded in `tokens.css`. Do not lighten any of the mutes.
- **No stylesheet may hide content that script has to give back.** See
  "Motion".

## Traps

Both of these fail silently. Neither is obvious from reading the code.

- **Do not interpolate a colour with `color-mix(… calc(var(--x) * 100%) …)`.**
  Lightning CSS cannot resolve a percentage containing a var, and rather than
  leaving the function alone it folds the whole thing down to its first
  colour. The effect compiles away to a flat colour with no error. The scrub
  dims opacity instead, which is arithmetic the minifier cannot fold.
- **`.hero-line` sets `display: block` outside the media query on purpose.**
  Move it inside and the headline collapses to a single line for every reader
  who has asked for reduced motion.

One more worth knowing: `new Date()` in a component breaks static prerendering
in Next 16. The footer's copyright year is the constant `COPYRIGHT_YEAR` in
`src/app/page.tsx` for that reason — bump it each January.

## Governing documents

`PRODUCT.md` is product truth — audience, and what may and may not be claimed.
**It still governs.**

`BUILD-BRIEF.md` and the files under `.impeccable/` describe *The Carved
Register*, an earlier dark-hardwood direction the client rejected. Their
content rules still hold; their visual specification does not describe this
site and should not be followed.
