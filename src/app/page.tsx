import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────
   Stage 0 placeholder.

   The home page is Stage 1 and is built against the approved first viewport
   at .impeccable/mocks/decision/assigned.html. Nothing of the site is built
   yet; this route exists only so the scaffold has no create-next-app
   boilerplate sitting in it, and it says exactly that.
   ────────────────────────────────────────────────────────────────────── */

export default function Placeholder() {
  return (
    <main className="sheet" style={{ paddingBlock: "var(--space-96)" }}>
      <h1 className="t-mark">
        Ekere<span style={{ color: "var(--brass)" }}>·</span>Group
      </h1>
      <div className="groove" style={{ marginBlock: "var(--space-48)" }} />
      <p className="t-standfirst">
        Stage 0 of the build is complete: the design tokens and component
        primitives exist, and nothing of the site does yet.
      </p>
      <p className="t-mono-label" style={{ marginTop: "var(--space-48)" }}>
        <Link href="/tokens">Open the token sheet</Link>
      </p>
    </main>
  );
}
