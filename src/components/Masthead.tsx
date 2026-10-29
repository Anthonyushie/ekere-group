"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   The masthead.

   It floats over the page rather than sitting in a bar, so the first
   viewport is the headline and the bloom rather than chrome. That creates
   one problem worth solving properly: once the reader is past the hero the
   masthead is over whichever ground happens to be under it, including the
   two full-bleed night bands, where dark-on-dark would simply disappear.

   So past the hero it compacts: the section links step aside, the wordmark
   contracts to its glyph, and what remains carries a hairline ring that is
   invisible on the canvas and legible on night. The nav is not lost — it
   repeats in the footer, and the one action stays on screen throughout.

   The hero is observed rather than measured against a scroll offset, so
   this keeps working when the hero's height changes.
   ────────────────────────────────────────────────────────────────────── */

const NAV = [
  { label: "About", href: "/about-us/" },
  { label: "Ventures", href: "/our-ventures/" },
  { label: "Impact", href: "/our-impact/" },
  { label: "Contact", href: "/contact/" },
];

export function Masthead() {
  const [compact, setCompact] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = sentinel.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sits at the foot of the first viewport. Once it scrolls out, the
          reader is past the hero and the masthead compacts. */}
      <div ref={sentinel} className="masthead-sentinel" aria-hidden="true" />

      <header className="masthead" data-compact={compact}>
        <Link href="/" className="mark" aria-label="Ekere Group, home">
          <span className="mark-glyph" aria-hidden="true">
            EG
          </span>
          <span className="mark-word">Ekere Group</span>
        </Link>

        <nav className="masthead-nav t-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="masthead-link">
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className="btn btn--outline">
            Reach out
          </Link>
        </nav>
      </header>
    </>
  );
}
