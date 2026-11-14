# `web/` Work Split — Vrindha & Surya

**Goal:** Build an ultra-minimal, astrophile-grade storytelling experience where **Navigation**, **Reading Experience**, and **Buttery-Smooth Animations** are the stars — while both developers work **concurrently with zero merge conflicts**.

---

## The Concurrency Rule: Exclusive File Ownership
Never edit a file owned by the other person. Communicate only through **HTML `data-*` attributes** and **Astro component props**.

| Member | Role | Owns | Focus |
|---|---|---|---|
| **Vrindha** | **Platform & Structure** | Data wiring, page shell, scroll engine, telemetry HUD, deploy | HTML skeleton, image loading (`data/images/`), `SignalHUD`, `RecordCard`, `CitationChip`, `engine.ts`, Epilogue/Archive, deploy |
| **Surya** | **Experience, Navigation & Motion** | UI aesthetic, navigation, reading experience, animations & interactions | Visual tokens, `TrajectoryNav`, `ChapterHero`, `VoiceBlock`, `Starfield`, GSAP motion choreography, 13 SVGs, `ThenNowSlider` & interactions |

---

## 1. Vrindha — Platform & Structure

### Exclusive Files
- `web/astro.config.mjs` & `web/src/content.config.ts`
- `web/src/layouts/Base.astro`
- `web/src/pages/index.astro`
- `web/src/scripts/engine.ts`
- `web/src/components/SignalHUD.astro`
- `web/src/components/RecordCard.astro`
- `web/src/components/CitationChip.astro`

### Vrindha's Checklist
1. **Wire Sooraj's 22 NASA images (`data/images/`):**
   - Expose `data/images/` cleanly to `web/` (e.g., via Vite asset import or symlink/copy to `public/images/`) so `images.then.src` and `images.now.src` load with zero broken paths.
2. **Structure `index.astro` for all 3 Acts + Epilogue:**
   - Render `Prologue` → `Act I: The Moon` → `Act II: Mars` → `Act III: Deep Space` → `Epilogue` (`story/chapters/epilogue.mdx`) → `Archive`.
   - Expose clean `data-*` attributes on every section (`data-chapter`, `data-act`, `data-label`, `data-distance`, `data-light`) so Surya's navigation and animations hook in automatically.
   - Pass `images.then` and `images.now` into Surya's `ThenNowSlider` when present.
3. **Signal HUD & Record Cards:**
   - Keep `SignalHUD.astro` crisp, tabular-nums, and responsive on mobile.
   - Ensure `RecordCard.astro` + `CitationChip.astro` clearly display Sooraj's 3 stats, "silent for N days" ticker, and NSSDCA link.
4. **Core Engine (`engine.ts`) & Deploy:**
   - Keep Lenis + GSAP ScrollTrigger synced on one ticker, export a clean `scrollToChapter(id)` helper for Surya's navigation, and handle final `npm run build:strict` + hosting deploy.

---

## 2. Surya — Experience, Navigation & Motion

### Exclusive Files
- `web/src/tokens/tokens.css` & `web/src/styles/global.css`
- `web/src/motion/index.ts`
- `web/src/components/Starfield.astro`
- `web/src/components/TrajectoryNav.astro` *(new — unique navigation)*
- `web/src/components/ActDivider.astro` *(new — smooth act transitions)*
- `web/src/components/ChapterHero.astro`
- `web/src/components/VoiceBlock.astro`
- `web/src/illustrations/*.svg` (13 spacecraft line-arts)
- `web/src/interactions/` (`ThenNowSlider.astro`, `PingTheMoon.astro`, `SolOdometer.astro`, `FlightCounter.astro`, `SendAMessage.astro`)

### Surya's Checklist (Prioritized)
1. **Unique Astrophile Navigation (`TrajectoryNav.astro`):**
   - Replace standard navbars with a **minimal vertical orbital/trajectory rail** fixed to the side: Earth → Moon → Mars → Deep Space.
   - Shows distance scale ticks, glowing active dot, hover/focus mission name tooltip, and smooth scroll jump on click (using `data-chapter` elements).
   - Collapses cleanly to a minimal bottom/top progress pill on mobile.
2. **Reading Experience & Minimalist UI (`tokens.css`, `global.css`, `VoiceBlock.astro`, `ChapterHero.astro`):**
   - "Observatory at Night" aesthetic: deep `#0a0a0b` canvas, subtle act-tinted radial glow (`--c-moon` `#d9d3c3`, `--c-mars` `#c2502a`, `--c-deep` `#7fa2ff`), generous whitespace, and a strict `55ch–60ch` reading measure.
   - Make the contrast between **The Voice** (italic serif, emotional) and **The Record** (crisp monospace, factual) feel effortless and editorial.
3. **Buttery-Smooth Animations & Transitions (`motion/index.ts`, `Starfield.astro`, `ActDivider.astro`):**
   - Animate **only `transform` and `opacity`** (60 fps).
   - Scrubbed SVG line-art draw-on, gentle line-by-line poetic text reveals, smooth act-to-act background/accent transitions, and subtle starfield depth shift as you travel further from Earth.
   - Every animation has a `prefers-reduced-motion` fallback.
4. **13 Spacecraft Line-Art SVGs (`illustrations/<slug>.svg`):**
   - Clean `1.25px` single-weight `currentColor` SVGs (< 15 KB each) matching the 13 slugs in `data/artifacts.json`.
5. **Interactive Proof & Signature Moments (`interactions/`):**
   - **`ThenNowSlider.astro`** *(highest priority — Sooraj already sourced 22 real NASA images!)*: smooth drag/keyboard before-and-after photo reveal, desaturated by default and revealing full NASA color on interaction.
   - **`PingTheMoon.astro`** (ALSEP / Lunar Modules), **`SolOdometer.astro`** (Spirit & Opportunity), **`FlightCounter.astro`** (Ingenuity), **`SendAMessage.astro`** (Pioneer).

---

## How They Sync Without Blocking Each Other
1. **Kickoff:** Vrindha updates `index.astro` + image wiring so all 13 chapters + 22 images are in the DOM. Surya builds `TrajectoryNav` and `tokens.css` against the existing DOM.
2. **Sync 1:** Vrindha drops `<TrajectoryNav />`, `<ActDivider />`, and `<ThenNowSlider />` tags into `index.astro` (matching Surya's prop names).
3. **Sync 2:** Full scroll-through together on desktop + mid-range phone to tune Lenis inertia, ScrollTrigger timings, and reading pacing.
