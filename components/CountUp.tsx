"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
}

export default function CountUp({ target }: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);

          const duration = 1300;
          const start = performance.now();
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

          function tick(now: number) {
            const t = Math.min(1, (now - start) / duration);
            setValue(Math.round(easeOut(t) * target));
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
}
