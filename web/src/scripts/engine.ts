/**
 * STILL Chapter, Physics & Telemetry Engine.
 * - Mode-aware scroll mechanics via Lenis:
 *   - Vacuum Mode (Dark): Low-friction zero-G inertial glide (lerp: 0.068).
 *   - Paper Mode (Light): High-friction tactile archival sheet response (lerp: 0.18).
 * - Chapter-by-chapter deck management with directional warp impulses (`still:warp`)
 *   and live speed-of-light telemetry (`still:chapterchange`).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { reduced } from "../motion/index";

gsap.registerPlugin(ScrollTrigger);

let chapters: HTMLElement[] = [];
let activeIdx = 0;
let lenis: Lenis | null = null;

function getThemeLerp(): number {
  const isPaper =
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "light";
  return isPaper ? 0.18 : 0.068;
}

if (!reduced() && typeof window !== "undefined") {
  lenis = new Lenis({
    lerp: getThemeLerp(),
    smoothWheel: true,
    wheelMultiplier: 0.95,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    if (lenis) {
      lenis.options.lerp = getThemeLerp();
      lenis.raf(time * 1000);
    }
  });
  gsap.ticker.lagSmoothing(0);
}

const hud = { km: 0, sec: 0 };

const fmtKm = (km: number) => {
  if (km <= 0) return "0 km";
  if (km >= 1e9) return `${(km / 1e9).toFixed(2)} B km`;
  if (km >= 1e6) return `${(km / 1e6).toFixed(1)} M km`;
  return `${Math.round(km).toLocaleString("en-US")} km`;
};

const fmtLight = (s: number) => {
  if (s <= 0) return "0.00 s";
  if (s < 60) return `${s.toFixed(2)} s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
  return `${Math.floor(s / 3600)}h ${Math.round((s % 3600) / 60)}m`;
};

function renderHud() {
  document.querySelectorAll<HTMLElement>("[data-hud-dist]").forEach((el) => {
    el.textContent = fmtKm(hud.km);
  });
  document.querySelectorAll<HTMLElement>("[data-hud-light]").forEach((el) => {
    el.textContent = fmtLight(hud.sec);
  });
}

function animateChapterEntry(ch: HTMLElement) {
  const reveals = Array.from(ch.querySelectorAll<HTMLElement>("[data-reveal]"));
  const splits = Array.from(ch.querySelectorAll<HTMLElement>("[data-split]"));

  if (reduced()) {
    gsap.set(reveals, { opacity: 1, y: 0 });
    splits.forEach((s) => gsap.set(Array.from(s.children), { opacity: 1, y: 0 }));
    return;
  }

  const isPaper = document.documentElement.dataset.theme === "light";

  if (reveals.length) {
    gsap.fromTo(
      reveals,
      { opacity: 0, y: isPaper ? 8 : 16 },
      {
        opacity: 1,
        y: 0,
        duration: isPaper ? 0.45 : 0.7,
        ease: isPaper ? "power2.out" : "power3.out",
        stagger: isPaper ? 0.035 : 0.055,
        overwrite: true,
      },
    );
  }

  splits.forEach((container) => {
    const lines = Array.from(container.children);
    if (!lines.length) return;
    gsap.fromTo(
      lines,
      { opacity: 0, y: isPaper ? 8 : 14 },
      {
        opacity: 1,
        y: 0,
        duration: isPaper ? 0.5 : 0.78,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: true,
      },
    );
  });
}

/**
 * Switch to a specific chapter by ID or index.
 */
export function scrollToChapter(idOrIndex: string | number) {
  if (!chapters.length) {
    chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
  }
  if (!chapters.length) return;

  let targetIdx = -1;
  if (typeof idOrIndex === "number") {
    targetIdx = Math.max(0, Math.min(chapters.length - 1, idOrIndex));
  } else {
    const cleanId = idOrIndex.startsWith("#") ? idOrIndex.slice(1) : idOrIndex;
    targetIdx = chapters.findIndex(
      (c) => c.id === cleanId || c.dataset.chapter === cleanId,
    );
  }

  if (targetIdx === -1) return;

  const dir = targetIdx >= activeIdx ? 1 : -1;
  activeIdx = targetIdx;
  const target = chapters[activeIdx];

  document.documentElement.style.setProperty("--nav-dir", String(dir));

  chapters.forEach((c, idx) => {
    c.classList.toggle("is-active", idx === activeIdx);
  });

  // Reset scroll cleanly to the top of the newly opened chapter
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

  const { label = "", act = "moon", distance = "0", light = "0" } = target.dataset;
  document.body.dataset.act = act;

  document.querySelectorAll<HTMLElement>("[data-hud-where]").forEach((el) => {
    el.textContent = label;
  });

  gsap.to(hud, {
    km: Number(distance),
    sec: Number(light),
    duration: reduced() ? 0 : 0.95,
    ease: "power2.out",
    onUpdate: renderHud,
    overwrite: true,
  });

  animateChapterEntry(target);

  if (target.id) {
    const newUrl =
      target.id === "prologue" ? window.location.pathname : `#${target.id}`;
    try {
      history.replaceState(null, "", newUrl);
    } catch (_) {}
  }

  window.dispatchEvent(
    new CustomEvent("still:warp", {
      detail: { dir, index: activeIdx },
    }),
  );

  window.dispatchEvent(
    new CustomEvent("still:chapterchange", {
      detail: {
        index: activeIdx,
        total: chapters.length,
        id: target.id,
        act,
        label,
        distance: Number(distance),
        light: Number(light),
      },
    }),
  );
}

export function stepChapter(delta: number) {
  scrollToChapter(activeIdx + delta);
}

if (typeof window !== "undefined") {
  (window as any).scrollToChapter = scrollToChapter;
  (window as any).stepChapter = stepChapter;
}

if (typeof document !== "undefined") {
  chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));

  // "Silent for N days" archival counters
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

  // Determine initial chapter from URL hash (or default to Prologue)
  const initialHash = window.location.hash.slice(1);
  const initialIdx = initialHash
    ? chapters.findIndex((c) => c.id === initialHash)
    : 0;
  scrollToChapter(initialIdx >= 0 ? initialIdx : 0);

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1);
    if (hash) scrollToChapter(hash);
  });
}
