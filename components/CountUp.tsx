"use client";

import { useEffect, useRef, useState } from "react";
import { easeOutCubic } from "@/utils/motion";

interface CountUpProps {
  target: number;
}

const ANIMATION_DURATION_MS = 1300;

export default function CountUp({ target }: CountUpProps) {
  const [displayedValue, setDisplayedValue] = useState(0);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const spanElement = spanRef.current;
    if (!spanElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const startTime = performance.now();

          function animateFrame(now: number) {
            const elapsedFraction = Math.min(1, (now - startTime) / ANIMATION_DURATION_MS);
            setDisplayedValue(Math.round(easeOutCubic(elapsedFraction) * target));
            if (elapsedFraction < 1) requestAnimationFrame(animateFrame);
          }
          requestAnimationFrame(animateFrame);
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(spanElement);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={spanRef}>{displayedValue}</span>;
}
