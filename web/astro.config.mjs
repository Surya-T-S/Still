// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [mdx()],
  vite: {
    resolve: {
      alias: {
        // Content folders: the website only READS these.
        "@story": path.join(repo, "story/chapters"),
        "@data": path.join(repo, "data"),
      },
    },
    // Allow the dev server to serve files from sibling folders (story, data).
    server: { fs: { allow: [repo] } },
  },
});
