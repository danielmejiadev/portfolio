import { timeline, education } from "@/lib/data";
import Reveal from "./Reveal";

export default function Trajectory() {
  return (
    <section id="trajectory" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal as="p" className="font-mono text-xs tracking-wide text-accent-3 uppercase">
          Trajectory
        </Reveal>
        <Reveal as="h2" className="mt-2 max-w-xl text-2xl font-semibold sm:text-4xl">
          12+ years, one continuous thread.
        </Reveal>

        <ol className="mt-10 border-l border-line pl-7 sm:pl-9">
          {timeline.map((item) => (
            <Reveal key={item.title} as="li" className="timeline-dot relative py-5">
              <p className="font-mono text-xs text-accent-3">{item.date}</p>
              <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
              <p className="mt-1.5 max-w-2xl text-sm text-ink-dim">{item.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="glass-card mt-10 rounded-2xl p-7">
          <h3 className="mb-4 text-base font-semibold">Education &amp; certifications</h3>
          <ul className="grid gap-2 text-sm text-ink-dim">
            {education.map((e) => (
              <li key={e.title}>
                <strong className="text-ink">{e.title}</strong> — {e.meta}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
