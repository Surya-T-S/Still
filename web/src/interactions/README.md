# Signature interactions (owned by C)

One self-contained `.astro` component per interaction. Each one:
- receives its numbers **as props from B's data** (never hard-coded),
- works with keyboard only,
- has a `prefers-reduced-motion` fallback.

| File | Act | Props (from `data/artifacts.json`) |
|---|---|---|
| `PingTheMoon.astro` | Moon · Eagle | `lightTimeSec` (round trip = ×2), `recessionCmPerYear` |
| `SolOdometer.astro` | Mars · Opportunity | `planned`, `actual`, `lastContact` |
| `FlightCounter.astro` | Mars · Ingenuity | `planned`, `actual` |
| `SendAMessage.astro` | Deep · Pioneer 10 | `lightTimeSec` |
| `ThenNowSlider.astro` | any | `images.then`, `images.now` |
