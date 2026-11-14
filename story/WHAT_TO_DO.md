# Nandana — What To Do (`story/`)

Your job is to be the **Storyteller**: turn Sooraj's NASA facts into an emotional, unforgettable journey that anyone (especially ages 10–14) can feel and remember.

You don't need to write any code — you only edit text files in `story/chapters/`.

---

## What is already done for you
- [voice-guide.md](voice-guide.md) explains the tone, rules, and reading level.
- Starter `.mdx` files are already created in `story/chapters/` for all **13 missions** + `prologue.mdx`:
  - **Opening:** `prologue.mdx`
  - **Moon:** `apollo-lunar-modules.mdx`, `lunar-roving-vehicles.mdx`, `alsep.mdx`, `surveyor.mdx`
  - **Mars:** `sojourner.mdx`, `spirit-opportunity.mdx`, `viking.mdx`, `phoenix-insight.mdx`, `ingenuity.mdx`
  - **Deep Space:** `dawn.mdx`, `near-shoemaker.mdx`, `pioneer.mdx`, `kepler.mdx`

---

## Your Step-by-Step Checklist

### Step 1: Polish each chapter's story (`story/chapters/*.mdx`)
Open each `.mdx` file and rewrite/improve the 3 key parts at the top (between the `---` lines):

1. **`hook`** — *8 words or fewer.* The very first punchy line the visitor sees.
   - Example: `"They gave us ninety days."`
2. **`voice`** — *2 to 3 short lines.* Written in the spacecraft's imagined first-person voice.
   - Keep it **proud, warm, and human**—not overly sad. These machines did their job and more.
   - Use concrete pictures instead of heavy science words (*"I found where water ran"* instead of *"I discovered hydrological evidence"*).
3. **`legacyLine`** — *1 clear sentence.* Must match Sooraj's `legacy` sentence in `data/artifacts.json`.
   - Example: `"Because of Ingenuity, humanity proved powered flight is possible on another planet."`
4. **`truthNote`** *(optional)* — If there's a famous myth or fun clarification (like Opportunity's *"My battery is low"* line), add it here.

> **Optional short narration:** Below the second `---`, you can add 2–3 sentences of extra background story (keep it under **80 words** so the screen stays clean and uncluttered).

### Step 2: Write the `epilogue.mdx`
Create `story/chapters/epilogue.mdx` to close the journey:
- Tie the whole story back together: *"Abandoned is the wrong word. They're still here."*
- Write the prompt for the visitor's closing moment (e.g., *"Leave a one-line message for the silent fleet"*).

### Step 3: Read everything aloud & fact-check with Sooraj
- Read every line out loud. If a sentence feels long or clunky, split it or cut it in half.
- Send any numbers, dates, or science claims to **Sooraj** to verify against `data/artifacts.json`.

### Step 4: Preview your words live on the website
1. Open a terminal in the main folder (`d:\Nasa_Space_Apps_Challenge`).
2. Run `npm run dev` and open `http://localhost:4321`.
3. Every time you save an `.mdx` file, the website updates automatically so you can see how your words look on screen.

### Step 5: Prepare the 2-minute demo pitch (`story/pitch/`)
- Once the story is locked, write a short, clear script in `story/pitch/` for the hackathon submission video explaining:
  1. Why *"Abandoned but not Forgotten"* matters
  2. The **Signal Delay** hook as you scroll from Earth → Moon → Mars → Deep Space
  3. How every story is backed by real NASA/NSSDCA data
