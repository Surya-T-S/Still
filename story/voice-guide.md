# Voice Guide — owned by A (Storyteller)

## The two layers
| Layer | Who speaks | Rules |
|---|---|---|
| **The Voice** | The hardware, first person, *imagined* | 2–3 lines max. Short sentences. Calm, never sad-for-sad's-sake. Proud, patient, a little funny. |
| **The Record** | The narrator (data) | Lives in B's JSON. A never writes numbers that B hasn't checked. |

## Tone
- **Quiet pride, not tragedy.** These machines did their job and more.
- **Ages 10–14 reading level.** No jargon without an instant picture ("a sol is one Mars day — 40 minutes longer than ours").
- **Concrete over abstract.** "I found where water ran" beats "I discovered evidence of hydrological activity."
- **Every Voice ends looking forward or outward**, never just "and then I died."
- **Never invent dialogue for real people.** Real quotes only, with B's source.

## Frontmatter contract (`story/<slug>.mdx`)
```yaml
slug: string          # must match data/artifacts.json key
hook: string          # ≤ 8 words, the chapter's first line on screen
voice: string[]       # 2–3 lines, imagined first person
legacyLine: string    # ONE sentence — must match B's `legacy` after fact-check
truthNote?: string    # optional myth-busting line (e.g. Opportunity's "last words")
keepsake?: string     # only for the keepsakes chapter
```
Body (optional): ≤ 80 words of narration, shown at Depth 2.

## Cast & working hooks
| slug | hook (draft) |
|---|---|
| prologue | "None of it is forgotten." |
| surveyor-3 | "I was the first robot to have visitors." |
| eagle | "They left. I stayed to hold the mirror." |
| lrv-15 | "Parked. Keys still in the ignition." *(verify: LRV had no keys — rewrite)* |
| keepsakes | "Some things were left on purpose." |
| viking-1 | "I sent Earth its first postcard from Mars." *(verify)* |
| opportunity | "They gave me ninety days." |
| ingenuity | "Five flights, they said." |
| snoopy | "I was lost for fifty years." |
| pioneer-10 | "If you find me, I brought a note." |
| epilogue | "They're still here. Now, so are you." |
