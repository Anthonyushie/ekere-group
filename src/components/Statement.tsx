"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { motionAllowed } from "./useReveal";

/* ──────────────────────────────────────────────────────────────────────────
   The scrubbed statement.

   The reference reveals its manifesto word by word as the section travels up
   the viewport, so the sentence is read at the speed it is scrolled rather
   than arriving all at once. This does the same, with one difference that
   matters more here than the effect does: the resting state is the finished
   state.

   `--progress` defaults to 1 in the stylesheet. No JS, reduced motion, an
   engine without `color-mix` — every one of those paths leaves the sentence
   fully lit and fully readable. The scrub only ever takes legibility away
   from text the reader has not reached yet, and even that floor is
   `--night-held`, which clears AA on its own.

   Scroll work is rAF-coalesced and does nothing but set one custom property,
   so a scroll never triggers a React render.
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
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element || !motionAllowed()) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const view = window.innerHeight;
      // The scrub is measured against the block's own height, not against a
      // fixed slice of the viewport. Tied to the viewport alone it finishes
      // in a few hundred pixels — the sentence is lit before the reader has
      // travelled it, which is the opposite of the point. Here it starts as
      // the top passes 80% and completes as the LAST line reaches 55%, so a
      // longer statement is simply read over a longer scroll, and the
      // mobile case, where the block is far taller, takes care of itself.
      const from = view * 0.8;
      const to = view * 0.55 - box.height;
      const progress = (from - box.top) / (from - to);
      element.style.setProperty(
        "--progress",
        String(Math.min(1, Math.max(0, progress))),
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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
