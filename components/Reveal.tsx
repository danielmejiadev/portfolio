"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -2% 0px" }
    );
    io.observe(el);

    // Safety net: reveal anything still hidden above the fold after 6s
    const t = setTimeout(() => {
      if (!el.classList.contains("is-revealed") && el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-revealed");
      }
    }, 6000);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  const Tag = as as unknown as "div";

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} data-reveal className={className}>
      {children}
    </Tag>
  );
}
