# Ekere Group — website

The public website for Ekere Group, a purpose-driven corporate parent company
based in Port Harcourt, Rivers State, Nigeria.

## The design direction

A light, near-monochrome editorial grotesque, modelled on the reference the
client supplied (satoshilabs.com): a warm-grey `#eeeeee` canvas, near-black
ink, very large Space Grotesk display type at regular weight, square corners,
and full-bleed night bands for the statements that have to carry weight.

The group has no usable photography, so the site has none — and does not leave
empty image slots where photography would go. The one piece of imagery is a
generated iridescent gradient: a bloom across the first viewport and a
spectral orb at the centre of the page. Both are CSS, so they cost no network
bytes, which matters on a Nigerian mobile connection.

Credibility comes from typographic and structural rigour plus honest labelling
of every venture's stage.

## The documents that govern this build

`PRODUCT.md` is product truth: audience, and what may and may not be claimed.
It still governs. `BUILD-BRIEF.md` and the files under `.impeccable/` describe
**The Carved Register**, the earlier dark-hardwood direction that the client
rejected; their content rules still hold, but their visual specification no
longer describes this site.

Two rules override anything convenient:

- **Nothing on the site may be fabricated.** No statistics, no
  completed-project counts, no logos, no testimonials, no team roster, no
  awards, no press. A missing fact renders as `[VERIFY: …]`, never as
  plausible filler. The home page's ledger band states the zeros out loud
  rather than omitting them.
- **Every venture carries its real stage** — active initiative, in
  development, or not yet begun — as a data field, never as prose, and told by
  a pip *and* a word rather than by colour alone.

## Running it

```bash
npm run dev
```

## Where the build has got to

**The home page is complete**, in eight bands: masthead, hero, purpose,
ventures, the orb, the ledger, method, invitation, footer.

| Stage | What it adds | State |
|---|---|---|
| 0 | Scaffold, tokens, primitives | **done** |
| 1–2 | The home page, header and footer | **done** |
| 3 | `/about-us/` and `/our-ventures/` | next |
| 4 | `/our-impact/` and a working `/contact/` form | |
| 5 | Motion, responsive, accessibility | |
| 6 | SEO, legal, launch | |

The four section routes and the two legal routes are linked from the masthead
and footer but not yet built.

## Layout

```
src/styles/fonts.css       @font-face for the two self-hosted families
src/styles/tokens.css      Every token, on :root. The single source of colour.
src/styles/base.css        Ground, shell, type roles, night bands, focus
src/styles/components.css  Buttons, status slots, cards, edge labels, the orb
src/styles/site.css        The home surfaces, one block per band
src/components/Masthead.tsx          Compacts past the hero so it stays legible on night bands
src/components/VentureRegisters.tsx  The three areas, each with its reverse face
src/content/ventures.ts              The venture records. The stage lives here.
public/fonts/              Four woff2 subsets + OFL licence and provenance
```

## Three standing constraints

- **No hosted Google Fonts stylesheet, ever.** Space Grotesk and Archivo are
  self-hosted woff2 in `public/fonts`. A third-party request on the critical
  path is a credibility problem on a Nigerian mobile connection, not just a
  performance one. See `public/fonts/README.md`.
- **No hardcoded colour outside `tokens.css`.** The one exception is the
  `theme-color` meta tag in `src/app/layout.tsx`, which must be a resolved
  colour and cannot read a custom property. It mirrors `--canvas` and is
  commented as such.
- **WCAG 2.1 AA, measured.** Every ink is measured against the darkest ground
  it is ever set on — the sunk `#e4e4e4` band, not the canvas. The measured
  ratios are recorded in `tokens.css`; do not lighten any of the mutes.
# ekere-group
