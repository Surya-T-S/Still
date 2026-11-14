# story/ · Nandana (Storyteller)

**Mission:** turn Sooraj's facts into a journey anyone can feel and remember. You own *how it feels*.

## You own
- The story arc (Prologue → Moon → Mars → Deep Space → Epilogue)
- Every word the visitor reads: hooks, the spacecraft's written first-person lines, Legacy lines, myth checks
- Reading level (ages 10–14), tone, pacing (one idea per screen)
- Demo pitch & presentation text (no audio/voice-over on the site)

## Folder layout
```
story/
├── voice-guide.md        tone rules + frontmatter contract
├── chapters/
│   ├── prologue.mdx
│   ├── <slug>.mdx        one per mission (slug = same as Sooraj's data/artifacts.json key)
│   └── epilogue.mdx
└── pitch/                pitch notes (add as you go)
```

## How you work (no coding needed)
1. Copy `chapters/opportunity.mdx`, rename it to match Sooraj's slug (see `data/sources.md`), and write the text.
2. Run the site (`npm run dev` at repo root). Your words appear live at http://localhost:4321.
3. Any fact or number goes to **Sooraj** for checking before it ships.
4. Ask **Surya & Vrindha** if a line needs a visual moment (e.g. "the screen should go dark here").

**You depend on:** Sooraj for facts. **Who depends on you:** Surya & Vrindha (design and render your text).
