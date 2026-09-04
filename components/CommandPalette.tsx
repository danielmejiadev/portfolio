"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { profile } from "@/lib/data";

type PaletteItem = { id: string; label: string; hint: string; href: string };

const items: PaletteItem[] = [
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
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q));
  }, [query]);

  function go(item: PaletteItem) {
    if (item.href.startsWith("#")) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    } else if (item.href.startsWith("mailto:")) {
      window.location.href = item.href;
    } else {
      window.open(item.href, "_blank", "noopener");
    }
    setOpen(false);
  }

  // useCallback so it's a stable dependency for the effects below.
  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else openPalette();
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, openPalette]);

  useEffect(() => {
    window.addEventListener("open-command-palette", openPalette);
    return () => window.removeEventListener("open-command-palette", openPalette);
  }, [openPalette]);

  // DOM side effects only — state resets happen in openPalette, above.
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function onQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) go(item);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-100 flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="glass-card w-full max-w-lg overflow-hidden rounded-2xl border-glass-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="font-mono text-ink-faint">/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Jump to a section, or open a link…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <kbd className="rounded border border-glass-border px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">esc</kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-faint">No matches.</li>}
          {filtered.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item)}
                onMouseEnter={() => setActiveIndex(i)}
                className={clsx("flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors", {
                  "bg-glass-strong text-ink": i === activeIndex,
                  "text-ink-dim": i !== activeIndex,
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
