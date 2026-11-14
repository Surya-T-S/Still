/**
 * Motion vocabulary — owned by C (Web Dev 1). The ONLY animation helpers the site uses.
 * Rules: transform + opacity only · every helper respects reduced motion.
 * Surya & Vrindha register plugins + Lenis once (web/src/scripts/engine.ts); these just build tweens.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const q = (t: string | Element | Element[]) =>
  typeof t === "string" ? gsap.utils.toArray<Element>(t) : Array.isArray(t) ? t : [t];

/** Fade + 16px rise when scrolled into view. */
export function reveal(targets: string | Element | Element[], opts: { stagger?: number; y?: number } = {}) {
  const els = q(targets);
  if (reduced()) return gsap.set(els, { opacity: 1, y: 0 });
  return gsap.fromTo(
    els,
    { opacity: 0, y: opts.y ?? 16 },
    {
      opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: opts.stagger ?? 0.08,
      scrollTrigger: { trigger: els[0], start: "top 85%", once: true },
    },
  );
}

/** SVG line-art draws itself, scrubbed to scroll. Works on any <path>/<line>/<circle>. */
export function drawLine(svg: Element, opts: { scrub?: boolean | number } = {}) {
  const paths = svg.querySelectorAll<SVGGeometryElement>("path, line, circle, rect, polyline, ellipse");
  if (reduced()) return;
  paths.forEach((p) => {
    const len = p.getTotalLength?.() ?? 0;
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
  });
  return gsap.to(paths, {
    strokeDashoffset: 0, ease: "none", stagger: 0.04,
    scrollTrigger: { trigger: svg, start: "top 80%", end: "center 45%", scrub: opts.scrub ?? 0.8 },
  });
}

/** Line-by-line text reveal (wraps each line of a block's children). */
export function splitLines(container: Element) {
  const lines = Array.from(container.children);
  if (reduced()) return gsap.set(lines, { opacity: 1, y: 0 });
  return gsap.fromTo(
    lines,
    { opacity: 0, y: "0.6em" },
    {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.35,
      scrollTrigger: { trigger: container, start: "top 75%", once: true },
    },
  );
}

/** Pin a chapter while its inner timeline scrubs. Returns the timeline to fill. */
export function pinChapter(section: Element, lengthVh = 150) {
  const tl = gsap.timeline();
  if (reduced()) return tl;
  ScrollTrigger.create({
    trigger: section, start: "top top", end: `+=${lengthVh}%`,
    pin: true, scrub: 0.6, animation: tl,
  });
  return tl;
}

/** Numeric counter tween (e.g. 0 → 5352 sols). Writes into el.textContent. */
export function counter(el: Element, to: number, opts: { from?: number; duration?: number; format?: (n: number) => string } = {}) {
  const fmt = opts.format ?? ((n: number) => Math.round(n).toLocaleString("en-US"));
  const state = { v: opts.from ?? 0 };
  if (reduced()) { el.textContent = fmt(to); return; }
  return gsap.to(state, {
    v: to, duration: opts.duration ?? 2.4, ease: "power2.out",
    onUpdate: () => { el.textContent = fmt(state.v); },
    scrollTrigger: { trigger: el, start: "top 80%", once: true },
  });
}
