"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import MagneticButton from "./MagneticButton";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mailHref = `mailto:${profile.contact.email}?subject=${encodeURIComponent(profile.mailSubject)}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/70 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" aria-label="Daniel Mejía — home" className="font-display text-lg font-bold">
          DM<span className="text-accent-3">.</span>
        </a>
        <nav aria-label="Primary" className="hidden gap-7 text-sm text-ink-dim sm:flex">
          <a href="#work" className="transition-colors hover:text-ink">Work</a>
          <a href="#trajectory" className="transition-colors hover:text-ink">Trajectory</a>
          <a href="#about" className="transition-colors hover:text-ink">About</a>
          <a href="#contact" className="transition-colors hover:text-ink">Contact</a>
        </nav>
        <MagneticButton
          href={mailHref}
          strength={0.25}
          className="rounded-full border border-glass-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-glass"
        >
          Let&rsquo;s talk
        </MagneticButton>
      </div>
    </header>
  );
}
