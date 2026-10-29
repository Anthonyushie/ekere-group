"use client";

import { useId, useState } from "react";

import {
  VENTURES,
  VENTURE_STAGES,
  mostRecentlyMovedId,
  type Venture,
} from "@/content/ventures";

/* ──────────────────────────────────────────────────────────────────────────
   The venture registers, §3.

   Three mechanics, all of them carried by this component:

   §3.1  Reserved slots. Every register is a fixed-height band with fixed
         columns, and the 224x46 status slot is always drawn. A venture with
         nothing in it shows its own empty band; nothing is ever collapsed
         or hidden, so absence is legible.
   §3.2  Recency in ink density. Exactly one register carries the wash and
         the lifted name, and which one is computed from the `lastMovedAt`
         field on the venture records. No register is marked by hand.
   §3.3  The reverse side. Each register is a button that reveals its own
         fine print: what is confirmed, what is not, what partner is being
         sought, and when the status was last reviewed. It is a button, so
         it is keyboard operable and a tap on mobile rather than a hover.
   ────────────────────────────────────────────────────────────────────── */

/**
 * The ordinal is the register's position in the beam, so it is derived from
 * the order of the records rather than stored twice.
 */
function ordinal(index: number): string {
  return `R / ${String(index + 1).padStart(2, "0")}`;
}

export function VentureRegisters({
  ventures = VENTURES,
}: {
  ventures?: readonly Venture[];
}) {
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const idPrefix = useId();
  const recentId = mostRecentlyMovedId(ventures);

  return (
    <ul className="registers" aria-label="Declared ventures">
      {ventures.map((venture, index) => {
        const stage = VENTURE_STAGES[venture.stage];
        const isOpen = opened[venture.id] === true;
        const panelId = `${idPrefix}-${venture.id}`;
        const isRecent = venture.id === recentId;

        return (
          <li
            key={venture.id}
            className={`reg-group${isRecent ? " reg-group--recent" : ""}`}
          >
            <button
              type="button"
              className="reg"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpened((previous) => ({
                  ...previous,
                  [venture.id]: !isOpen,
                }))
              }
            >
              <span className="reg-ord t-mono-label t-tabular">
                {ordinal(index)}
              </span>
              <span>
                <span className="reg-name t-display-3">{venture.name}</span>
                <span className="reg-note t-note">{venture.note}</span>
              </span>
              {/* §3.1: the reserved slot. Always drawn, whatever the stage. */}
              <span className={`slot ${stage.slot}`}>
                <span className="pip" aria-hidden="true" />
                {stage.label}
              </span>
            </button>

            {/* §3.3: the reverse face. */}
            <div className="reg-reverse" id={panelId} data-open={isOpen}>
              <div className="reg-reverse-clip">
                <div className="reg-reverse-content">
                  <dl className="reg-reverse-fields">
                    <div>
                      <dt className="reg-reverse-term t-mono-label">
                        Confirmed
                      </dt>
                      <dd className="reg-reverse-text t-note">
                        {venture.reverse.confirmed}
                      </dd>
                    </div>
                    <div>
                      <dt className="reg-reverse-term t-mono-label">
                        Not confirmed
                      </dt>
                      <dd className="reg-reverse-text t-note">
                        {venture.reverse.notConfirmed}
                      </dd>
                    </div>
                    <div>
                      <dt className="reg-reverse-term t-mono-label">
                        Partner sought
                      </dt>
                      <dd className="reg-reverse-text t-note">
                        {venture.reverse.partnerSought}
                      </dd>
                    </div>
                  </dl>
                  <div className="reg-reverse-reviewed">
                    <p className="reg-reverse-term t-mono-label">
                      Status last reviewed
                    </p>
                    <p className="reg-reverse-date t-mono-label">
                      {venture.reverse.reviewedAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="groove" />
          </li>
        );
      })}
    </ul>
  );
}
