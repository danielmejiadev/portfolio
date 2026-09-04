import { ossProjects, profile } from "@/lib/data";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function OpenSource() {
  return (
    <section id="oss" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal as="p" className="font-mono text-xs tracking-wide text-accent-3 uppercase">
          Open source
        </Reveal>
        <Reveal as="h2" className="mt-2 max-w-2xl text-2xl font-semibold sm:text-4xl">
          Maintained continuously since 2018 — alongside full-time senior/lead roles.
        </Reveal>
        <Reveal as="p" className="mt-3 text-ink-dim">
          7+ consecutive years combining both. All repos on{" "}
          <a href={profile.contact.github} target="_blank" rel="noopener" className="text-accent-3 hover:underline">
            github.com/danielmejiadev
          </a>
          .
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ossProjects.map((p) => (
            <Reveal key={p.name}>
              <TiltCard className="glass-card h-full rounded-2xl p-6 transition-colors">
                <a href={profile.contact.github} target="_blank" rel="noopener" className="block">
                  <h4 className="text-base font-semibold">{p.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-faint">{p.description}</p>
                  <span className="mt-2 inline-block font-mono text-xs text-accent-3">{p.since}</span>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
