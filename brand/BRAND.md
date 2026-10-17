# Python in 30 Days - Brand Guide

One identity across the app, README, docs and certificate: **Navy, Gold, Ivory**.

## Colour

| Token | Hex | Use |
|---|---|---|
| `--navy-950` | `#050E1F` | App background |
| `--navy-900` | `#081833` | Surfaces, cards |
| `--navy-850` | `#0B1F3F` | Primary brand navy (print, badges) |
| `--navy-700` | `#193762` | Secondary buttons |
| `--gold-300` | `#EBD596` | Highlights, gradient start |
| `--gold-400` | `#DDBE6B` | Icon accents, links, active state |
| `--gold-500` | `#C9A24B` | Primary brand gold |
| `--gold-600` | `#A8832F` | Gradient end, borders |
| `--ivory` | `#FAF5E9` | Text on navy, certificate paper |

All tokens live in `src/index.css`.

## Typography

- Display / headings: **Playfair Display** (700, 600, 400 italic)
- Interface: **Inter**
- Code: **JetBrains Mono**
- Certificate recipient name: **Pinyon Script**

All fonts are open source (SIL OFL) and self-hosted in `src/assets/fonts`.

## Logo

Shield monogram (`assets/brand/logo-mark.svg`, `src/components/BrandMark.tsx`): navy shield, gold hairline, gold "P" with a prompt cursor. Keep clear space equal to the cursor height. Do not recolour, rotate or add effects.

## Icons

- 24 px grid, 1.75 stroke, round caps and joins.
- Primary strokes use `currentColor`; one accent stroke per icon uses `--icon-accent` (gold).
- 30 lesson icons (`DAY_ICONS`) plus the UI set (`UI_ICONS`) in `src/components/icons/iconData.ts`.
- Use `<Icon name="download" />` and `<DayIcon day={7} />` / `<DayTile day={7} />`.
- README/docs use the pre-rendered tiles in `assets/icons/day-XX.svg`.
- No emoji anywhere in the product or docs.

## Buttons

`.btn--primary` gold gradient, navy text. `.btn--secondary` navy-700 with gold hover border. `.btn--ghost` outlined. Icons sit left of the label (right for forward arrows); focus ring is gold.
