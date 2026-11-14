# Sooraj — What To Do (`data/`)

Your job is to be the **Fact Guardian**: make sure every number, date, location, and NASA photo on the website is 100% real and linked to an official NASA source.

---

## What is already done for you
- All **13 missions** are already added as starter entries in [artifacts.json](artifacts.json) using your 13 NASA/NSSDCA links.
- [sources.md](sources.md) has the tracking table for all 13 missions.
- [schema.ts](schema.ts) defines the exact fields each entry needs.

---

## Your Step-by-Step Checklist

### Step 1: Double-check the numbers in `artifacts.json`
Open [artifacts.json](artifacts.json) and verify each of the 13 missions against its official NASA/NSSDCA link:
- **Moon:** `apollo-lunar-modules`, `lunar-roving-vehicles`, `alsep`, `surveyor`
- **Mars:** `sojourner`, `spirit-opportunity`, `viking`, `phoenix-insight`, `ingenuity`
- **Deep Space:** `dawn`, `near-shoemaker`, `pioneer`, `kepler`

Check:
1. `launchDate`, `arrivalDate`, `lastContact` (format: `YYYY-MM-DD`)
2. `stats` (3 clear stats per mission, each with a kid-friendly `comparison` like *"longer than a marathon"* and an official `sourceUrl`)
3. `legacy` (one clear sentence: *"Because of [mission], we know..."*)
4. `distanceKm` and `lightTimeSec` (`distanceKm / 299792.458`)

### Step 2: Find "Then & Now" NASA images
For as many missions as possible (especially Moon & Mars):
1. Find **2 real NASA photos** per mission:
   - **Then:** a mission photo from when it was active (from [images.nasa.gov](https://images.nasa.gov))
   - **Now:** an orbital photo showing the hardware or tracks still resting there today (from [LROC](https://www.lroc.asu.edu) for the Moon, or [HiRISE](https://www.uahirise.org) for Mars)
2. Save them in `data/images/` as `<slug>-then.webp` (or `.jpg`) and `<slug>-now.webp` (keep files lightweight, under ~300 KB each).
3. **Important NASA rule:** Do **not** use the NASA meatball logo anywhere. Always include image `credit` (e.g., `"NASA/JPL-Caltech/Univ. of Arizona"`).
4. Add the `then` and `now` image objects inside `images` in `artifacts.json`:
   ```json
   "images": {
     "lineArt": "ingenuity.svg",
     "then": {
       "src": "../data/images/ingenuity-then.webp",
       "alt": "Ingenuity helicopter hovering above Jezero Crater on Mars",
       "credit": "NASA/JPL-Caltech",
       "sourceUrl": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
     },
     "now": {
       "src": "../data/images/ingenuity-now.webp",
       "alt": "Ingenuity resting on the Martian surface after its final flight",
       "credit": "NASA/JPL-Caltech",
       "sourceUrl": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
     }
   }
   ```

### Step 3: Fact-check Nandana's story
- Read Nandana's files in `../story/chapters/*.mdx`.
- Make sure any dates, counts, or science claims in her story match `artifacts.json`.
- If a myth needs clearing up (like Opportunity's *"My battery is low"* quote), help her write the `truthNote`.

### Step 4: Tick off `sources.md` & run the strict check
1. Update the checkboxes in [sources.md](sources.md) as you finish each mission.
2. When you're confident an entry is 100% accurate, make sure `"verified": true` is set in `artifacts.json`.
3. Run `npm run build:strict` from the main project folder — if there are any typos, missing fields, or unverified entries, it will tell you immediately.
