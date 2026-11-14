# STILL — NASA Space Apps 2026 · *Abandoned but not Forgotten*

Read **[MASTER_PLAN.md](MASTER_PLAN.md)** first.

| Folder | Owner(s) | Role | Writes |
|---|---|---|---|
| `story/` | **Nandana** | Storyteller | `story/chapters/<slug>.mdx`, `story/voice-guide.md` |
| `data/` | **Sooraj** | Data & Fact Guardian | `data/schema.ts`, `data/artifacts.json`, `data/images/`, `data/sources.md` |
| `web/` | **Surya & Vrindha** | Website UI, Motion & Platform | `web/src/` (Astro app, components, tokens, SVGs, scroll engine, deploy) |

**Rule: only write inside your own folder.** The Astro app in `web/` reads `story/` and `data/` directly.

## Run the site
```bash
npm install
npm run dev            # http://localhost:4321, live-reloads when anyone's files change
npm run build          # static build in web/dist
npm run build:strict   # final build, fails if any artifact has verified: false
```

## Adding a character (e.g. `viking`)
1. **Sooraj** adds `"viking": { ... }` to `data/artifacts.json` (shape: `data/schema.ts`).
2. **Nandana** adds `story/chapters/viking.mdx` (frontmatter: see `story/voice-guide.md`).
3. **Surya & Vrindha** add `web/src/illustrations/viking.svg`.
4. The chapter appears on the site automatically, in act order.
