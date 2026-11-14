# data/ · Sooraj (Data Researcher & Fact Guardian)

**Mission:** make every number on the site true and traceable to NASA. You own *what is real*.

## You own
- Research in the NSSDCA Master Catalog and official NASA mission pages (`sources.md` has all 13 links)
- `artifacts.json`: one entry per mission
- `schema.ts`: the data contract (tell Surya & Vrindha before changing it)
- `images/`: finding mission photos + orbital "now" photos (LROC / HiRISE), optimising them, crediting them
- Light-time and distance calculations
- Fact-checking Nandana's story text, and flipping `verified: true`

## Folder layout
```
data/
├── schema.ts             the Artifact contract (TypeScript type)
├── artifacts.json        { "<slug>": Artifact }
├── images/               optimised .avif/.webp, named <slug>-then / <slug>-now
└── sources.md            all 13 NASA mission links + research tracker
```

## How you work (no coding needed, just JSON)
1. Copy the `opportunity` entry in `artifacts.json`, change the key and fields.
2. Every stat needs a `sourceUrl`. Fill the tracker in `sources.md`.
3. Run the site (`npm run dev` at repo root). If your JSON is malformed, the terminal tells you which field is wrong.
4. `npm run build:strict` fails while any entry is `verified: false`. That's your final checklist.

**Who depends on you:** Nandana (facts to write around), Surya & Vrindha (numbers for interactions and rendering).
