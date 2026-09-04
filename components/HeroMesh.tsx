"use client";

import { useEffect, useRef } from "react";

/** Mouse-reactive gradient mesh, scoped to its parent (a `position: relative` section). */
export default function HeroMesh() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = el.parentElement;
    if (!parent) return;

    let mx = 50, my = 40, tx = 50, ty = 40, raf = 0;

    function onMove(e: MouseEvent) {
      const r = parent!.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    }
    function frame() {
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      el!.style.setProperty("--mx", `${mx}%`);
      el!.style.setProperty("--my", `${my}%`);
      raf = requestAnimationFrame(frame);
    }
    parent.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(frame);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="hero-mesh" aria-hidden="true" />;
}
