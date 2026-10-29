import Link from "next/link";

import "@/styles/site.css";

import { VentureRegisters } from "@/components/VentureRegisters";
import { VENTURES } from "@/content/ventures";

/* ──────────────────────────────────────────────────────────────────────────
   Home — the first viewport.

   Built against the approved comp at
   .impeccable/mocks/decision/assigned.html, which is a spatial contract
   rather than a mood reference: masthead register, declaration register,
   chevron band, the three venture registers, and the base register that
   closes the viewport. Sections 5 to 7 of §5, and the sticky header and the
   footer, are Stage 2 and are deliberately absent.

   The copy is the comp's, verbatim, with two declared departures recorded in
   the Stage 1 hand-over note: the fifth nav item is Home rather than News,
   because §5 keeps News out of the navigation until three real posts exist,
   and the base register's counter-copy is derived from the venture records
   so it cannot go stale while the statuses change.
   ────────────────────────────────────────────────────────────────────── */

/* The five nav items of §5, with the routes it confirms. Four of the five
   targets are built in Stages 3 and 4; the hrefs are the confirmed ones, so
   they do not have to be revisited when those routes land. */
const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us/" },
  { label: "Ventures", href: "/our-ventures/" },
  { label: "Impact", href: "/our-impact/" },
  { label: "Contact", href: "/contact/" },
];

const NUMBER_WORDS = [
  "no",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function spell(count: number): string {
  return NUMBER_WORDS[count] ?? String(count);
}

/**
 * The comp's counter-copy, read out of the venture records rather than
 * typed. §11 names the one real risk this site runs — a status that stops
 * being true — and a hand-typed count is the first thing to go stale.
 */
function counterCopy(): string {
  const declared = VENTURES.length;
  const operating = VENTURES.filter(
    (venture) => venture.stage === "live",
  ).length;

  return `${spell(declared)} ${declared === 1 ? "venture" : "ventures"} declared · ${spell(operating)} operating`;
}

export default function Home() {
  return (
    <main className="sheet view-first">
      {/* ── Register 00: the masthead ────────────────────────────────── */}
      <div className="masthead">
        <p className="t-mark">
          Ekere<span className="mark-dot">·</span>Group
        </p>
        <nav className="masthead-nav t-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="masthead-link"
              aria-current={item.href === "/" ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="groove" />

      {/* ── Register 01: the declaration ─────────────────────────────── */}
      <section className="declare" aria-label="Declaration">
        <div>
          {/* The breaks are authored, so the role is nowrap, never balance:
              at balance the third line splits and pushes the base register
              below the fold. §2.2. */}
          <h1 className="t-display-1 t-nowrap">
            Building businesses.
            <br />
            Advancing progress.
            <br />
            <em className="declare-lift">Creating lasting impact.</em>
          </h1>
        </div>
        <div>
          <p className="t-standfirst">
            A corporate group built on the belief that enterprise should create
            long-term value{" "}
            <strong>
              without costing people their health or their livelihoods.
            </strong>
          </p>
          <div className="seat t-mono-meta">
            <span className="seat-label">Seat of operations</span>
            <br />
            Port Harcourt · Rivers State
            <br />
            Federal Republic of Nigeria
          </div>
        </div>
      </section>

      {/* The one authored ornament, used only between major registers. */}
      <div className="chevron" aria-hidden="true" />

      {/* ── Registers 02–04: the ventures, §3 ───────────────────────── */}
      <VentureRegisters />

      {/* ── Base register: the action ────────────────────────────────── */}
      <section className="base" aria-label="Open a conversation">
        <Link href="/contact/" className="plate">
          Open a conversation
          <span className="plate-rule" aria-hidden="true" />
        </Link>
        <p className="base-note t-mono-meta">
          {counterCopy()}
          <br />
          Every status on this site states its real stage
        </p>
      </section>
    </main>
  );
}
