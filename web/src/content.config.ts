import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

/** Nandana's story files: story/chapters/<slug>.mdx */
const story = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "../story/chapters" }),
  schema: z.object({
    slug: z.string(),
    hook: z.string(),
    voice: z.array(z.string()).min(1).max(4),
    legacyLine: z.string(),
    truthNote: z.string().optional(),
    keepsake: z.string().optional(),
  }),
});

/** Sooraj's data: data/artifacts.json, an object keyed by slug. Mirrors data/schema.ts. */
const img = z.object({ src: z.string(), alt: z.string(), credit: z.string(), sourceUrl: z.string() });
const artifacts = defineCollection({
  loader: file("../data/artifacts.json"),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    nickname: z.string().optional(),
    act: z.enum(["moon", "mars", "deep"]),
    order: z.number(),
    mission: z.string(),
    nssdcaId: z.string(),
    nssdcaUrl: z.string().url(),
    launchDate: z.string(),
    arrivalDate: z.string().optional(),
    lastContact: z.string(),
    status: z.enum(["silent", "lost", "still-used", "drifting"]),
    location: z.object({
      body: z.enum(["Moon", "Mars", "Ceres", "433 Eros", "Heliocentric", "Interstellar"]),
      site: z.string().optional(),
      lat: z.number().optional(),
      lon: z.number().optional(),
    }),
    distanceKm: z.number(),
    lightTimeSec: z.number(),
    planned: z.object({ value: z.number(), unit: z.string() }).optional(),
    actual: z.object({ value: z.number(), unit: z.string() }).optional(),
    stats: z.array(z.object({
      label: z.string(), value: z.string(), comparison: z.string().optional(), sourceUrl: z.string(),
    })),
    legacy: z.string(),
    images: z.object({ then: img.optional(), now: img.optional(), lineArt: z.string() }),
    sources: z.array(z.string()),
    verified: z.boolean(),
  }),
});

export const collections = { story, artifacts };
