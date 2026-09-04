"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { profile } from "@/lib/data";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/utils/commandPalette";

type PaletteItem = { id: string; label: string; hint: string; href: string };

const paletteItems: PaletteItem[] = [
  { id: "work", label: "Work", hint: "Case studies", href: "#work" },
  { id: "stack", label: "Stack", hint: "Core stack", href: "#stack" },
  { id: "about", label: "About", hint: "Bio & target roles", href: "#about" },
  { id: "trajectory", label: "Trajectory", hint: "Timeline & education", href: "#trajectory" },
  { id: "oss", label: "Open source", hint: "Maintained projects", href: "#oss" },
  { id: "contact", label: "Contact", hint: "Get in touch", href: "#contact" },
  { id: "cv", label: "Download CV", hint: "PDF, opens in Google Drive", href: profile.contact.cv },
  { id: "github", label: "Open GitHub", hint: profile.contact.github.replace("https://", ""), href: profile.contact.github },
  { id: "linkedin", label: "Open LinkedIn", hint: profile.contact.linkedin.replace("https://", ""), href: profile.contact.linkedin },
  { id: "email", label: "Email me", hint: profile.contact.email, href: `mailto:${profile.contact.email}?subject=${encodeURIComponent(profile.mailSubject)}` },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return paletteItems;
    return paletteItems.filter(
      (item) => item.label.toLowerCase().includes(normalizedQuery) || item.hint.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  function navigateToItem(item: PaletteItem) {
    if (item.href.startsWith("#")) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    } else if (item.href.startsWith("mailto:")) {
      window.location.href = item.href;
    } else {
      window.open(item.href, "_blank", "noopener");
    }
    setIsOpen(false);
  }

  // useCallback so it's a stable dependency for the effects below.
  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) setIsOpen(false);
        else openPalette();
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openPalette]);

  useEffect(() => {
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, openPalette);
    return () => window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, openPalette);
  }, [openPalette]);

  // DOM side effects only — state resets happen in openPalette, above.
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((currentIndex) => Math.min(currentIndex + 1, filteredItems.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const activeItem = filteredItems[activeIndex];
      if (activeItem) navigateToItem(activeItem);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-100 flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="glass-card w-full max-w-lg overflow-hidden rounded-2xl border-glass-border shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="font-mono text-ink-faint">/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Jump to a section, or open a link…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <kbd className="rounded border border-glass-border px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">esc</kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-faint">No matches.</li>}
          {filteredItems.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => navigateToItem(item)}
                onMouseEnter={() => setActiveIndex(index)}
                className={clsx("flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors", {
                  "bg-glass-strong text-ink": index === activeIndex,
                  "text-ink-dim": index !== activeIndex,
                })}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-ink-faint">{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
