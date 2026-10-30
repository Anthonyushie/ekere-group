"use client";

import type { CSSProperties } from "react";

import { useScrollProgress } from "./useReveal";

/* ──────────────────────────────────────────────────────────────────────────
   The scrubbed statement.

   The reference reveals its manifesto line by line as the section travels up
   the viewport, so the sentence is read at the speed it is scrolled rather
   than arriving all at once. This does the same by word, which needs no line
   measurement and reads the same, with one difference that matters more here
   than the effect does: the resting state is the finished state.

   `--progress` defaults to 1 in the stylesheet. No JS, reduced motion, an
   engine that chokes on the arithmetic — every one of those paths leaves the
   sentence fully lit and fully readable. The scrub only ever takes
   legibility away from text the reader has not reached yet, and even that
   floor is `--night-held`, which clears AA on its own.
   ────────────────────────────────────────────────────────────────────── */

/** How many words past the last one the lit front travels, so the sentence
    finishes lighting before the section leaves the scrub range. */
const OVERRUN = 6;

export function Statement({
  id,
  className,
  text,
}: {
  id?: string;
  className?: string;
  text: string;
}) {
  // Measured against the block's own height: tied to the viewport alone it
  // finishes in a few hundred pixels, lighting the sentence before the
  // reader has travelled it.
  const ref = useScrollProgress<HTMLHeadingElement>({
    from: 0.8,
    to: 0.55,
    spanHeight: true,
  });

  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      id={id}
      className={className}
      style={{ "--count": words.length + OVERRUN } as CSSProperties}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="word"
          style={{ "--i": index } as CSSProperties}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
