import { caseStudies } from "@/lib/data";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function CaseStudies() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal as="p" className="font-mono text-xs tracking-wide text-accent-3 uppercase">
          Selected work
        </Reveal>
        <Reveal as="h2" className="mt-2 max-w-xl text-2xl font-semibold sm:text-4xl">
          Three products, one thread:{" "}
          <span className="text-gradient">own the frontend, ship it in production.</span>
        </Reveal>

        <div className="mt-10 grid gap-6">
          {caseStudies.map((c) => (
            <Reveal key={c.company}>
              <TiltCard className="glass-card rounded-2xl p-6 sm:p-9">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold sm:text-2xl">{c.company}</h3>
                    <p className="mt-1 text-sm text-ink-faint">
                      {c.role} · {c.dates}
                    </p>
                  </div>
                  <span className="whitespace-nowrap rounded-full border border-glass-border px-3 py-1 font-mono text-xs text-accent-3">
                    {c.badge}
                  </span>
                </div>

                <p className="mt-3 text-[0.96rem] text-ink-dim">
                  <strong className="font-display font-semibold text-ink">Problem.</strong> {c.problem}
                </p>
                <p className="mt-3 text-[0.96rem] text-ink-dim">
                  <strong className="font-display font-semibold text-ink">Built.</strong> {c.build}
                </p>
                <p className="mt-3 text-[0.96rem] text-ink-dim">
                  <strong className="font-display font-semibold text-ink">Result.</strong> {c.result}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.stack.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-glass-border px-2.5 py-1 font-mono text-xs text-ink-dim"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
