"use client";

import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ href, children, className = "", strength = 0.3 }: MagneticButtonProps) {
  const outerRef = useRef<HTMLAnchorElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);
  const state = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0 });

  function loop() {
    const s = state.current;
    s.cx += (s.tx - s.cx) * 0.2;
    s.cy += (s.ty - s.cy) * 0.2;
    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${s.cx}px, ${s.cy}px, 0)`;
    }
    if (Math.abs(s.tx - s.cx) > 0.1 || Math.abs(s.ty - s.cy) > 0.1) {
      s.raf = requestAnimationFrame(loop);
    } else {
      s.raf = 0;
    }
  }

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const s = state.current;
    s.tx = (e.clientX - r.left - r.width / 2) * strength;
    s.ty = (e.clientY - r.top - r.height / 2) * strength;
    if (!s.raf) s.raf = requestAnimationFrame(loop);
  }

  function onMouseLeave() {
    const s = state.current;
    s.tx = 0;
    s.ty = 0;
    if (!s.raf) s.raf = requestAnimationFrame(loop);
  }

  return (
    <a
      ref={outerRef}
      href={href}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <span ref={innerRef} className="magnetic-inner">
        {children}
      </span>
    </a>
  );
}
