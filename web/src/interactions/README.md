# Signature Interactions (owned by Surya)

All 5 interactive moments are built, self-contained, keyboard-accessible, and `prefers-reduced-motion` safe.
Vrindha can drop them directly into `web/src/pages/index.astro`:

| Component | Where to use | Props |
|---|---|---|
| `ThenNowSlider.astro` | Any artifact with `images.then && images.now` | `thenImg={a.images.then}`, `nowImg={a.images.now}`, `title={a.nickname ?? a.name}` |
| `PingTheMoon.astro` | `alsep` (or `apollo-lunar-modules`) | `lightTimeSec={a.lightTimeSec}` |
| `SolOdometer.astro` | `spirit-opportunity` | `planned={a.planned?.value}`, `actual={a.actual?.value}`, `unit={a.actual?.unit}` |
| `FlightCounter.astro` | `ingenuity` | `planned={a.planned?.value}`, `actual={a.actual?.value}` |
| `SendAMessage.astro` | `pioneer` | `lightTimeSec={a.lightTimeSec}`, `targetName={a.nickname ?? a.name}` |

## Navigation & Act Dividers (also ready for `Base.astro` / `index.astro`)
- `TrajectoryNav.astro` — drop `<TrajectoryNav />` once inside `Base.astro` (auto-reads `[data-chapter]`).
- `ActDivider.astro` — drop once before each act (`act`, `roman`, `title`, `subtitle`, `distanceNote`).
