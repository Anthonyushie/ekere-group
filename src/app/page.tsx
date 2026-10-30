import type { CSSProperties } from "react";

import Link from "next/link";

import "@/styles/site.css";

import { Masthead } from "@/components/Masthead";
import { Odometer } from "@/components/Odometer";
import { Reveal } from "@/components/Reveal";
import { Scrub } from "@/components/Scrub";
import { Statement } from "@/components/Statement";
import { VentureRegisters } from "@/components/VentureRegisters";
import { VENTURES } from "@/content/ventures";

/* The statement is authored as one string so the scrub can split it into
   words. It is the only copy on the page that is not written as JSX. */
const PURPOSE =
  "Enterprise should create long-term value without costing people their " +
  "health or their livelihoods. That is the whole reason this group exists, " +
  "and it is the test every venture here has to pass before we put our name " +
  "to it.";

/* ──────────────────────────────────────────────────────────────────────────
   Home.

   Eight bands, in the order a sceptical institutional reader needs them:
   who we are, what we believe, what we are building and at what stage, a
   pause, what we can honestly count, how we work, the ask, the footer.

   The group has no photography, no metrics, no logos and no track record,
   so none of those appear. The one piece of imagery is generated in CSS,
   and the one set of numerals is a ledger of what the group can defend —
   including the zeros, which are the point rather than an embarrassment.
   ────────────────────────────────────────────────────────────────────── */

const METHOD = [
  {
    kicker: "01 / Stage honesty",
    title: "We publish the stage, not the ambition",
    body: "Every area of focus on this site carries its real status: operating, in development, or an ambition with nothing built yet. We would rather be believed on one thing than doubted on three.",
  },
  {
    kicker: "02 / Where we are",
    title: "Built in Port Harcourt, for Port Harcourt",
    body: "The group is based in Rivers State and the work is local: property we can walk to, schools we can sit in, waste we can see. Nothing here is run at a distance.",
  },
  {
    kicker: "03 / What we will not do",
    title: "Enterprise that does not cost people their health",
    body: "The group exists on the belief that long-term value and public harm are not a trade to be made. Where a venture cannot clear that test, we do not pursue it.",
  },
];

const FOOTER_NAV = [
  { label: "About us", href: "/about-us/" },
  { label: "Our ventures", href: "/our-ventures/" },
  { label: "Our impact", href: "/our-impact/" },
  { label: "Contact", href: "/contact/" },
];

/*
 * Held as a constant rather than read from `new Date()`. Next refuses to
 * prerender the current time, and a self-updating copyright year is not
 * worth making the whole home page dynamic for. Bump it each January.
 */
const COPYRIGHT_YEAR = 2026;

const FOOTER_LEGAL = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

/**
 * The ledger figures, read out of the venture records rather than typed.
 * A hand-typed count is the first thing to go stale when a status changes,
 * and a stale count is the one real risk a site built on stage honesty runs.
 */
function ledger() {
  const declared = VENTURES.length;
  const operating = VENTURES.filter((v) => v.stage === "live").length;

  return [
    {
      figure: String(declared).padStart(2, "0"),
      label: "Areas of focus",
      note: "Each one published with its real stage, reviewed as it changes.",
    },
    {
      figure: String(operating).padStart(2, "0"),
      label: "Active initiative",
      note: "School outreach on drug abuse and the brain, in preparation with schools in Port Harcourt.",
    },
    {
      figure: "00",
      label: "Completed projects claimed",
      note: "The group is early. We do not imply otherwise, and nothing on this site is written to suggest it.",
    },
    {
      figure: "00",
      label: "Figures we cannot evidence",
      note: "No statistics, no partner logos, no testimonials, no awards. When there are some, they will appear here with their sources.",
    },
  ];
}

export default function Home() {
  return (
    <>
      {/* ── 00 — Masthead ────────────────────────────────────────────── */}
      <Masthead />

      <main>
        {/* ── 01 — Hero ──────────────────────────────────────────────── */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="shell">
            <p className="t-lede hero-lede">
              A corporate group in Port Harcourt, building in property,
              environmental innovation and community education — and saying
              plainly which of the three is operating today.
            </p>

            {/* The two lines are authored, not wrapped, because each one is
                masked and rises on its own. */}
            <h1 id="hero-title" className="t-hero hero-title">
              <span className="hero-line">
                <span>Building</span>
              </span>
              <span className="hero-line">
                <span>with Purpose</span>
              </span>
            </h1>

            <div className="hero-foot">
              <ul className="hero-facts">
                <li>Port Harcourt · Rivers State</li>
                <li>Three declared areas of focus</li>
                <li>Every status states its real stage</li>
              </ul>
              <Link href="/contact/" className="btn btn--solid">
                Open a conversation
              </Link>
            </div>
          </div>

          <p className="edge-label edge-label--left">Scroll down</p>
          <p className="edge-label edge-label--right">Our purpose</p>
          <div className="scroll-cue" aria-hidden="true">
            <span />
            <span />
          </div>
        </section>

        {/* ── 02 — Purpose ───────────────────────────────────────────── */}
        <section className="night purpose" aria-labelledby="purpose-title">
          <div className="shell purpose-grid">
            <Statement
              id="purpose-title"
              className="t-statement purpose-statement"
              text={PURPOSE}
            />

            <Reveal className="purpose-aside">
              <p className="t-note">
                Ekere Group is a parent company at an early stage. Most of what
                follows is intention rather than operation — and this site tells
                you which is which, area by area.
              </p>
              <Link href="/about-us/" className="link-arrow">
                Read about the group
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── 03 — Ventures ──────────────────────────────────────────── */}
        <section className="ventures" aria-labelledby="ventures-title">
          <div className="shell">
            <Reveal className="band-head">
              <h2 id="ventures-title" className="t-head">
                Meet the three areas
                <br />
                we are building in
              </h2>
              <p className="t-label">Select an area for its fine print</p>
            </Reveal>

            <VentureRegisters />
          </div>
        </section>

        {/* ── 04 — The pause ─────────────────────────────────────────── */}
        <section className="pause" aria-labelledby="pause-title">
          <Reveal className="shell" stagger>
            <p className="t-label">Our position</p>
            {/* The orb grows as the reader comes down onto it. */}
            <Scrub className="orb-field" from={0.95} to={0.15}>
              <div className="orb" aria-hidden="true" />
            </Scrub>
            <h2 id="pause-title" className="t-statement">
              Structure, where a track record is not yet earned
            </h2>
            <p className="t-body pause-body">
              The group has no completed developments to photograph and no
              figures to quote. What it has is a clear remit, a declared stage
              for every venture, and a standard it will not move on. We would
              rather be judged on that than on a page of stock imagery.
            </p>
          </Reveal>
        </section>

        {/* ── 05 — The ledger ────────────────────────────────────────── */}
        <section className="ledger" aria-labelledby="ledger-title">
          <div className="shell">
            <Reveal className="band-head">
              <h2 id="ledger-title" className="t-head">
                What we can count
              </h2>
              <p className="t-label">Including the zeros</p>
            </Reveal>

            {/* Scrub outside, Reveal inside: `--progress` is a custom
                property, so setting it on the wrapper is enough for the grid
                to read it, and the two concerns stay in separate components
                instead of one doing both. */}
            <Scrub from={1} to={0}>
              <Reveal as="dl" className="ledger-grid" stagger>
                {ledger().map((cell, index) => (
                  <div
                    key={cell.label}
                    className="ledger-cell"
                    style={{ "--cell": index } as CSSProperties}
                  >
                    <dt className="t-counter">
                      <Odometer value={cell.figure} />
                    </dt>
                    <dd className="t-label ledger-label">{cell.label}</dd>
                    <p>{cell.note}</p>
                  </div>
                ))}
              </Reveal>
            </Scrub>
          </div>
        </section>

        {/* ── 06 — Method ────────────────────────────────────────────── */}
        <section className="method" aria-labelledby="method-title">
          <div className="shell">
            <Reveal className="band-head">
              <h2 id="method-title" className="t-head">
                How the group works
              </h2>
              <p className="t-label">Three commitments</p>
            </Reveal>

            <Reveal className="method-grid" stagger>
              {METHOD.map((item) => (
                <article key={item.kicker} className="card method-card">
                  <p className="t-label">{item.kicker}</p>
                  <h3 className="t-title">{item.title}</h3>
                  <p className="t-note">{item.body}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 07 — Invitation ────────────────────────────────────────── */}
        <section className="night invitation" aria-labelledby="invite-title">
          <Reveal className="shell invitation-grid" stagger>
            <div>
              <h2 id="invite-title" className="t-statement">
                Open a
                <br />
                conversation
              </h2>
            </div>

            <div className="invitation-aside">
              <p className="t-note">
                We are looking for property partners in Rivers State, technical
                partners and development finance for waste-to-energy, and
                schools willing to host an outreach session. If you are any of
                those — or you want to know how early we really are — write to
                us.
              </p>
              <Link href="/contact/" className="btn btn--solid">
                Reach out
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ── 08 — Footer ──────────────────────────────────────────────── */}
      <footer className="night footer">
        <div className="shell">
          <div className="footer-grid">
            <div className="footer-mark">
              <p className="mark-word">Ekere Group</p>
              <p className="t-note">
                Port Harcourt · Rivers State
                <br />
                Federal Republic of Nigeria
              </p>
            </div>

            <nav className="footer-col footer-col--nav" aria-label="Footer">
              <p className="t-label">The group</p>
              <ul>
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-col">
              <p className="t-label">Contact</p>
              {/* These are the facts PRODUCT.md records as unverified. They
                  ship as explicit placeholders rather than as plausible
                  filler: an invented address is the one mistake this site
                  cannot afford. */}
              <ul>
                <li className="t-note">[VERIFY: official email address]</li>
                <li className="t-note">[VERIFY: telephone number]</li>
                <li className="t-note">[VERIFY: postal address]</li>
              </ul>
            </div>
          </div>

          <div className="footer-base">
            <p className="t-label">
              © {COPYRIGHT_YEAR} Ekere Group. All rights reserved.
            </p>
            <p className="t-label footer-legal">
              {FOOTER_LEGAL.map((item, index) => (
                <span key={item.href}>
                  {index > 0 ? " · " : ""}
                  <Link href={item.href}>{item.label}</Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
