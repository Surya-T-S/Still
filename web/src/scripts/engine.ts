/**
 * The ONE scroll engine (owned by D).
 * Lenis smooth scroll + GSAP ScrollTrigger on a single ticker, then wires C's motion vocabulary
 * to data attributes: [data-reveal] [data-draw] [data-split] [data-silent-since] [data-chapter].
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { reveal, drawLine, splitLines, reduced } from "../motion/index";

gsap.registerPlugin(ScrollTrigger);

// 1 · Smooth scroll (skipped for reduced motion)
if (!reduced()) {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// 2 · C's motion vocabulary, driven by markup
document.querySelectorAll("[data-reveal]").forEach((el) => reveal(el));
document.querySelectorAll("[data-split]").forEach((el) => splitLines(el));
document.querySelectorAll("[data-draw] svg").forEach((el) => drawLine(el));

// 3 · "Silent for N days" tickers
const DAY = 86_400_000;
document.querySelectorAll<HTMLElement>("[data-silent-since]").forEach((el) => {
  const days = Math.floor((Date.now() - Date.parse(el.dataset.silentSince!)) / DAY);
  el.textContent = days.toLocaleString("en-US");
});

// 4 · Signal Delay HUD + act accent
const $where = document.querySelector<HTMLElement>("[data-hud-where]")!;
const $dist = document.querySelector<HTMLElement>("[data-hud-dist]")!;
const $light = document.querySelector<HTMLElement>("[data-hud-light]")!;
const hud = { km: 0, sec: 0 };

const fmtKm = (km: number) =>
  km >= 1e9 ? `${(km / 1e9).toFixed(2)} B km`
  : km >= 1e6 ? `${(km / 1e6).toFixed(1)} M km`
  : `${Math.round(km).toLocaleString("en-US")} km`;

const fmtLight = (s: number) => {
  if (s < 60) return `${s.toFixed(2)} s`;
  if (s < 3600) return `${Math.floor(s / 60)} min ${Math.round(s % 60)} s`;
  return `${Math.floor(s / 3600)} h ${Math.round((s % 3600) / 60)} min`;
};

function render() {
  $dist.textContent = fmtKm(hud.km);
  $light.textContent = fmtLight(hud.sec);
}

document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((ch) => {
  const go = () => {
    const { label = "", act = "moon", distance = "0", light = "0" } = ch.dataset;
    $where.textContent = label.toUpperCase();
    document.body.dataset.act = act;
    gsap.to(hud, {
      km: Number(distance), sec: Number(light),
      duration: reduced() ? 0 : 1.6, ease: "power2.inOut", onUpdate: render, overwrite: true,
    });
  };
  ScrollTrigger.create({ trigger: ch, start: "top 55%", end: "bottom 55%", onEnter: go, onEnterBack: go });
});

render();
