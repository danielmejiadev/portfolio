import { profile, stats } from "@/lib/data";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import CountUp from "./CountUp";
import HeroMesh from "./HeroMesh";

export default function Hero() {
  const mailHref = `mailto:${profile.contact.email}?subject=${encodeURIComponent(profile.mailSubject)}`;

  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24">
      <HeroMesh />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal as="p" className="font-mono text-xs tracking-wide text-accent-3 uppercase">
          Open to remote Senior / Lead / Staff roles
        </Reveal>

        <Reveal as="h1" className="mt-3 text-5xl font-bold sm:text-7xl">
          {profile.name}
        </Reveal>

        <Reveal as="p" className="mt-4 text-lg font-medium sm:text-xl">
          {profile.role} — {profile.tagline}
        </Reveal>

        <Reveal as="p" className="mt-4 max-w-xl text-base text-ink-dim">
          12+ years building frontend architectures and full-stack platforms, now focused on{" "}
          <strong className="font-display font-semibold text-ink">AI-native product engineering</strong> — wiring
          real production interfaces to Claude, GPT, MCP and RAG, not training models.
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap gap-4">
          <MagneticButton
            href={mailHref}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent-1 to-accent-2 px-6 py-3 text-sm font-semibold text-[#05060b] shadow-[0_8px_30px_-8px_rgba(109,139,255,0.55)] transition-shadow hover:shadow-[0_12px_34px_-6px_rgba(109,139,255,0.7)]"
          >
            Hire me
          </MagneticButton>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-glass-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-glass hover:border-accent-3"
          >
            See the work
          </a>
        </Reveal>

        <Reveal
          as="dl"
          className="mt-14 grid max-w-xl grid-cols-3 gap-5 border-t border-line pt-9"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-2xl font-bold sm:text-3xl">
                <CountUp target={stat.value} />
                {stat.suffix}
              </dt>
              <dd className="mt-1 text-xs text-ink-faint">{stat.label}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
