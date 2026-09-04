"use client";

import { useRef, type ReactNode } from "react";

export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0 });
  const MAX = 6;

  function loop() {
    const s = state.current;
    s.cx += (s.tx - s.cx) * 0.15;
    s.cy += (s.ty - s.cy) * 0.15;
    if (ref.current) {
      ref.current.style.setProperty("--rx", `${s.cx.toFixed(2)}deg`);
      ref.current.style.setProperty("--ry", `${s.cy.toFixed(2)}deg`);
    }
    if (Math.abs(s.tx - s.cx) > 0.05 || Math.abs(s.ty - s.cy) > 0.05) {
      s.raf = requestAnimationFrame(loop);
    } else {
      s.raf = 0;
    }
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const s = state.current;
    s.tx = -py * MAX;
    s.ty = px * MAX;
    if (!s.raf) s.raf = requestAnimationFrame(loop);
  }

  function onMouseLeave() {
    const s = state.current;
    s.tx = 0;
    s.ty = 0;
    if (!s.raf) s.raf = requestAnimationFrame(loop);
  }

  return (
    <div
      ref={ref}
      className={`has-tilt ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
