/**
 * All line-art SVGs as raw markup, keyed by filename ("opportunity.svg").
 * Drop a new <slug>.svg in this folder and it's picked up automatically.
 */
export const illustrations = import.meta.glob<string>("./*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function lineArt(file: string): string {
  return illustrations[`./${file}`] ?? "";
}
