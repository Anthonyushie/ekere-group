import type { CSSProperties } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   The rolling figure.

   The reference counts its statistics up from zero on the way in. Counting
   is the wrong mechanism for this ledger — half of these figures ARE zero,
   which is the point of the band, and a counter would sit dead in two cells
   out of four while its neighbours span. Worse, a number ticking upward is
   the visual language of a vanity metric, and this site's entire argument is
   that it does not inflate.

   So the figure rolls instead of counts. Each digit is a strip of numerals
   behind a one-digit window, and the strip travels a full ten-digit cycle to
   land on its value. Every cell gets the same mechanical motion, a zero
   included, and no cell ever displays a total that is not the real one.

   The landing position is set in CSS on the strip itself, so a reader with
   no script or no motion sees the correct figure, parked, with no travel.
   The strip is `aria-hidden`; the real value is read from the visually
   hidden text beside it, so a screen reader is told "03" and not the twenty
   digits that produce it.
   ────────────────────────────────────────────────────────────────────── */

/** Two cycles of 0–9. The window starts on the first cycle's zero and lands
    on the second cycle's target, so every digit travels ten places. */
const STRIP = [...Array(20)].map((_, i) => i % 10);

export function Odometer({ value }: { value: string }) {
  return (
    <>
      <span className="sr-only">{value}</span>
      <span className="odometer" aria-hidden="true">
        {value.split("").map((character, index) => {
          const digit = Number(character);

          if (Number.isNaN(digit)) {
            return (
              <span key={index} className="odo-fixed">
                {character}
              </span>
            );
          }

          return (
            <span
              key={index}
              className="odo"
              style={{ "--d": digit, "--col": index } as CSSProperties}
            >
              <span className="odo-strip">
                {STRIP.map((n, row) => (
                  <span key={row}>{n}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </>
  );
}
