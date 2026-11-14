# web/ · Surya & Vrindha (Website UI, Motion & Platform)

**Mission:** build an ultra-clean, minimal, buttery-smooth Astro site that brings Nandana's story and Sooraj's data to life.

## You own
- Visual design, design tokens (`src/tokens/tokens.css`), and SVG line-art (`src/illustrations/`)
- UI components (`ChapterHero`, `VoiceBlock`, `RecordCard`, `CitationChip`, `SignalHUD`, `Starfield`)
- Motion vocabulary (`src/motion/index.ts`) and the scroll engine (`src/scripts/engine.ts`)
- Lightweight interactive moments (`src/interactions/`: Ping the Moon, Sol Odometer, Flight Counter, Send a Message, Then/Now slider)
- Astro app, content validation (`src/content.config.ts`), Epilogue postcard, Archive view, performance, accessibility, and deploy

## Folder layout
```
web/
├── astro.config.mjs          aliases @story → ../story/chapters, @data → ../data
├── package.json
└── src/
    ├── tokens/tokens.css     colours, type, spacing, motion timings, act accents
    ├── motion/index.ts       the ONLY animation helpers the site uses (transform + opacity only)
    ├── illustrations/        <slug>.svg line-art (auto-registered by index.ts)
    ├── components/           ChapterHero, VoiceBlock, RecordCard, CitationChip, SignalHUD, Starfield
    ├── interactions/         one .astro per interactive moment
    ├── layouts/Base.astro
    ├── pages/index.astro     the whole journey
    ├── scripts/engine.ts     Lenis + GSAP ScrollTrigger engine
    ├── styles/global.css
    └── content.config.ts     schemas for Nandana's story + Sooraj's data
```

## Rules
- Keep it simple and clean — no audio/sound effects or heavy 3D.
- Animate **only `transform` and `opacity`**. Every effect has a `prefers-reduced-motion` fallback.
- SVGs: 1.25px stroke, `stroke="currentColor"`, < 15 KB, with a `<title>`.
- Budgets: Lighthouse ≥ 95 · LCP < 2 s · CLS < 0.05 · JS < 120 KB gzip · 60 fps on a mid-range Android phone.
