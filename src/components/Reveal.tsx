"use client";

import type { ReactNode } from "react";

import { useReveal } from "./useReveal";

/* ──────────────────────────────────────────────────────────────────────────
   A band, or a grid, that enters as the reader reaches it.

   `stagger` makes the element's own children enter in sequence rather than
   the element entering as a block; the delays live in motion.css, keyed off
   nth-child, so a grid does not need a component per cell.

   The element renders its real tag, so wrapping a grid in this does not add
   a box between the grid and its items. It renders no reveal attributes of
   its own — useReveal writes those at mount, and only when it should.
   ────────────────────────────────────────────────────────────────────── */

type RevealTag = "div" | "dl" | "ul" | "section" | "article" | "p" | "header";

export function Reveal({
  as = "div",
  className,
  stagger = false,
  children,
  ...rest
}: {
  as?: RevealTag;
  className?: string;
  stagger?: boolean;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useReveal<HTMLElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={[className, stagger ? "stagger" : null]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
