"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Live measurement, read back out of the rendered page.

   The contrast figures in §2.1 are load-bearing and were measured, not
   estimated. Rather than reprinting them from the brief, /tokens measures
   the colours as the browser actually resolves them and prints what it
   finds next to what the brief claims. If the two ever diverge, the page
   says so instead of hiding it.

   The same applies to computed font sizes: §2.2 sets an 11px floor on all
   functional text, and §8 says to check it by querying the DOM, not by eye.
   ────────────────────────────────────────────────────────────────────── */

function channelToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]: RGB): number {
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

type RGB = [number, number, number];

function parseRgb(value: string): RGB | null {
  const found = value.match(/-?[\d.]+/g);
  if (!found || found.length < 3) return null;
  return [Number(found[0]), Number(found[1]), Number(found[2])];
}

function contrastRatio(a: RGB, b: RGB): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Resolve a custom property to an `rgb()` triple by letting the browser do it. */
function resolveColour(token: string): RGB | null {
  const probe = document.createElement("span");
  probe.style.cssText = `position:absolute;opacity:0;pointer-events:none;color:var(${token})`;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return parseRgb(resolved);
}

export type InkRow = {
  /** The token under test, e.g. `--ash`. */
  token: string;
  /** The token it is measured against, e.g. `--iroko`. */
  against: string;
  /** The figure §2.1 states, or null where the brief states none. */
  stated: number | null;
};

export function ContrastTable({ rows }: { rows: InkRow[] }) {
  const [measured, setMeasured] = useState<
    { row: InkRow; hex: string; ratio: number }[] | null
  >(null);

  useEffect(() => {
    // Read on the next tick, so the browser has resolved every custom
    // property we are about to probe. A timeout rather than a rAF: rAF never
    // fires in a hidden tab, and the sheet must measure itself even when it
    // is opened in a background tab.
    const t = setTimeout(() => {
      setMeasured(
        rows.map((row) => {
          const ink = resolveColour(row.token);
          const ground = resolveColour(row.against);
          const hex = ink
            ? "#" +
              ink
                .map((c) => c.toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase()
            : "—";
          return {
            row,
            hex,
            ratio: ink && ground ? contrastRatio(ink, ground) : 0,
          };
        }),
      );
    });
    return () => clearTimeout(t);
  }, [rows]);

  return (
    <div className="measure-table" role="table" aria-label="Measured contrast">
      <div className="measure-head" role="row">
        <span role="columnheader">Token</span>
        <span role="columnheader">Resolved</span>
        <span role="columnheader">Against</span>
        <span role="columnheader">Measured</span>
        <span role="columnheader">§2.1 states</span>
        <span role="columnheader">AA body</span>
      </div>

      {(measured ?? rows.map((row) => ({ row, hex: "…", ratio: 0 }))).map(
        ({ row, hex, ratio }) => {
          const shown = measured ? ratio.toFixed(2) : "…";
          const agrees =
            row.stated === null || !measured
              ? null
              : Math.abs(ratio - row.stated) < 0.06;
          return (
            <div
              className="measure-row"
              role="row"
              key={`${row.token}-on-${row.against}`}
            >
              <span role="cell" style={{ color: `var(${row.token})` }}>
                {row.token}
              </span>
              <span role="cell">{hex}</span>
              <span role="cell">{row.against}</span>
              <span role="cell" className="t-tabular">
                {shown}:1
              </span>
              <span role="cell" className="t-tabular">
                {row.stated === null
                  ? "not stated"
                  : `${row.stated.toFixed(1)}:1`}
                {agrees === false ? " · DIVERGES" : ""}
              </span>
              <span
                role="cell"
                style={{
                  color: !measured
                    ? "var(--ash)"
                    : ratio >= 4.5
                      ? "var(--brass)"
                      : "var(--oxblood-ink)",
                }}
              >
                {!measured ? "…" : ratio >= 4.5 ? "pass" : "FAIL"}
              </span>
            </div>
          );
        },
      )}
    </div>
  );
}

/** Reports the smallest computed font size rendered anywhere in the page. */
export function TypeFloorAudit() {
  const [result, setResult] = useState<{
    min: number;
    offenders: string[];
  } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const floor = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--text-floor",
        ),
      );
      let min = Infinity;
      const offenders: string[] = [];

      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        // Only elements that actually render text of their own.
        const ownText = Array.from(el.childNodes).some(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
        );
        if (!ownText) return;
        if (el.closest("[data-smallprint]")) return;

        const size = parseFloat(getComputedStyle(el).fontSize);
        if (!Number.isFinite(size)) return;
        if (size < min) min = size;
        if (size < floor) {
          offenders.push(
            `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).split(" ")[0] : ""} @ ${size}px`,
          );
        }
      });

      setResult({ min: min === Infinity ? 0 : min, offenders });
    });
    return () => clearTimeout(t);
  }, []);

  if (!result) {
    return <p className="t-mono-meta">Measuring…</p>;
  }

  return (
    <div>
      <p className="t-mono-meta t-tabular">
        Smallest computed functional text on this page: {result.min}px · floor
        11px
      </p>
      <p
        className="t-mono-meta"
        style={{
          color:
            result.offenders.length === 0
              ? "var(--brass)"
              : "var(--oxblood-ink)",
        }}
      >
        {result.offenders.length === 0
          ? "No functional text below the floor."
          : `Below floor: ${result.offenders.join(" · ")}`}
      </p>
    </div>
  );
}

/**
 * Prints a colour token's value as the browser resolves it, rather than as a
 * literal copied into the page. Keeps the spec sheet honest: if a token in
 * tokens.css changes, the sheet changes with it and cannot drift.
 */
export function TokenValue({ token }: { token: string }) {
  const [value, setValue] = useState("…");

  useEffect(() => {
    const t = setTimeout(() => {
      const rgb = resolveColour(token);
      const probe = document.createElement("span");
      probe.style.cssText = `position:absolute;opacity:0;pointer-events:none;color:var(${token})`;
      document.body.appendChild(probe);
      const raw = getComputedStyle(probe).color;
      probe.remove();
      // Opaque colours read better as hex; anything with alpha stays rgba.
      const opaque = !/rgba?\([^)]*,\s*(0?\.\d+|0)\s*\)/.test(raw);
      setValue(
        rgb && opaque
          ? "#" +
              rgb
                .map((c) => c.toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase()
          : raw,
      );
    });
    return () => clearTimeout(t);
  }, [token]);

  return <>{value}</>;
}

/** Prints the live computed value of a clamp()-ed token at this viewport. */
export function ComputedClamp({ token }: { token: string }) {
  const [value, setValue] = useState<string>("…");

  useEffect(() => {
    const read = () => {
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;opacity:0;pointer-events:none;width:var(${token})`;
      document.body.appendChild(probe);
      setValue(getComputedStyle(probe).width);
      probe.remove();
    };
    const t = setTimeout(read, 0);
    window.addEventListener("resize", read);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", read);
    };
  }, [token]);

  return (
    <span className="t-tabular" style={{ color: "var(--bark)" }}>
      {value}
    </span>
  );
}
