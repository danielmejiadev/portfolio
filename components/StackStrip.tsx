import { stackGroups } from "@/lib/data";
import Reveal from "./Reveal";

export default function StackStrip() {
  return (
    <section id="stack" className="relative isolate overflow-hidden py-16 sm:py-20">
      <div className="mesh-backdrop" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal as="p" className="font-mono text-xs tracking-wide text-accent-3 uppercase">
          Core stack
        </Reveal>
        <Reveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((g) => (
            <div key={g.name}>
              <h4 className="text-sm font-semibold">{g.name}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-faint">{g.items}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
