/* ──────────────────────────────────────────────────────────────────────────
   The three declared ventures, as data.

   BUILD-BRIEF.md §6.1: "Every venture carries its real stage. The status is
   a data field on the venture record, rendered into the slot. It is never
   prose." So the record carries a `stage`, the stage table below carries its
   label and its slot variant, and no surface writes a status by hand.

   §3.2 needs to know which venture the group moved on most recently, and it
   has to learn that from the data rather than from a hardcoded class, so the
   page stays true as the company changes. That is `lastMovedAt`.

   Nothing here is invented. The names, notes and statuses are the approved
   copy from the first-viewport comp; the reverse faces (§3.3) say only what
   PRODUCT.md records, and where a fact is missing it renders as an explicit
   [VERIFY: …] placeholder per §6.5 rather than as plausible filler.
   ────────────────────────────────────────────────────────────────────── */

/** The three real stages. There is no fourth, and no venture is unstaged. */
export type VentureStage = "live" | "dev" | "open";

type StageSpec = {
  /** The label rendered into the status slot. §6.1: a field, not prose. */
  readonly label: string;
  /** The §2.6 status-slot variant that carries this stage. */
  readonly slot: string;
};

export const VENTURE_STAGES: Record<VentureStage, StageSpec> = {
  live: { label: "Active initiative", slot: "slot--live" },
  dev: { label: "In development", slot: "slot--dev" },
  open: { label: "Not yet begun", slot: "slot--open" },
};

/**
 * The reverse face, §3.3: a promise never travels without its fine print.
 * Every register's reverse holds what is confirmed, what is not, what
 * partner is being sought, and when the status was last reviewed.
 */
export type VentureReverse = {
  readonly confirmed: string;
  readonly notConfirmed: string;
  readonly partnerSought: string;
  /** A date the group has to supply. Until it does, it reads as a placeholder. */
  readonly reviewedAt: string;
};

export type Venture = {
  readonly id: string;
  readonly name: string;
  readonly note: string;
  readonly stage: VentureStage;
  /**
   * ISO date the group last moved on this venture. Drives §3.2 — the one
   * register that carries the ink wash and the lifted name is computed from
   * these, never marked by hand.
   *
   * [VERIFY] These three dates are unverified. They are never rendered: they
   * exist only to order the three ventures by recency, and the order they
   * express — community education most recently, waste-to-energy least — is
   * the order PRODUCT.md records, where community education is "the priority
   * initiative" and waste-to-energy is an ambition with nothing built. When
   * the group confirms real dates, replace them here and the wash follows.
   */
  readonly lastMovedAt: string;
  readonly reverse: VentureReverse;
};

const REVIEWED_AT_UNKNOWN = "[VERIFY: date this status was last reviewed]";

export const VENTURES: readonly Venture[] = [
  {
    id: "community-education",
    name: "Community Education",
    note: "School outreach on drug abuse and the brain. Sessions in preparation with schools in Port Harcourt.",
    stage: "live",
    lastMovedAt: "2026-10-01",
    reverse: {
      confirmed:
        "A school programme on the effects of drug abuse on the brain and the value of informed decisions. It is the group's priority initiative.",
      notConfirmed:
        "No session has been delivered yet, and no school is named here until that school has agreed to be named.",
      partnerSought:
        "Schools in Port Harcourt willing to host a session, and educators to review the material before it is taught.",
      reviewedAt: REVIEWED_AT_UNKNOWN,
    },
  },
  {
    id: "property-development",
    name: "Property & Development",
    note: "Property improvement and long-term development. Opportunities under assessment.",
    stage: "dev",
    lastMovedAt: "2026-06-01",
    reverse: {
      confirmed:
        "Property improvement, renovation and long-term development is a current business interest of the group.",
      notConfirmed:
        "No site, project or completed development is published here, and no figure, valuation or return is held out.",
      partnerSought:
        "Joint-venture property partners in Rivers State, and lenders who work at this stage.",
      reviewedAt: REVIEWED_AT_UNKNOWN,
    },
  },
  {
    id: "waste-to-energy",
    name: "Waste to Energy",
    note: "A waste-management and waste-to-energy ambition for Port Harcourt. No facility exists. Seeking technical partners.",
    stage: "open",
    lastMovedAt: "2026-01-01",
    reverse: {
      confirmed:
        "A long-term vision for improved waste management and waste-to-energy in Port Harcourt. It is an ambition, and the group states it as one.",
      notConfirmed:
        "No facility exists. No licence is held, no site is secured, and no capacity, cost or timeline is claimed.",
      partnerSought:
        "Technical partners with waste-to-energy experience, and development finance prepared to assess a project at this stage.",
      reviewedAt: REVIEWED_AT_UNKNOWN,
    },
  },
];

/**
 * §3.2, recency in ink density: exactly one register carries the deepest ink
 * and the brightest name, and it is the one the group last moved on. Computed
 * from `lastMovedAt` so it stays true when the dates change. Ties go to the
 * earlier record, so there is never more than one washed register.
 */
export function mostRecentlyMovedId(
  ventures: readonly Venture[],
): string | undefined {
  let recent: Venture | undefined;
  for (const venture of ventures) {
    if (!recent || venture.lastMovedAt > recent.lastMovedAt) recent = venture;
  }
  return recent?.id;
}
