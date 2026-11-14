/**
 * The ONE scroll engine — owned by Vrindha (Platform & Structure).
 * Lenis smooth scroll + GSAP ScrollTrigger synced on a single ticker.
 * Wires motion vocabulary to data attributes:
 * [data-reveal] [data-draw] [data-split] [data-silent-since] [data-chapter].
 * Exports `scrollToChapter(id)` for Surya's navigation.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { reveal, drawLine, splitLines, reduced } from "../motion/index";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

// 1 · Smooth scroll (gracefully skipped if prefers-reduced-motion)
if (!reduced() && typeof window !== "undefined") {
  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/**
 * Scroll to a specific chapter section by ID or slug.
 * Exported for Surya's TrajectoryNav and internal navigation links.
 */
export function scrollToChapter(id: string) {
  const cleanId = id.startsWith("#") ? id.slice(1) : id;
  const target = document.getElementById(cleanId) ?? document.querySelector(`[data-chapter="${cleanId}"]`);
  if (!target) return;

  if (lenis && !reduced()) {
    lenis.scrollTo(target as HTMLElement, { offset: -40, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

if (typeof window !== "undefined") {
  (window as any).scrollToChapter = scrollToChapter;
}

// 2 · Motion vocabulary driven by markup
if (typeof document !== "undefined") {
  document.querySelectorAll("[data-reveal]").forEach((el) => reveal(el));
  document.querySelectorAll("[data-split]").forEach((el) => splitLines(el));
  document.querySelectorAll("[data-draw] svg").forEach((el) => drawLine(el));

  // 3 · "Silent for N days" telemetry tickers
  const DAY_MS = 86_400_000;
  document.querySelectorAll<HTMLElement>("[data-silent-since]").forEach((el) => {
    const dateStr = el.dataset.silentSince;
    if (dateStr) {
      const parsed = Date.parse(dateStr);
      if (!isNaN(parsed)) {
        const days = Math.floor((Date.now() - parsed) / DAY_MS);
        el.textContent = days.toLocaleString("en-US");
      }
    }
  });

  // 4 · Signal Delay HUD + Act accent updates
  const $where = document.querySelector<HTMLElement>("[data-hud-where]");
  const $dist = document.querySelector<HTMLElement>("[data-hud-dist]");
  const $light = document.querySelector<HTMLElement>("[data-hud-light]");
  const hud = { km: 0, sec: 0 };

  const fmtKm = (km: number) => {
    if (km >= 1e9) return `${(km / 1e9).toFixed(2)} B km`;
    if (km >= 1e6) return `${(km / 1e6).toFixed(1)} M km`;
    return `${Math.round(km).toLocaleString("en-US")} km`;
  };

  const fmtLight = (s: number) => {
    if (s < 60) return `${s.toFixed(2)} s`;
    if (s < 3600) return `${Math.floor(s / 60)} min ${Math.round(s % 60)} s`;
    return `${Math.floor(s / 3600)} h ${Math.round((s % 3600) / 60)} min`;
  };

  function renderHud() {
    if ($dist) $dist.textContent = fmtKm(hud.km);
    if ($light) $light.textContent = fmtLight(hud.sec);
  }

  document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((ch) => {
    const updateChapter = () => {
      const { label = "", act = "moon", distance = "0", light = "0" } = ch.dataset;
      if ($where) $where.textContent = label.toUpperCase();
      document.body.dataset.act = act;
      gsap.to(hud, {
        km: Number(distance),
        sec: Number(light),
        duration: reduced() ? 0 : 1.4,
        ease: "power2.inOut",
        onUpdate: renderHud,
        overwrite: true,
      });
    };

    ScrollTrigger.create({
      trigger: ch,
      start: "top 55%",
      end: "bottom 55%",
      onEnter: updateChapter,
      onEnterBack: updateChapter,
    });
  });

  renderHud();
}
