"use client";

import { useEffect, useState } from "react";

/** Tracks which of the given section ids is currently nearest the viewport center. */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    const sectionElements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => element !== null);
    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Prefer the entry closest to the top of the viewport.
          const topmostEntry = visibleEntries.reduce((closest, candidate) =>
            candidate.boundingClientRect.top < closest.boundingClientRect.top ? candidate : closest
          );
          setActiveSectionId(topmostEntry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSectionId;
}
