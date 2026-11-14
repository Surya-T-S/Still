/**
 * THE DATA CONTRACT — owned by Sooraj.
 * artifacts.json is an object keyed by slug: { "<slug>": Artifact }.
 * Slugs MUST match story/chapters/<slug>.mdx and web/src/illustrations/<slug>.svg.
 * Change this file only with a heads-up to Surya & Vrindha (the app validates against it).
 */

export type Act = "moon" | "mars" | "deep";
export type Status = "silent" | "lost" | "still-used" | "drifting";

export interface Img {
  src: string;        // path relative to D/images/ or absolute https URL
  alt: string;        // descriptive, for screen readers
  credit: string;     // e.g. "NASA/JPL-Caltech"
  sourceUrl: string;  // where we got it
}

export interface Stat {
  label: string;        // "Distance driven"
  value: string;        // "45.16 km"
  comparison?: string;  // human-scale: "about 110 laps of a running track"
  sourceUrl: string;
}

export interface Artifact {
  slug: string;
  name: string;             // official name
  nickname?: string;        // what people call it
  act: Act;
  order: number;            // position inside its act (1-based)
  mission: string;
  nssdcaId: string;         // COSPAR ID used by NSSDCA, e.g. "2003-032A"
  nssdcaUrl: string;        // https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=<id>
  launchDate: string;       // ISO yyyy-mm-dd
  arrivalDate?: string;
  lastContact: string;      // drives the "silent for N days" ticker
  status: Status;
  location: {
    body: "Moon" | "Mars" | "Ceres" | "433 Eros" | "Heliocentric" | "Interstellar";
    site?: string;
    lat?: number;
    lon?: number;
  };
  distanceKm: number;       // from Earth (average, or build-time computed)
  lightTimeSec: number;     // one-way light time = distanceKm / 299792.458
  planned?: { value: number; unit: string };
  actual?: { value: number; unit: string };
  stats: Stat[];            // 3-5 max (only 3 shown at once)
  legacy: string;           // ONE fact-checked sentence: "Because of me, you know..."
  images: { then?: Img; now?: Img; lineArt: string };
  sources: string[];
  verified: boolean;        // B flips to true only after every claim is checked
}

export type ArtifactMap = Record<string, Artifact>;

export const LIGHT_SPEED_KM_S = 299792.458;
export const lightTime = (km: number) => km / LIGHT_SPEED_KM_S;
