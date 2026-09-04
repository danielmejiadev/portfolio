"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { profile } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { dispatchOpenCommandPalette } from "@/utils/commandPalette";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { sectionId: "work", label: "Work" },
  { sectionId: "trajectory", label: "Trajectory" },
  { sectionId: "about", label: "About" },
  { sectionId: "contact", label: "Contact" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSectionId = useActiveSection(navLinks.map((link) => link.sectionId));

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 60);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  const mailHref = `mailto:${profile.contact.email}?subject=${encodeURIComponent(profile.mailSubject)}`;

  return (
    <header
      className={clsx("fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300", {
        "border-line bg-bg/70 backdrop-blur-md": isScrolled,
        "border-transparent": !isScrolled,
      })}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" aria-label="Daniel Mejía — home" className="font-display text-lg font-bold">
          DM<span className="text-accent-3">.</span>
        </a>

        <nav aria-label="Primary" className="hidden gap-7 text-sm sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.sectionId}
              href={`#${link.sectionId}`}
              aria-current={activeSectionId === link.sectionId ? "true" : undefined}
              className={clsx("transition-colors hover:text-ink", {
                "text-ink": activeSectionId === link.sectionId,
                "text-ink-dim": activeSectionId !== link.sectionId,
              })}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={dispatchOpenCommandPalette}
            aria-label="Open command palette"
            className="hidden items-center gap-1.5 rounded-full border border-glass-border px-3 py-2 font-mono text-xs text-ink-faint transition-colors hover:bg-glass hover:text-ink sm:flex"
          >
            <span>⌘</span>K
          </button>
          <MagneticButton
            href={mailHref}
            strength={0.25}
            className="rounded-full border border-glass-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-glass"
          >
            Let&rsquo;s talk
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
