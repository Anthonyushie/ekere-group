"use client";

import { useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Reveal-on-enter.

   The usual way to build this is to hide `[data-reveal]` in the stylesheet
   and let script reveal it. That makes the stylesheet assume script, and a
   partner on a bad connection whose bundle fails gets a blank page instead
   of a slow one. Not a trade this site can make.

   So nothing is hidden by CSS alone. The attributes that hide an element
   are written here, by script, at mount — which means their presence is
   itself the proof that script is alive and the reader has not asked for
   reduced motion. No script, no attributes, nothing hidden, page finished.

   An element already on screen at mount is marked shown outright rather
   than hidden and faded: hiding something the reader is already looking at
   to animate it back is a flash, not an entrance.

   The attributes are set imperatively rather than through state. There is
   nothing for React to re-render here — the observer talks to the DOM and
   the DOM talks to CSS — and a state update per revealed band would cost a
   render for no gain.
   ────────────────────────────────────────────────────────────────────── */

export function motionAllowed(): boolean {
  return (
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !motionAllowed()) return;

    element.dataset.reveal = "";

    // Already in view: show it, do not animate it.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
      element.dataset.shown = "true";
      return;
    }

    element.dataset.shown = "false";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.shown = "true";
        observer.disconnect();
      },
      // Fires a little before the top edge arrives, so the motion has
      // finished by the time the reader is actually looking at it.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ──────────────────────────────────────────────────────────────────────────
   Scroll progress.

   Writes a 0→1 `--progress` onto an element as it travels the viewport, and
   nothing else. Three things read it — the scrubbed statement, the orb's
   scale and the ledger's drift — so the arithmetic lives here once.

   `from` and `to` are viewport fractions measured against the element's top
   edge. `spanHeight` subtracts the element's own height from the end, which
   turns "finishes when the top reaches here" into "finishes when the BOTTOM
   reaches here" — the difference between a long paragraph lighting in a few
   hundred pixels and lighting over its own length.

   Work is rAF-coalesced and touches one custom property, so scrolling never
   triggers a React render. As with useReveal, nothing happens at all when
   motion is unwanted, and every stylesheet that reads `--progress` supplies
   a resting default for exactly that case.
   ────────────────────────────────────────────────────────────────────── */

export function useScrollProgress<T extends HTMLElement>({
  from,
  to,
  spanHeight = false,
}: {
  from: number;
  to: number;
  spanHeight?: boolean;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !motionAllowed()) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const view = window.innerHeight;
      const start = view * from;
      const end = view * to - (spanHeight ? box.height : 0);
      const progress = (start - box.top) / (start - end);
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
  }, [from, to, spanHeight]);

  return ref;
}
