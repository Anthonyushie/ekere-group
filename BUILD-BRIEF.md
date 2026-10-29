# Ekere Group — Website Build Brief

**The Carved Register.** Everything a fresh Claude Code session needs to build this site to agency standard, in six stages.

Read in this order: this file → `PRODUCT.md` → `.impeccable/surfaces/src-app-page-tsx.md` (the direction contract) → `.impeccable/mocks/decision/assigned.html` (the approved first viewport).

---

## 0. How to use this document

Four files travel together. Copy all of them into the new project folder before Stage 0:

| File | What it is |
|---|---|
| `BUILD-BRIEF.md` | This file. The design system and the stage plan. |
| `PRODUCT.md` | Product truth: who the audience is, what may and may not be claimed. |
| `.impeccable/surfaces/src-app-page-tsx.md` | The direction contract. Six blocks the build is audited against. |
| `.impeccable/mocks/decision/assigned.html` | The approved first viewport, rendered. This is the spatial contract for Stage 1. |

Each stage in §9 has a prompt you paste into a **fresh** session. Fresh matters: a session that has been building for three hours starts agreeing with itself. Do not run two stages in one session past Stage 2.

---

## 1. The design world, in one paragraph

A dark hardwood beam, cut into fixed registers. One register per venture, each incised with the stage it has actually reached. The world is Ibibio/Efik carved wood percussion — the group's own name sits in that culture — and the discipline it buys is this: *carving is subtractive and permanent*. You cut a register, and what is in it is what is in it. The third register sits visibly empty, labelled "Not yet begun." That is the whole argument of the site. A company that spends prime real estate on what it has not done yet is a company telling the truth about the rest.

This is not a heritage site. It is an engineered object. If a reviewer ever describes it as "warm" or "artisanal", the type has gone soft and needs to be reset harder.

---

## 2. Tokens

Author these once in Stage 0 as CSS custom properties on `:root`. Nothing downstream may hardcode a hex value.

### 2.1 Colour

```css
:root{
  /* ground */
  --iroko:        #15100C;  /* page ground, everywhere */
  --iroko-deep:   #0D0A07;  /* recessed panels, the reverse face */
  --iroko-wash:   rgba(0,0,0,.42); /* recency wash, left-bleeding */

  /* ink */
  --sapwood:      #E9E2D3;  /* primary text, display type */
  --sapwood-lift: #F6F1E6;  /* the one recent register's name */
  --bark:         #B5AB9C;  /* standfirst, secondary prose */
  --bark-dim:     #9A907F;  /* register notes */
  --ash:          #8F8475;  /* mono apparatus, labels, meta */

  /* signal */
  --brass:        #B8863C;  /* live status, primary action, accents */
  --brass-lip:    #8A6227;  /* the 2px underlip on brass plates */
  --brass-ink:    #160F06;  /* text ON brass */
  --oxblood:      #8C2F1E;  /* "in development" borders */
  --oxblood-ink:  #C2634D;  /* "in development" text */

  /* rules */
  --groove:       rgba(110,99,88,.85);
  --groove-fade:  rgba(110,99,88,.15);
}
```

**Strategy: Committed.** The iroko ground owns 100% of every surface. There is no light mode and there is no second theme. Brass is the only thing that glows and it is rationed: live status, the primary action, the brass dot in the wordmark. Nothing else.

**Contrast, verified:** `--ash` on `--iroko` = 5.2:1. `--bark-dim` = 6.1:1. `--brass` = 5.9:1. `--oxblood-ink` = 4.7:1. All clear AA for body text. Do not darken any of them. The first version of the comp used `#6E6358` for ash and failed at 3.26:1 — that is the trap on a ground this dark, and it is why these exact values are fixed.

### 2.2 Type

Three faces, all OFL, all **self-hosted** — woff2 in `/public/fonts`, loaded with `@font-face` and `font-display: swap`. Never a `fonts.googleapis.com` stylesheet: it is a third-party request on the critical path, and this site has to be fast on a Nigerian mobile connection.

| Role | Face | Why it |
|---|---|---|
| Display | **Big Shoulders Display** 500 / 700 | Incised, condensed, monumental. Reads as cut into a dark beam rather than printed on it. |
| Text | **Archivo** 400 / 500 / 600 | A workhorse with enough width to hold its own under the display, no personality fighting it. |
| Apparatus | **Martian Mono** 400 / 600 | Status labels, ordinals, meta, any figure. Measurement, not decoration. |

Scale at 1440. Every display size is `clamp()`-ed in §2.4.

```
display-1   104px / .845 / -.022em   BSD 700, uppercase    (home h1)
display-2    64px / .94  / -.018em   BSD 700, uppercase    (section heads)
display-3    43px / 1    / .005em    BSD 500, uppercase    (register names)
mark         25px / 1    / .22em     BSD 900, uppercase    (wordmark)
standfirst 15.5px / 1.62             Archivo 400, 42ch max
body         16px / 1.65             Archivo 400, 68ch max
note         13px / 1.5              Archivo 400, 58ch max
nav        12.5px / 1    / .16em     Archivo 500, uppercase
mono-label 11.5px / 1    / .08em     Martian Mono 400, uppercase
mono-meta    11px / 2    / .02em     Martian Mono 400, uppercase
```

Rules: display never exceeds 6rem on mobile. Tracking floor −0.04em. Body copy gets `font-variant-numeric: tabular-nums` wherever a figure appears.

**Line breaking.** Headings whose breaks are authored with `<br>` get `text-wrap: nowrap`, not `balance` — balance re-distributes across the authored breaks and silently adds a fourth line. Headings that wrap naturally get `balance`. This cost the comp a fix round: at `balance`, "Creating lasting impact." split in two and pushed the base register 163px below the fold.

**11px floor.** No functional text goes below 11px — not labels, not ordinals, not meta rows, and not a letterspaced micro-label that looks decorative. The status slot label is the most important text on the page after the headline; the comp originally set it at 10px and it had to be raised. Only non-interactive legal smallprint may sit at 10px. Putting a smaller value on the ramp launders the token, not the legibility.

**Fallback stack.** Every display declaration is `'Big Shoulders Display', 'Arial Narrow', sans-serif`. The fallback must be condensed: with a default serif fallback the home h1 measures 1417px against an 876px box, so the pre-load frame reflows from seven lines to three. A condensed fallback keeps the reflow invisible.

### 2.3 Space and grid

4px base. Only these steps: `4 8 12 16 24 32 48 64 72 96 128 160`.

- Content max width **1296px**, centred.
- The declaration register is `grid-template-columns: 1fr minmax(260px, 316px)` with `gap: clamp(40px, 5vw, 72px)`. A fixed 316px right column starves the headline below 1360px and the display type overflows.
- Page gutter **72px** desktop, 40px tablet, 24px mobile.
- 12 columns, 24px column gap.
- **More space above a heading than below it** — always. A section head gets 128px above, 48px below.
- Register height is **fixed at 104px** desktop, 92px mobile. This is load-bearing; see §3.1.

### 2.4 Fluidity

```css
--display-1: clamp(58px, 7.25vw, 104px);
--display-2: clamp(34px, 4.6vw, 64px);
--display-3: clamp(27px, 3.1vw, 43px);
--gutter:    clamp(24px, 5vw, 72px);
```

No fixed-pixel grid that wraps a hundred pixels narrower. The first viewport must still hold at 1280 and 1600, not only at 1440.

### 2.5 Material

Two layers over the ground, both `pointer-events: none`, both authored once in Stage 0:

**Grain** — the incision running the length of the beam:
```css
background-image: repeating-linear-gradient(90deg,
  rgba(233,226,211,.055) 0 1px, transparent 1px 7px);
mix-blend-mode: soft-light;
```

**Vignette** — light falling on carved wood from upper left:
```css
background:
  radial-gradient(130% 95% at 22% 8%, rgba(233,226,211,.09) 0%, rgba(0,0,0,0) 48%),
  linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.45) 100%);
```

**Groove** — the only divider. 1px, fading at both ends:
```css
background: linear-gradient(90deg, var(--groove-fade), var(--groove) 12%,
                                   var(--groove) 88%, var(--groove-fade));
```

**Chevron band** — the one authored ornament. Used *only* between major registers, never more than three times on a page:
```css
height: 9px;
background-image:
  linear-gradient(135deg, var(--brass) 25%, transparent 25.5%),
  linear-gradient(225deg, var(--brass) 25%, transparent 25.5%);
background-size: 18px 9px; background-repeat: repeat-x; opacity: .62;
```

### 2.6 Components

**Brass plate** (primary action). Cut metal seated into wood — not a floating card:
```css
background: var(--brass); color: var(--brass-ink);
padding: 19px 30px; border-radius: 0;
font: 700 21px/1 'Big Shoulders Display'; letter-spacing: .11em; text-transform: uppercase;
box-shadow: 0 2px 0 0 var(--brass-lip), 0 14px 26px -10px rgba(0,0,0,.75);
```
Hover: shadow deepens to `0 18px 32px -10px`, plate translates up 1px, underlip grows to 3px. Active: plate sits down, underlip to 0.

**Status slot.** Fixed 46px tall, fixed 224px wide, three variants:

| Stage | Border | Fill | Text | Pip |
|---|---|---|---|---|
| Active initiative | 1px solid brass @.5 | brass @.13 | `--brass` | solid brass |
| In development | 1px solid oxblood @.62 | none | `--oxblood-ink` | solid oxblood-ink |
| Not yet begun | 1px **dashed** ash | none | `--ash` | 1px ash outline, hollow |

The dashed border and hollow pip are the design doing the honesty work. Do not "improve" them into something tidier.

**Secondary action.** 1px ash border, sapwood text, no fill. Hover: border to brass, text to brass.

**Banned outright.** No cards as page structure. No nested cards ever. No kicker or eyebrow above any heading — the headline carries its own weight, and note that this deletes "Eyebrow: A PURPOSE-DRIVEN CORPORATE GROUP" from the original content doc. No gradient text. No glass or backdrop-blur as decoration. No coloured `border-left` over 1px. No hard offset shadows. No section numbers unless the sequence carries information. No emoji or Unicode glyphs as icons — icons are authored SVG at one stroke weight (1.5px) or they do not exist. No stock photography.

### 2.7 Browser surfaces

The cheapest signal that a page was built rather than assembled. Ship all of these:

```css
::selection          { background: var(--brass); color: var(--brass-ink); }
:focus-visible       { outline: 2px solid var(--brass); outline-offset: 3px; }
html                 { scrollbar-color: var(--ash) var(--iroko-deep); }
input, textarea      { caret-color: var(--brass); }
a                    { text-underline-offset: 3px; text-decoration-thickness: 1px; }
```

---

## 3. The three mechanics

These three are the direction's actual content. They came from the design round and each one has a job. A build that drops them has built a dark-brown template.

### 3.1 Reserved slots

Every register is **fixed height with fixed positions**. A venture with nothing in it shows its own empty band rather than collapsing. Absence becomes legible instead of hidden.

Implementation: `height: 104px` on `.reg`, not `min-height`. Grid columns `62px 1fr 224px` — fixed, not fractional. The status slot box is always rendered, even when the content is "Not yet begun". Never `display:none` a register.

### 3.2 Recency in ink density

The register the group has **actually moved on most recently** carries the deepest ink and the brightest name, so the page shows where the work is rather than only what is claimed.

Implementation: one register at a time gets `.reg--recent`, which paints a left-bleeding wash (`linear-gradient(90deg, var(--iroko-wash), rgba(0,0,0,.18) 62%, transparent)`) full-bleed past the gutter via negative insets, and lifts its name to `--sapwood-lift`. Driven by a `lastMovedAt` date on the venture record, not hardcoded — so it stays true as the company changes.

### 3.3 The reverse side

Every venture register has a **reverse face** holding its constraints and what is not yet true, so a promise never travels without its fine print attached to it.

Implementation: the register is a `<button aria-expanded>` that reveals a reverse panel on `--iroko-deep`, containing: what is confirmed, what is not, what partner is being sought, and the date the status was last reviewed. Animate the height with a clip-path or grid-template-rows transition, 320ms. Keyboard operable. On mobile it is always a tap, never a hover.

---

## 4. Motion

**One authored moment, not scattered hover effects.** All of it respects `prefers-reduced-motion: reduce` by rendering the final state immediately.

**The strike** (first load, once, 1.1s total):
1. Chevron band draws left→right, 520ms, `cubic-bezier(.16,1,.3,1)` via `clip-path: inset(0 100% 0 0)` → `inset(0)`.
2. Each register's groove draws the same way, 70ms stagger.
3. Each register's name settles up 6px as its groove completes, 280ms.

Content is **visible by default**. Never gate text behind `opacity: 0` with a JS trigger — if the script fails or an entrance animation stalls, the page reads as broken and empty. Animate from an already-visible default.

**Resting interactions**, all 160ms ease-out: register hover extends the ink wash and brightens the status slot. Brass plate hover per §2.6. Nav link underline grows from the left. That is the complete list.

Reach past transform and opacity where it stays smooth: the chevron and groove draws are `clip-path`, and the reverse panel uses a clip reveal rather than a height jump.

---

## 5. Site structure

Six routes, confirmed. Build in this order.

```
/                   Home
/about-us/          Who we are, philosophy, vision, mission, values, looking forward
/our-ventures/      The three areas, each as a register with its reverse face
/our-impact/        Community education, school outreach, environmental sustainability
/news/              Built but NOT linked in nav until there are three real posts
/contact/           Working form with enquiry type
/privacy/  /terms/  Footer only. Must reflect actual data collection.
```

### Home sections, in order

1. **Masthead register** — wordmark, five nav items, groove.
2. **Declaration** — h1 at display-1 in three lines, standfirst and seat of operations in a 316px right column.
3. **Chevron band.**
4. **Three venture registers** — fixed 104px each, per §3.
5. **What the group is for** — the philosophy passage, one column at 68ch, generous quiet after the register density. This is the "Introduction" and "Purpose in Action" sections from the content doc, merged. They say the same thing twice; one of them has to go.
6. **Vision and mission** — two registers, not two cards.
7. **The partnership close** — brass plate, real contact details, no newsletter.

Dropped from the original content doc, deliberately: the hero eyebrow (banned, §2.6), "Section 06 — Looking Ahead" (it says nothing the philosophy section does not already say, and vagueness is what makes a site feel generated), and every statistic, testimonial, client logo, pricing tier, industry carousel and shop route.

### Header and footer

Header: wordmark left, five nav items right, one brass plate "Partner With Us". Sticky after 400px with the iroko ground at full opacity — not translucent, not blurred.

Footer, four columns: the group (short description) · Explore (Home, About, Ventures, Impact) · Initiatives (Community Education, Environmental Sustainability, News) · Get in Touch (verified email, phone, social). Then copyright, Privacy, Terms.

---

## 6. Content rules

These are hard rules, not style preferences. They are the reason the site is credible.

1. **Every venture carries its real stage.** Active initiative / In development / Not yet begun. The status is a data field on the venture record, rendered into the slot. It is never prose.
2. **Waste-to-energy is an ambition.** No facility, no licence, no capacity figure, no timeline. "No facility exists" appears in plain words on the Ventures page.
3. **Nothing invented.** No statistics, no years-of-experience, no completed-project counts, no client or partner logos, no testimonials, no team roster, no awards, no press. If a section needs one to work, the section is wrong.
4. **British English**, matching the existing copy: recognise, programme, organisation.
5. **Placeholders must look like placeholders.** Where a fact is missing — registration number, phone, address — render it as `[VERIFY: company telephone]` in ash mono, not as plausible filler. Filler that looks real is how fake details end up shipping.
6. **Voice:** measured, plain, institutional. Short sentences. No "leveraging synergies", no "we are passionate about", no em-dash-heavy marketing cadence.

### Full copy

The homepage, About Us and venture copy from your content document is approved as-is and should be used verbatim, with the eyebrow and the two dropped sections removed. The one addition each venture needs is its reverse-face content: *what is confirmed, what is not, what partner is being sought, when the status was last reviewed.*

---

## 7. Assets you must supply

The design is built so none of these block launch. Each one is an upgrade.

| Asset | Status | Note |
|---|---|---|
| Verified company email | **Required for launch** | The contact form has nowhere to send without it. |
| Verified telephone | **Required** | Footer and contact page. |
| Registered address | **Required** | Footer. Rivers State. |
| Legal registration details | Required for Privacy/Terms | RC number if registered. |
| Founder name and title | Optional | Enables a signed note on About. |
| Logo file | Not needed | The wordmark is typographic by design and works with no logo. |
| Photography | Not needed | The design never leaves an empty image slot. If you later get real Port Harcourt or school-outreach photography, it gets a full-bleed register of its own — do not retrofit it into the hero. |

---

## 8. Quality gates

Every stage ends against these. A stage is not done until they pass.

- **Contrast:** body ≥4.5:1, large text ≥3:1, verified by measurement not by eye. The values in §2.1 are already cleared; anything new gets checked.
- **Type:** real copy at every breakpoint, nothing overflowing, body measure 65–75ch, and no functional text under 11px. Check the last one by querying the DOM for computed font sizes, not by eye.
- **States:** hover, focus-visible, disabled, loading, error, empty. All five on the contact form.
- **Keyboard:** full nav and form operation, visible focus everywhere, reverse panels operable.
- **Responsive:** 390, 768, 1280, 1440, 1600. The first viewport holds at all of them, and nothing the approved comp shows gets pushed below the fold at 1280.
- **Performance:** self-hosted woff2, no render-blocking third-party request, LCP under 2.5s on a throttled 4G profile. Test it throttled, not on your own connection.
- **Accessibility:** WCAG 2.1 AA. Heading order unbroken, real text not text-in-images, every SVG either `aria-hidden` or labelled.

---

## 9. The stages

Paste each prompt into a fresh session, in the project folder, with all four handoff files present.

### Stage 0 — Scaffold and tokens

> Read `BUILD-BRIEF.md`, `PRODUCT.md` and `.impeccable/surfaces/src-app-page-tsx.md` before writing anything.
>
> Scaffold a Next.js App Router project with TypeScript and Tailwind. Then implement §2 of the brief completely and nothing else: every colour, type, space and material token as CSS custom properties on `:root`; Big Shoulders Display, Archivo and Martian Mono self-hosted as woff2 in `/public/fonts` with `@font-face` and `font-display: swap`; the grain and vignette layers; the groove and chevron utilities; the brass plate, secondary action and three status-slot variants as components; and all of §2.7's browser surfaces.
>
> Build one `/tokens` page that renders every token and component in isolation so I can see them. Do not build any site page yet. Confirm the contrast values in §2.1 by measuring them, and tell me if any fails.
>
> **Done when:** `/tokens` renders every token and component, fonts load from the project with no third-party request, and the measured contrast matches §2.1.

### Stage 1 — The home first viewport *(the one that matters)*

> Read `BUILD-BRIEF.md`, `PRODUCT.md`, the direction contract at `.impeccable/surfaces/src-app-page-tsx.md`, and open `.impeccable/mocks/decision/assigned.html` — that file is the approved first viewport and it is a spatial contract, not a mood reference.
>
> Build only the first viewport of `/`: masthead register, declaration register, chevron band, and the three venture registers, at 1440×900, using the tokens from Stage 0. Match the approved comp's composition, scale and copy. Implement all three mechanics in §3 — reserved fixed-height slots, the recency wash driven by a `lastMovedAt` field, and the reverse face on each register.
>
> Then screenshot it at 1440 and compare against the comp side by side. Fix what the comparison shows before telling me it is done.
>
> **Done when:** the screenshot is indistinguishable from the comp in composition and scale, the third register reads visibly empty and dashed, every register reverse opens by keyboard, and nothing is hardcoded that §2 defines as a token.

### Stage 2 — The rest of Home

> Read the brief and the direction contract. The first viewport is approved; do not change it.
>
> Build Home sections 5, 6 and 7 from §5, plus the header and footer from §5. Use the approved copy. Pace the scroll: the register block is dense, so the philosophy passage that follows is quiet and single-column at 68ch, and the page ends anchored on the partnership close. One spacing rhythm throughout, more space above each heading than below it.
>
> Vision and mission are two registers in the established system, not two cards. No section numbers, no eyebrows, no statistics.
>
> **Done when:** Home is complete top to bottom at 1440, the full-page screenshot shows real density variation rather than six evenly spaced bands, and §8's type and spacing gates pass.

### Stage 3 — About Us and Our Ventures

> Read the brief, `PRODUCT.md` and the direction contract. Inherit the established world exactly — this is not a new identity exercise.
>
> Build `/about-us/` and `/our-ventures/` using the approved copy. About Us is one page with sections, not sub-pages. Our Ventures renders the three ventures as full registers with their reverse faces expanded into real page sections: what is confirmed, what is not, what partner is sought, when the status was last reviewed.
>
> Enforce §6 without exception. Waste-to-energy says in plain words that no facility exists and no licence is held. Any missing fact renders as `[VERIFY: …]` in ash mono.
>
> **Done when:** both pages read in the established system, every venture states its real stage, and a search of the source finds no invented statistic, logo, testimonial or date.

### Stage 4 — Our Impact and a working Contact form

> Read the brief and the direction contract.
>
> Build `/our-impact/` with the community-education and school drug-awareness material, clearly separating what is planned from what has been delivered. Then build `/contact/` with a working form: full name, email, organisation (optional), enquiry type (General, Business Opportunity, Partnership Proposal, Community Initiative, Environmental Project, Other), message.
>
> The form needs real validation, an accessible error state that names the problem and the recovery, a loading state, a success confirmation, and server-side handling that posts to the verified company email. Honeypot plus rate limiting, no third-party CAPTCHA. All five states from §8 must exist and be reachable.
>
> **Done when:** a submission actually arrives at the configured address, every field validates with a keyboard-accessible error, and the five states all render in the established system.

### Stage 5 — Motion, responsive, accessibility

> Read the brief, especially §4 and §8. All pages exist; do not redesign them.
>
> Implement the strike sequence in §4 once, orchestrated, plus the three resting interactions and nothing else. Content must be visible by default — no text gated behind `opacity: 0`. Honour `prefers-reduced-motion`.
>
> Then take the site to 390, 768, 1280, 1440 and 1600. The first viewport must hold at every one of them, with nothing the approved comp shows pushed below the fold at 1280. Register heights go to 92px on mobile and the status slot moves below the name rather than shrinking. Then run a full keyboard pass and an accessibility audit against WCAG 2.1 AA.
>
> **Done when:** screenshots at all five widths show no overflow or clipping, the whole site is keyboard operable with visible focus, reduced-motion renders final states immediately, and the audit is clean.

### Stage 6 — SEO, legal, launch

> Read the brief and `PRODUCT.md`.
>
> Add per-page titles and descriptions (titles are in the content document; the homepage description is there too), Open Graph and Twitter cards, an authored OG image in the established world — iroko ground, wordmark, no stock photography — a favicon from the wordmark, `sitemap.xml`, `robots.txt`, and JSON-LD `Organization` markup containing only verified facts.
>
> Write Privacy and Terms that describe what the contact form actually collects, where it is sent and how long it is kept. Nothing boilerplate that the site does not do.
>
> Keep `/news/` out of the navigation until three real posts exist. Then run a throttled-4G performance pass against §8 and list anything over budget.
>
> **Done when:** every route has correct metadata, the OG image renders in the established world, Privacy and Terms match actual behaviour, News is unlinked, and LCP is under 2.5s throttled.

---

## 10. What to refuse, whoever suggests it

Hand this list to every session. It is the difference between this site and the one you said you never wanted.

- A photographic hero. There is no photography, and the design does not want any.
- Any statistic, counter, "years of experience" or satisfaction figure.
- A three-card services row. Registers, not cards.
- An eyebrow or kicker above a heading.
- Client logos, partner logos, testimonials, pricing, an industries carousel, a newsletter sign-up.
- A second theme or a light mode.
- Gradient text, glass, blur as decoration, hard offset shadows.
- Stock icons from an icon font, or emoji standing in for icons.
- Smoothing the dashed "Not yet begun" slot into something tidier. That slot is the argument.
- A hosted Google Fonts stylesheet.
- Rewording the approved copy without telling you.

---

## 11. Honest risk

Carved wood can slide into heritage-museum if the type is set reverently instead of structurally. The guard is the apparatus: mono ordinals, fixed registers, measured status slots, hard 1px grooves. Keep the page feeling like an engineered object. The moment it starts feeling like a crafted artefact, the display type has gone soft — reset it harder and tighten the tracking.

The second risk is yours rather than the design's. This site stakes its credibility on telling the truth about stage. That only works if the statuses stay true. A "Not yet begun" that still says that in two years reads worse than the template did.
