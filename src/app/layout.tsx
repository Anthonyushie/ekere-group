import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ekere Group",
  description: "Building with Purpose.",
};

// The iroko ground owns 100% of every surface. There is no light mode, so the
// browser chrome is told the one theme and nothing else. Most visitors arrive
// on a Nigerian mobile network, where the address bar is a visible part of the
// first viewport, so it carries the ground colour too.
//
// This is the one literal colour in the project outside tokens.css: a
// `theme-color` meta tag has to be a resolved colour and cannot read a CSS
// custom property. It mirrors --iroko and must be changed in lockstep with it.
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#15100C", // === --iroko
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG">
      <head>
        {/*
          The three latin faces are on the critical path for the first
          viewport, so they are preloaded from the project. The latin-ext
          subsets are not: they are fetched only if the page needs them.
        */}
        <link
          rel="preload"
          href="/fonts/big-shoulders-display-latin.woff2"
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
        <link
          rel="preload"
          href="/fonts/martian-mono-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* §2.5 — grain and vignette, both pointer-events: none. */}
        <div className="material" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
