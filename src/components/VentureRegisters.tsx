"use client";

import { useId, useState } from "react";

import {
  VENTURES,
  VENTURE_STAGES,
  type Venture,
} from "@/content/ventures";

import { useReveal } from "./useReveal";

/* ──────────────────────────────────────────────────────────────────────────
   The three declared areas, as cards.

   Two rules carry this component, and both come from the brief rather than
   from the visual direction:

   Reserved slots. Every card is the same height and always draws its status
   slot, whatever the stage. A venture with nothing behind it shows its own
   near-empty card; nothing is collapsed or hidden, so absence is legible.

   The reverse face. Each card is a button that reveals its own fine print —
   what is confirmed, what is not, what partner is being sought, and when the
   status was last reviewed. It is a button rather than a hover, so it is
   keyboard operable and works as a tap on a phone.
   ────────────────────────────────────────────────────────────────────── */

function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function VentureRegisters({
  ventures = VENTURES,
}: {
  ventures?: readonly Venture[];
}) {
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const idPrefix = useId();
  const revealRef = useReveal<HTMLUListElement>();

  return (
    <ul
      ref={revealRef}
      className="venture-grid stagger"
      aria-label="Declared areas of focus"
    >
      {ventures.map((venture, index) => {
        const stage = VENTURE_STAGES[venture.stage];
        const isOpen = opened[venture.id] === true;
        const panelId = `${idPrefix}-${venture.id}`;

        return (
          <li key={venture.id}>
            <button
              type="button"
              className="card venture"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpened((previous) => ({
                  ...previous,
                  [venture.id]: !isOpen,
                }))
              }
            >
              <span className="venture-top">
                <span className="t-label venture-ord">{ordinal(index)}</span>
                <span className={`slot ${stage.slot}`}>
                  <span className="pip" aria-hidden="true" />
                  {stage.label}
                </span>
              </span>

              <span className="venture-body">
                <span className="t-title">{venture.name}</span>
                <span className="t-note venture-note">{venture.note}</span>
                <span className="venture-more">
                  {isOpen ? "Hide the detail" : "What is confirmed"}
                </span>
              </span>
            </button>

            <div className="venture-reverse" id={panelId} data-open={isOpen}>
              <div className="venture-reverse-clip">
                <div className="venture-reverse-inner">
                  <dl>
                    <div>
                      <dt className="t-label">Confirmed</dt>
                      <dd>{venture.reverse.confirmed}</dd>
                    </div>
                    <div>
                      <dt className="t-label">Not confirmed</dt>
                      <dd>{venture.reverse.notConfirmed}</dd>
                    </div>
                    <div>
                      <dt className="t-label">Partner sought</dt>
                      <dd>{venture.reverse.partnerSought}</dd>
                    </div>
                  </dl>
                  <div className="venture-reviewed">
                    <p className="t-label">Status last reviewed</p>
                    <p className="t-label">{venture.reverse.reviewedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
