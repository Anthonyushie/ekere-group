import type { Metadata } from "next";
import "@/styles/spec.css";
import {
  ComputedClamp,
  ContrastTable,
  TokenValue,
  TypeFloorAudit,
  type InkRow,
} from "@/components/Measured";

export const metadata: Metadata = {
  title: "Tokens — Ekere Group",
  description: "The Carved Register: the Stage 0 foundation, in isolation.",
  robots: { index: false, follow: false },
};

/* ──────────────────────────────────────────────────────────────────────────
   /tokens — the Stage 0 approval sheet.

   Every token and every component variant from §2, rendered in isolation.
   This is the only page Stage 0 builds. No site route exists yet.
   ────────────────────────────────────────────────────────────────────── */

const GROUND = [
  { token: "--iroko", note: "Page ground, everywhere" },
  { token: "--iroko-deep", note: "Recessed panels, the reverse face" },
  { token: "--iroko-wash", note: "Recency wash, left-bleeding" },
];

const INK = [
  { token: "--sapwood", note: "Primary text, display type" },
  { token: "--sapwood-lift", note: "The one recent register name" },
  { token: "--bark", note: "Standfirst, secondary prose" },
  { token: "--bark-dim", note: "Register notes" },
  { token: "--ash", note: "Mono apparatus, labels, meta" },
];

const SIGNAL = [
  { token: "--brass", note: "Live status, primary action, accents" },
  { token: "--brass-lip", note: "The 2px underlip on brass plates" },
  { token: "--brass-ink", note: "Text ON brass" },
  { token: "--oxblood", note: "In development borders" },
  { token: "--oxblood-ink", note: "In development text" },
];

const RULES = [
  { token: "--groove", note: "The only divider" },
  { token: "--groove-fade", note: "Its fade at both ends" },
];

// The figures §2.1 states. Measured live against the ground below.
const CONTRAST_ROWS: InkRow[] = [
  { token: "--sapwood", against: "--iroko", stated: null },
  { token: "--sapwood-lift", against: "--iroko", stated: null },
  { token: "--bark", against: "--iroko", stated: null },
  { token: "--bark-dim", against: "--iroko", stated: 6.1 },
  { token: "--ash", against: "--iroko", stated: 5.2 },
  { token: "--brass", against: "--iroko", stated: 5.9 },
  { token: "--oxblood-ink", against: "--iroko", stated: 4.7 },
  { token: "--brass-ink", against: "--brass", stated: null },
  { token: "--ash", against: "--iroko-deep", stated: null },
];

const SPACE_STEPS = [4, 8, 12, 16, 24, 32, 48, 64, 72, 96, 128, 160];

const RAMP = [
  {
    role: "display-1",
    spec: "104px / .845 / −.022em · BSD 700 · uppercase",
    use: "home h1",
    cls: "t-display-1",
    sample: "Building businesses.",
  },
  {
    role: "display-2",
    spec: "64px / .94 / −.018em · BSD 700 · uppercase",
    use: "section heads",
    cls: "t-display-2",
    sample: "What the group is for",
  },
  {
    role: "display-3",
    spec: "43px / 1 / .005em · BSD 500 · uppercase",
    use: "register names",
    cls: "t-display-3",
    sample: "Community Education",
  },
  {
    role: "mark",
    spec: "25px / 1 / .22em · BSD 900 · uppercase",
    use: "wordmark",
    cls: "t-mark",
    sample: "Ekere·Group",
  },
  {
    role: "standfirst",
    spec: "15.5px / 1.62 · Archivo 400 · 42ch max",
    use: "declaration standfirst",
    cls: "t-standfirst",
    sample:
      "A corporate group built on the belief that enterprise should create long-term value without costing people their health or their livelihoods.",
  },
  {
    role: "body",
    spec: "16px / 1.65 · Archivo 400 · 68ch max",
    use: "prose",
    cls: "t-body",
    sample:
      "The group publishes what it is building, what it is developing, and what it aspires to, as three separate things. Each venture on this site carries the stage it has actually reached, and the stage is a field on the record rather than a sentence written around it.",
  },
  {
    role: "note",
    spec: "13px / 1.5 · Archivo 400 · 58ch max",
    use: "register notes",
    cls: "t-note",
    sample:
      "School outreach on drug abuse and the brain. Sessions in preparation with schools in Port Harcourt.",
  },
  {
    role: "nav",
    spec: "12.5px / 1 / .16em · Archivo 500 · uppercase",
    use: "masthead nav",
    cls: "t-nav",
    sample: "About · Ventures · Impact · News · Contact",
  },
  {
    role: "mono-label",
    spec: "11.5px / 1 / .08em · Martian Mono 400 · uppercase",
    use: "status slots, ordinals",
    cls: "t-mono-label",
    sample: "Active initiative · R / 01",
  },
  {
    role: "mono-meta",
    spec: "11px / 2 / .02em · Martian Mono 400 · uppercase",
    use: "seat of operations, counter-copy",
    cls: "t-mono-meta",
    sample: "Port Harcourt · Rivers State · Federal Republic of Nigeria",
  },
];

const CLAMPS = [
  { token: "--display-1", spec: "clamp(58px, 7.25vw, 104px)" },
  { token: "--display-2", spec: "clamp(34px, 4.6vw, 64px)" },
  { token: "--display-3", spec: "clamp(27px, 3.1vw, 43px)" },
  { token: "--gutter", spec: "clamp(24px, 5vw, 72px)" },
];

function Swatch({ token, note }: { token: string; note: string }) {
  return (
    <div>
      <div className="swatch-chip" style={{ background: `var(${token})` }} />
      <div className="swatch-meta">
        <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
          {token}
        </span>
        <span className="t-mono-label">
          <TokenValue token={token} />
        </span>
        <span className="t-note" style={{ maxWidth: "26ch" }}>
          {note}
        </span>
      </div>
    </div>
  );
}

function Section({
  ordinal,
  heading,
  caption,
  children,
}: {
  ordinal: string;
  heading: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="spec-section">
      <h2 className="t-display-2 t-balance">{heading}</h2>
      <div className="groove" />
      {/* The brief-section reference sits beside the caption, not above the
          heading: an ordinal above a heading is an eyebrow, and §2.6 bans
          those. It earns its place here because the sequence it names is
          the build brief itself. */}
      <div className="spec-section-meta">
        <p className="t-mono-label">{ordinal}</p>
        {caption ? <p className="spec-caption">{caption}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function TokensPage() {
  return (
    <main className="sheet spec">
      <header>
        <h1 className="t-mark" style={{ marginBottom: "var(--space-48)" }}>
          Ekere<span style={{ color: "var(--brass)" }}>·</span>Group
        </h1>
        <div className="groove" />
        <p
          className="t-display-3"
          style={{ marginTop: "var(--space-48)", color: "var(--sapwood)" }}
        >
          Stage 0 — the carved register, in parts
        </p>
        <p className="spec-caption">
          Every token and component primitive from §2 of the build brief,
          rendered in isolation. No site page exists yet. Contrast and computed
          type size on this page are measured in the browser and printed as
          found, not copied from the brief.
        </p>
      </header>

      {/* ══ Colour ══════════════════════════════════════════════════════ */}
      <Section
        ordinal="§2.1"
        heading="Colour"
        caption="Committed strategy. The iroko ground owns 100% of every surface, there is no light mode and there is no second theme. Brass is the only thing that glows and it is rationed: live status, the primary action, the brass dot in the wordmark. Nothing else."
      >
        <p className="t-mono-label spec-sub">Ground</p>
        <div className="swatches">
          {GROUND.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>

        <p className="t-mono-label spec-sub">Ink</p>
        <div className="swatches">
          {INK.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>

        <p className="t-mono-label spec-sub">Signal</p>
        <div className="swatches">
          {SIGNAL.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>

        <p className="t-mono-label spec-sub">Rules</p>
        <div className="swatches">
          {RULES.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>

        <p className="t-mono-label spec-sub">Contrast, measured in this page</p>
        <ContrastTable rows={CONTRAST_ROWS} />
        <p className="spec-caption">
          The first ash candidate the comp used failed at 3.26:1. That is the
          trap on a ground this dark, and it is why these exact values are
          fixed. Do not darken any of them.
        </p>
      </Section>

      {/* ══ Type ════════════════════════════════════════════════════════ */}
      <Section
        ordinal="§2.2"
        heading="Type"
        caption="Three faces, all OFL, all self-hosted as woff2 from /public/fonts with font-display: swap. There is no hosted Google Fonts stylesheet anywhere in this project: it is a third-party request on the critical path, and this site has to be fast on a Nigerian mobile connection."
      >
        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --font-display
            </span>
            <span className="t-mono-label">500 / 700 / 900</span>
          </div>
          <div>
            <p
              className="t-display-3"
              style={{ marginBottom: "var(--space-12)" }}
            >
              Big Shoulders Display
            </p>
            <p className="t-note">
              Incised, condensed, monumental. Reads as cut into a dark beam
              rather than printed on it. Fallback stack is{" "}
              <span className="t-mono-label">
                &apos;Arial Narrow&apos;, sans-serif
              </span>{" "}
              — the fallback must be condensed, or the pre-load frame reflows
              from seven lines to three.
            </p>
            <p
              className="t-display-3"
              style={{ marginTop: "var(--space-24)", color: "var(--bark)" }}
            >
              <span style={{ fontWeight: 500 }}>500 Aa</span>{" "}
              <span style={{ fontWeight: 700 }}>700 Aa</span>{" "}
              <span style={{ fontWeight: 900 }}>900 Aa</span>
            </p>
          </div>
        </div>

        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --font-text
            </span>
            <span className="t-mono-label">400 / 500 / 600</span>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "28px",
                margin: "0 0 var(--space-12)",
              }}
            >
              Archivo
            </p>
            <p className="t-note">
              A workhorse with enough width to hold its own under the display,
              no personality fighting it.
            </p>
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "20px",
                marginTop: "var(--space-24)",
                color: "var(--bark)",
              }}
            >
              <span style={{ fontWeight: 400 }}>400 Aa</span>{" "}
              <span style={{ fontWeight: 500 }}>500 Aa</span>{" "}
              <span style={{ fontWeight: 600 }}>600 Aa</span>
            </p>
          </div>
        </div>

        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --font-mono
            </span>
            <span className="t-mono-label">400 / 600</span>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "24px",
                margin: "0 0 var(--space-12)",
              }}
            >
              Martian Mono
            </p>
            <p className="t-note">
              Status labels, ordinals, meta, any figure. Measurement, not
              decoration.
            </p>
            <p
              className="t-tabular"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "16px",
                marginTop: "var(--space-24)",
                color: "var(--bark)",
              }}
            >
              <span style={{ fontWeight: 400 }}>400 0123456789</span>{" "}
              <span style={{ fontWeight: 600 }}>600 0123456789</span>
            </p>
          </div>
        </div>

        <p className="t-mono-label spec-sub">The ramp, at this viewport</p>
        {RAMP.map((r) => (
          <div className="spec-row" key={r.role}>
            <div className="spec-row-label">
              <span
                className="t-mono-label"
                style={{ color: "var(--sapwood)" }}
              >
                {r.role}
              </span>
              <span className="t-mono-label">{r.spec}</span>
              <span
                className="t-mono-label"
                style={{ color: "var(--bark-dim)" }}
              >
                {r.use}
              </span>
            </div>
            <div>
              <p className={r.cls}>{r.sample}</p>
            </div>
          </div>
        ))}

        <p className="t-mono-label spec-sub">Line breaking</p>
        <div className="specimen-grid">
          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-16)" }}
            >
              Authored breaks · text-wrap: nowrap
            </p>
            <p className="t-display-3 t-nowrap">
              Building businesses.
              <br />
              Advancing progress.
              <br />
              <span style={{ color: "var(--brass)" }}>
                Creating lasting impact.
              </span>
            </p>
          </div>
          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-16)" }}
            >
              Natural wrap · text-wrap: balance
            </p>
            <p className="t-display-3 t-balance">
              A corporate group that states the stage of every venture it
              declares
            </p>
          </div>
        </div>
        <p className="spec-caption">
          Headings whose breaks are authored with <code>&lt;br&gt;</code> get
          nowrap, not balance — balance re-distributes across the authored
          breaks and silently adds a fourth line. At balance, &ldquo;Creating
          lasting impact.&rdquo; split in two and pushed the base register 163px
          below the fold.
        </p>

        <p className="t-mono-label spec-sub">The 11px floor, measured</p>
        <TypeFloorAudit />
        <p className="spec-caption">
          No functional text goes below 11px — not labels, not ordinals, not
          meta rows, and not a letterspaced micro-label that looks decorative.
          The status slot label is the most important text on the page after the
          headline; the comp originally set it at 10px and it had to be raised.
          Only non-interactive legal smallprint may sit at 10px:
        </p>
        <p data-smallprint>
          Registered office and company registration number pending
          verification. Nothing on this page constitutes an offer.
        </p>
      </Section>

      {/* ══ Space and grid ═════════════════════════════════════════════ */}
      <Section
        ordinal="§2.3"
        heading="Space and grid"
        caption="4px base. Only these twelve steps exist; anything between them is a mistake. More space above a heading than below it — always."
      >
        {SPACE_STEPS.map((step) => (
          <div className="space-step" key={step}>
            <span
              className="t-mono-label t-tabular"
              style={{ color: "var(--sapwood)" }}
            >
              --space-{step}
            </span>
            <span className="space-bar" style={{ width: `${step}px` }} />
          </div>
        ))}

        <p className="t-mono-label spec-sub">Fixed geometry</p>
        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --content-max
            </span>
          </div>
          <p className="t-note">1296px, centred.</p>
        </div>
        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --col-gap
            </span>
          </div>
          <p className="t-note">24px, across 12 columns.</p>
        </div>
        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --declaration-cols
            </span>
            <span className="t-mono-label">+ --declaration-gap</span>
          </div>
          <p className="t-note">
            1fr minmax(260px, 316px), gap clamp(40px, 5vw, 72px). A fixed 316px
            right column starves the headline below 1360px and the display type
            overflows.
          </p>
        </div>
        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --register-h
            </span>
            <span className="t-mono-label">104px / 92px mobile</span>
          </div>
          <p className="t-note">
            Fixed height, not min-height. Load-bearing: a venture with nothing
            in it shows its own empty band rather than collapsing, so absence is
            legible instead of hidden.
          </p>
        </div>
        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --slot-w / --slot-h
            </span>
            <span className="t-mono-label">224px × 46px</span>
          </div>
          <p className="t-note">
            The reserved status slot. Always rendered, even when the content is
            &ldquo;Not yet begun&rdquo;.
          </p>
        </div>
        <div className="spec-row">
          <div className="spec-row-label">
            <span className="t-mono-label" style={{ color: "var(--sapwood)" }}>
              --section-head-above
            </span>
            <span className="t-mono-label">128px / 48px below</span>
          </div>
          <p className="t-note">
            The spacing either side of a section head. The gap above every
            heading on this page is this token.
          </p>
        </div>
      </Section>

      {/* ══ Fluidity ════════════════════════════════════════════════════ */}
      <Section
        ordinal="§2.4"
        heading="Fluidity"
        caption="No fixed-pixel grid that wraps a hundred pixels narrower. The first viewport must still hold at 1280 and 1600, not only at 1440. Resize the window and these figures move."
      >
        {CLAMPS.map((c) => (
          <div className="spec-row" key={c.token}>
            <div className="spec-row-label">
              <span
                className="t-mono-label"
                style={{ color: "var(--sapwood)" }}
              >
                {c.token}
              </span>
              <span className="t-mono-label">{c.spec}</span>
            </div>
            <p className="t-mono-label">
              resolves here to <ComputedClamp token={c.token} />
            </p>
          </div>
        ))}
        <p className="spec-caption">
          Tracking floor is −0.04em. Display never exceeds 6rem on mobile — the
          display-1 clamp bottoms out at 58px long before a phone viewport, so
          the ceiling holds without a second rule.
        </p>
      </Section>

      {/* ══ Material ════════════════════════════════════════════════════ */}
      <Section
        ordinal="§2.5"
        heading="Material"
        caption="Two layers over the ground, both pointer-events: none, both authored once. The grain is the incision running the length of the beam; the vignette is light falling on carved wood from upper left. Both are live on this page behind everything you are reading."
      >
        <div className="specimen-grid">
          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-16)" }}
            >
              --grain · 1px / 7px, sapwood @ 5.5%, soft-light
            </p>
            <div className="material-specimen">
              <div className="layer layer--grain" />
            </div>
          </div>
          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-16)" }}
            >
              --vignette · radial from 22% 8% + bottom ramp
            </p>
            <div className="material-specimen">
              <div className="layer layer--vignette" />
            </div>
          </div>
          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-16)" }}
            >
              Both layers, as shipped
            </p>
            <div className="material-specimen">
              <div className="layer layer--grain" />
              <div className="layer layer--vignette" />
            </div>
          </div>
          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-16)" }}
            >
              --iroko-deep · the reverse face
            </p>
            <div className="material-specimen material-specimen--deep">
              <div className="layer layer--grain" />
            </div>
          </div>
          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-16)" }}
            >
              --iroko-wash · recency, left-bleeding (§3.2, Stage 1)
            </p>
            <div className="material-specimen">
              <div className="layer layer--wash" />
              <div className="layer layer--grain" />
            </div>
          </div>
        </div>

        <p className="t-mono-label spec-sub">
          --groove-line · the only divider, 1px, fading at both ends
        </p>
        <div className="groove" />

        <p className="t-mono-label spec-sub">
          --chevron-cut · the one authored ornament, 18 × 9px at .62
        </p>
        <div className="chevron" />
        <p className="spec-caption">
          Used only between major registers, never more than three times on a
          page.
        </p>
      </Section>

      {/* ══ Components ══════════════════════════════════════════════════ */}
      <Section
        ordinal="§2.6"
        heading="Components"
        caption="Three primitives only. The brass plate is cut metal seated into wood — the 2px underlip is the seating, and it is the whole reason the plate does not read as a floating card."
      >
        <p className="t-mono-label spec-sub">
          Brass plate · primary action · hover and press it
        </p>
        <div className="bench">
          <button type="button" className="plate">
            Open a conversation
            <span className="plate-rule" aria-hidden="true" />
          </button>
          <button type="button" className="plate">
            Partner with us
          </button>
        </div>
        <p className="spec-caption">
          Rest: underlip 2px, shadow 0 14px 26px −10px. Hover: shadow deepens to
          0 18px 32px −10px, plate translates up 1px, underlip grows to 3px.
          Active: plate sits down, underlip to 0. 160ms ease-out, and nothing
          moves at all under prefers-reduced-motion.
        </p>

        <p className="t-mono-label spec-sub">
          Secondary action · 1px ash border, sapwood text, no fill
        </p>
        <div className="bench">
          <button type="button" className="action-secondary">
            Read the ventures
          </button>
        </div>
        <p className="spec-caption">Hover: border to brass, text to brass.</p>

        <p className="t-mono-label spec-sub">
          Status slot · fixed 224 × 46px, three variants
        </p>
        <div className="slot-bench">
          <div className="bench-stack">
            <span className="slot slot--live">
              <span className="pip" aria-hidden="true" />
              Active initiative
            </span>
            <span className="t-mono-label">
              1px brass @ .5 · fill brass @ .13 · solid pip
            </span>
          </div>
          <div className="bench-stack">
            <span className="slot slot--dev">
              <span className="pip" aria-hidden="true" />
              In development
            </span>
            <span className="t-mono-label">
              1px oxblood @ .62 · no fill · solid pip
            </span>
          </div>
          <div className="bench-stack">
            <span className="slot slot--open">
              <span className="pip" aria-hidden="true" />
              Not yet begun
            </span>
            <span className="t-mono-label">
              1px dashed ash · no fill · hollow pip
            </span>
          </div>
        </div>
        <p className="spec-caption">
          The dashed border and the hollow pip are the design doing the honesty
          work. A company that spends prime real estate on what it has not done
          yet is a company telling the truth about the rest. Do not improve them
          into something tidier.
        </p>

        <p className="t-mono-label spec-sub">Banned outright</p>
        <p className="t-body">
          No cards as page structure and no nested cards ever. No kicker or
          eyebrow above any heading. No gradient text. No glass or backdrop-blur
          as decoration. No coloured border-left over 1px. No hard offset
          shadows. No section numbers unless the sequence carries information.
          No emoji or Unicode glyphs as icons — icons are authored SVG at one
          stroke weight, 1.5px, or they do not exist. No stock photography.
        </p>
      </Section>

      {/* ══ Browser surfaces ════════════════════════════════════════════ */}
      <Section
        ordinal="§2.7"
        heading="Browser surfaces"
        caption="The cheapest signal that a page was built rather than assembled. All five ship."
      >
        <div className="surface-demo">
          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-12)" }}
            >
              ::selection · brass ground, brass-ink text
            </p>
            <p className="t-body">
              Select this sentence to see the selection surface.
            </p>
          </div>

          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-12)" }}
            >
              :focus-visible · 2px brass, 3px offset
            </p>
            <button type="button" className="action-secondary">
              Tab to me
            </button>
          </div>

          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-12)" }}
            >
              caret-color · brass
            </p>
            <label className="t-mono-label" htmlFor="caret-demo">
              Type in this field
            </label>
            <input
              id="caret-demo"
              type="text"
              placeholder="The caret is brass"
              style={{ marginTop: "var(--space-8)", width: "100%" }}
            />
          </div>

          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-12)" }}
            >
              text-underline-offset · 3px, 1px thickness
            </p>
            <p className="t-body">
              A link sits like{" "}
              <a href="/tokens">this one, offset from its own baseline</a>.
            </p>
          </div>

          <div>
            <p
              className="t-mono-label"
              style={{ marginBottom: "var(--space-12)" }}
            >
              scrollbar-color · ash thumb on iroko-deep track
            </p>
            <div className="scroll-demo" tabIndex={0}>
              <p className="t-note">
                The scrollbar on this panel, and on the page itself, is ash on
                iroko-deep. Scroll it. A default scrollbar is the single loudest
                tell that a dark page was assembled rather than built, and it
                costs one declaration to fix.
              </p>
              <p className="t-note" style={{ marginTop: "var(--space-24)" }}>
                Nothing else in §2.7 is optional either: selection, focus ring,
                caret and underline offset all ship together or the page reads
                as a template with the colours swapped.
              </p>
              <p className="t-note" style={{ marginTop: "var(--space-24)" }}>
                Keep scrolling.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <footer style={{ marginTop: "var(--space-160)" }}>
        <div className="groove" />
        <p className="t-mono-meta" style={{ marginTop: "var(--space-32)" }}>
          Stage 0 · tokens and primitives only · no site route built
        </p>
      </footer>
    </main>
  );
}
