/**
 * Motion vocabulary — owned by Surya.
 * Rules: transform + opacity + strokeDashoffset only (60 fps GPU-friendly).
 * Every helper respects prefers-reduced-motion.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const q = (t: string | Element | Element[]) =>
  typeof t === "string" ? gsap.utils.toArray<Element>(t) : Array.isArray(t) ? t : [t];

/** Fade + 18px rise when scrolled into view. */
export function reveal(targets: string | Element | Element[], opts: { stagger?: number; y?: number } = {}) {
  const els = q(targets);
  if (!els.length) return;
  if (reduced()) return gsap.set(els, { opacity: 1, y: 0 });
  return gsap.fromTo(
    els,
    { opacity: 0, y: opts.y ?? 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: opts.stagger ?? 0.08,
      scrollTrigger: { trigger: els[0], start: "top 86%", once: true },
    },
  );
}

/**
 * SVG Blueprint Draw-On + Living Telemetry Micro-Animations:
 * 1. Scrubs strokeDashoffset from full length -> 0 as the spacecraft enters view.
 * 2. Gently scales the schematic in (0.95 -> 1).
 * 3. Starts ambient zero-G float on `.svg-craft`, slow orbital rotation on `.svg-orbit`,
 *    and telemetry pulse on `.svg-signal` / `.svg-beacon`.
 */
export function drawLine(svg: Element, opts: { scrub?: boolean | number } = {}) {
  const paths = svg.querySelectorAll<SVGGeometryElement>("path, line, circle, rect, polyline, ellipse");
  if (reduced()) return;

  paths.forEach((p) => {
    // Keep dashed reference rings dashed after draw
    if (p.classList.contains("svg-dashed")) return;
    const len = p.getTotalLength?.() ?? 0;
    if (len > 0) {
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    }
  });

  gsap.fromTo(
    svg,
    { opacity: 0.25, scale: 0.95 },
    {
      opacity: 1,
      scale: 1,
      ease: "power2.out",
      scrollTrigger: { trigger: svg, start: "top 85%", end: "center 50%", scrub: opts.scrub ?? 0.7 },
    },
  );

  const solidPaths = Array.from(paths).filter((p) => !p.classList.contains("svg-dashed"));
  gsap.to(solidPaths, {
    strokeDashoffset: 0,
    ease: "none",
    stagger: 0.025,
    scrollTrigger: { trigger: svg, start: "top 84%", end: "center 48%", scrub: opts.scrub ?? 0.8 },
  });

  // Living ambient telemetry animations inside the SVG
  const craft = svg.querySelectorAll(".svg-craft");
  if (craft.length) {
    gsap.to(craft, {
      y: -3.5,
      duration: 3.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  const orbits = svg.querySelectorAll(".svg-orbit");
  if (orbits.length) {
    gsap.to(orbits, {
      rotation: 360,
      transformOrigin: "50% 50%",
      duration: 38,
      ease: "none",
      repeat: -1,
    });
  }

  const signals = svg.querySelectorAll(".svg-signal");
  if (signals.length) {
    gsap.fromTo(
      signals,
      { opacity: 0.2, scale: 0.94, transformOrigin: "50% 50%" },
      { opacity: 0.95, scale: 1.04, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3 },
    );
  }
}

/** Line-by-line poetic transmission reveal. */
export function splitLines(container: Element) {
  const lines = Array.from(container.children);
  if (!lines.length) return;
  if (reduced()) return gsap.set(lines, { opacity: 1, y: 0 });
  return gsap.fromTo(
    lines,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.95,
      ease: "power3.out",
      stagger: 0.28,
      scrollTrigger: { trigger: container, start: "top 78%", once: true },
    },
  );
}

/** Pin a chapter while its inner timeline scrubs. */
export function pinChapter(section: Element, lengthVh = 150) {
  const tl = gsap.timeline();
  if (reduced()) return tl;
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${lengthVh}%`,
    pin: true,
    scrub: 0.6,
    animation: tl,
  });
  return tl;
}

/** Numeric counter tween (e.g. 0 → 5352 sols). */
export function counter(
  el: Element,
  to: number,
  opts: { from?: number; duration?: number; format?: (n: number) => string } = {},
) {
  const fmt = opts.format ?? ((n: number) => Math.round(n).toLocaleString("en-US"));
  const state = { v: opts.from ?? 0 };
  if (reduced()) {
    el.textContent = fmt(to);
    return;
  }
  return gsap.to(state, {
    v: to,
    duration: opts.duration ?? 2.4,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = fmt(state.v);
    },
    scrollTrigger: { trigger: el, start: "top 80%", once: true },
  });
}
