import type { Metadata } from "next";

import Link from "next/link";

import "@/styles/site.css";
import "@/styles/about.css";

import { Masthead } from "@/components/Masthead";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About us — Ekere Group",
  description:
    "Ekere Group is a purpose-driven parent company founded in Port Harcourt, Nigeria, building sustainable businesses, advancing innovation and contributing to societal progress.",
};

/* ──────────────────────────────────────────────────────────────────────────
   About us.

   The group's own copy, used verbatim. Three bands: who the group is, then
   vision and mission as two registers on night ground. The footer's
   "Our vision" and "Our mission" links land on the two anchors.
   ────────────────────────────────────────────────────────────────────── */

const REGISTERS = [
  {
    id: "vision",
    label: "Our vision",
    text: "To build a respected and diversified corporate group that advances responsible enterprise, drives innovation and contributes to lasting social, economic and environmental progress across Africa and beyond.",
  },
  {
    id: "mission",
    label: "Our mission",
    text: "To identify opportunities, develop sustainable business ventures and pursue practical solutions to societal challenges through responsible investment, innovation and strategic enterprise.",
  },
];

export default function AboutUs() {
  return (
    <>
      <Masthead />

      <main>
        {/* ── 01 — Page head ─────────────────────────────────────────── */}
        <section className="hero hero--page" aria-labelledby="about-title">
          <div className="shell">
            <p className="t-lede hero-lede">
              Ekere Group is a purpose-driven parent company founded in Port
              Harcourt, Nigeria, with a vision to build sustainable businesses,
              advance innovation and contribute to meaningful societal
              progress.
            </p>

            <h1 id="about-title" className="t-hero hero-title">
              <span className="hero-line">
                <span>About</span>
              </span>
              <span className="hero-line">
                <span>Ekere Group</span>
              </span>
            </h1>

            <div className="hero-foot">
              <ul className="hero-facts">
                <li>Founded in Port Harcourt</li>
                <li>
                  <a href="#vision">Our vision</a>
                </li>
                <li>
                  <a href="#mission">Our mission</a>
                </li>
              </ul>
              <Link href="/contact/" className="btn btn--solid">
                Open a conversation
              </Link>
            </div>
          </div>
        </section>

        {/* ── 02 — Who we are ────────────────────────────────────────── */}
        <section className="about-who" aria-labelledby="who-title">
          <div className="shell about-who-grid">
            <Reveal className="about-who-head">
              <h2 id="who-title" className="t-head">
                Enterprise with a purpose beyond profit
              </h2>
            </Reveal>

            <Reveal className="about-who-body" stagger>
              <p className="t-body">
                We believe that enterprise should serve a purpose beyond
                profit. Our interests span across different sectors, with a
                focus on building commercially viable ventures that respond to
                real needs and create lasting impact. From property development
                and improvement to community-focused educational initiatives,
                we seek opportunities where responsible enterprise and
                meaningful progress can work together.
              </p>
              <p className="t-body">
                We are also driven by a long-term ambition to explore
                innovative environmental solutions, particularly in waste
                management and waste-to-energy development, beginning with the
                needs of communities in Nigeria.
              </p>
              <p className="t-body about-closing">
                At Ekere Group, we are building with a broader perspective: one
                that recognises the relationship between economic progress,
                human wellbeing and environmental sustainability.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── 03 — Vision and mission, two registers ─────────────────── */}
        <section className="night about-registers" aria-label="Vision and mission">
          <div className="shell">
            {REGISTERS.map((item) => (
              <Reveal
                key={item.id}
                as="article"
                id={item.id}
                className="about-register"
                aria-labelledby={`${item.id}-title`}
              >
                <h2 id={`${item.id}-title`} className="t-label">
                  {item.label}
                </h2>
                <p className="t-statement about-register-text">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
