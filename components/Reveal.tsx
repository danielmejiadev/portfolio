"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export default function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -2% 0px" }
    );
    observer.observe(element);

    // Safety net: reveal anything still hidden above the fold after 6s
    const safetyTimeoutId = setTimeout(() => {
      if (!element.classList.contains("is-revealed") && element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add("is-revealed");
      }
    }, 6000);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimeoutId);
    };
  }, []);

  const Tag = as as unknown as "div";

  return (
    <Tag ref={elementRef as React.RefObject<HTMLDivElement>} data-reveal className={className}>
      {children}
    </Tag>
  );
}
