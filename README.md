# Ekere Group — website

The public website for Ekere Group, a purpose-driven corporate parent company
based in Port Harcourt, Rivers State, Nigeria.

The design direction is **The Carved Register**: a dark iroko hardwood ground
cut into fixed horizontal registers, one per venture, each incised with the
real stage that venture has reached. The site uses no imagery at all. Its
credibility comes from typographic and structural rigour plus honest labelling
of every venture's stage.

## The four documents that govern this build

Read them in this order. They are the specification; this README is not.

| File | What it is |
|---|---|
| `BUILD-BRIEF.md` | The design system and the six-stage plan. |
| `PRODUCT.md` | Product truth: audience, and what may and may not be claimed. |
| `.impeccable/surfaces/src-app-page-tsx.md` | The direction contract. Six blocks the build is audited against. |
| `.impeccable/mocks/decision/assigned.html` | The approved first viewport. A spatial contract, not a mood reference. |

Two rules override anything convenient:

- **Nothing on the site may be fabricated.** No statistics, no completed-project
  counts, no logos, no testimonials, no team roster, no awards, no press. A
  missing fact renders as `[VERIFY: …]` in ash mono, never as plausible filler.
- **Every venture carries its real stage** — active initiative, in development,
  or not yet begun — as a data field, never as prose.

## Running it

```bash
npm install
npm run dev
```

Then open `/tokens`.

## Where the build has got to

**Stage 0 is complete: the token layer and component primitives, and nothing
else.** No site route exists yet. `/` is a placeholder that says so.

`/tokens` renders every token and component variant from §2 of the brief in
isolation, and measures itself: contrast ratios and computed font sizes on that
page are read out of the live DOM and printed as found, not copied from the
brief.

| Stage | What it adds | State |
|---|---|---|
| 0 | Scaffold, tokens, primitives, `/tokens` | **done** |
| 1 | The home first viewport, against the approved comp | next |
| 2 | The rest of Home, header and footer | |
| 3 | `/about-us/` and `/our-ventures/` | |
| 4 | `/our-impact/` and a working `/contact/` form | |
| 5 | Motion, responsive, accessibility | |
| 6 | SEO, legal, launch | |

Each stage has its prompt in §9 of the brief and is run in a **fresh** session.

## Layout

```
src/styles/fonts.css       @font-face for the three self-hosted families
src/styles/tokens.css      §2 — every token, on :root. The single source of colour.
src/styles/base.css        Ground, material layers, type roles, §2.7 browser surfaces
src/styles/components.css  §2.6 — brass plate, secondary action, three status slots
src/styles/spec.css        Layout for /tokens only. Not part of the design system.
public/fonts/              Six woff2 subsets + OFL licence and provenance
```

## Two standing constraints

- **No hosted Google Fonts stylesheet, ever.** The three families are
  self-hosted woff2 in `public/fonts`. A third-party request on the critical
  path is a credibility problem on a Nigerian mobile connection, not just a
  performance one. See `public/fonts/README.md`.
- **No hardcoded colour outside `tokens.css`.** The one exception is the
  `theme-color` meta tag in `src/app/layout.tsx`, which must be a resolved
  colour and cannot read a custom property. It mirrors `--iroko` and is
  commented as such.
