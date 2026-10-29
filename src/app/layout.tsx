import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ekere Group — Building with Purpose",
  description:
    "A corporate group in Port Harcourt, Rivers State, building in property, environmental innovation and community education — and saying plainly which of the three is operating today.",
};

// The site is light-only: one warm-grey canvas, everywhere. The browser
// chrome is told the same colour so the address bar does not cut a dark
// band across the first viewport on a phone, which is where most visitors
// arrive.
//
// This is the one literal colour outside tokens.css: a `theme-color` meta
// tag has to be a resolved colour and cannot read a custom property. It
// mirrors --canvas and must change in lockstep with it.
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#eeeeee", // === --canvas
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG">
      <head>
        {/*
          The two latin faces are on the critical path for the first
          viewport, so they are preloaded from the project. The latin-ext
          subsets are not: they are fetched only if the page needs them.
        */}
        <link
          rel="preload"
          href="/fonts/space-grotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/archivo-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/*
          Marks the document for motion before the first paint, so the
          entrance animations never flash their finished state first.

          It runs only when the reader has not asked for reduced motion, and
          it is the ONLY thing that turns motion on: every animated rule in
          motion.css is nested under this mark. If this script does not run —
          scripting off, an error above it, an engine that chokes on
          matchMedia — the page renders finished and still, rather than
          waiting invisibly for an observer that will never fire.
        */}
      </head>
      <body>{children}</body>
    </html>
  );
}
