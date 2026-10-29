# Self-hosted faces

Two families, both under the SIL Open Font License 1.1, served from this
directory as woff2. There is no hosted Google Fonts stylesheet anywhere in this
project: it is a third-party request on the critical path, and this site has to
be fast on a Nigerian mobile connection (BUILD-BRIEF.md §2.2). The stylesheet
host is deliberately not written anywhere in this repository; the binaries'
provenance below names the static host they were fetched from once, at
build-setup time.

Each family upstream is a single variable font, so one file per subset covers
every weight the site uses. The `@font-face` weight ranges in
`src/styles/fonts.css` are clamped to exactly those weights.

| File | Family | Weights | Subset |
|---|---|---|---|
| `space-grotesk-latin.woff2` | Space Grotesk | 300–700 | latin |
| `space-grotesk-latin-ext.woff2` | Space Grotesk | 300–700 | latin-ext |
| `archivo-latin.woff2` | Archivo | 400–600 | latin |
| `archivo-latin-ext.woff2` | Archivo | 400–600 | latin-ext |

Space Grotesk carries every piece of display type, the navigation and the
labels. Archivo carries prose only.

Vietnamese and Cyrillic subsets are deliberately not shipped.

## Provenance

Fetched from `fonts.gstatic.com`, the static font host Google Fonts serves
binaries from. The fetch happened once, at build-setup time; the shipped site
never contacts Google.

- Space Grotesk — v22, https://fonts.google.com/specimen/Space+Grotesk
- Archivo — v25, https://fonts.google.com/specimen/Archivo

## Licence

Both are licensed under the SIL Open Font License, Version 1.1, which permits
self-hosting, bundling and redistribution. See `OFL.txt` for the licence text.
