"use client";

import type { ReactNode } from "react";

import { useScrollProgress } from "./useReveal";

/* ──────────────────────────────────────────────────────────────────────────
   Publishes `--progress` on an element so its stylesheet can tie something
   to scroll position — the orb's scale, the ledger's drift. It renders no
   styles of its own; what the property drives lives in motion.css, next to
   the resting default that applies when this never runs.
   ────────────────────────────────────────────────────────────────────── */

type ScrubTag = "div" | "section" | "dl";

export function Scrub({
  as = "div",
  className,
  from,
  to,
  children,
}: {
  as?: ScrubTag;
  className?: string;
  from: number;
  to: number;
  children: ReactNode;
}) {
  const ref = useScrollProgress<HTMLElement>({ from, to });
  const Tag = as;

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
