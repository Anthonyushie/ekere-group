# Self-hosted faces

Three families, all under the SIL Open Font License 1.1, served from this
directory as woff2. There is no hosted Google Fonts stylesheet anywhere in this
project: it is a third-party request on the critical path, and this site has to
be fast on a Nigerian mobile connection (BUILD-BRIEF.md §2.2). The stylesheet
host is deliberately not written anywhere in this repository, so a grep for it
stays clean; the binaries' provenance below names the static host they were
fetched from once, at build-setup time.

Each family upstream is now a single variable font, so one file per subset
covers every weight the brief asks for. The `@font-face` weight ranges in
`src/styles/fonts.css` are clamped to exactly those weights.

| File | Family | Weights | Subset |
|---|---|---|---|
| `big-shoulders-display-latin.woff2` | Big Shoulders Display | 500–900 | latin |
| `big-shoulders-display-latin-ext.woff2` | Big Shoulders Display | 500–900 | latin-ext |
| `archivo-latin.woff2` | Archivo | 400–600 | latin |
| `archivo-latin-ext.woff2` | Archivo | 400–600 | latin-ext |
| `martian-mono-latin.woff2` | Martian Mono | 400–600 | latin |
| `martian-mono-latin-ext.woff2` | Martian Mono | 400–600 | latin-ext |

Vietnamese and Cyrillic subsets are deliberately not shipped.

## Provenance

Fetched 2026-10-29 from `fonts.gstatic.com`, the static font host Google Fonts
serves binaries from. The fetch happened once, at build-setup time; the shipped
site never contacts Google.

- Big Shoulders Display — v24, https://fonts.google.com/specimen/Big+Shoulders+Display
- Archivo — v25, https://fonts.google.com/specimen/Archivo
- Martian Mono — v6, https://fonts.google.com/specimen/Martian+Mono

## Licence

All three are licensed under the SIL Open Font License, Version 1.1, which
permits self-hosting, bundling and redistribution. See `OFL.txt` for the
licence text.
