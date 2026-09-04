import { profile, targetRoles } from "@/lib/data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Reveal>
          <p className="font-mono text-xs tracking-wide text-accent-3 uppercase">About</p>
          <h2 className="mt-2 max-w-xl text-2xl font-semibold sm:text-4xl">
            AI application engineering, not model training.
          </h2>

          <p className="mt-5 max-w-2xl text-ink-dim">
            Senior/Lead Software Engineer with 12+ years building frontend architectures and full-stack
            platforms, recently evolved into AI-native product engineering. Currently leads the frontend
            architecture and the AI/LLM integration layer at <strong className="font-display font-semibold text-ink">Brevian</strong>,
            an AI-native meeting-intelligence platform in production — combining React/Next.js with Claude
            and GPT integrations, MCP, RAG, and real-time streaming (SSE/WebSockets). Previously led the
            frontend architecture for <strong className="font-display font-semibold text-ink">GoDaddy Website Builder</strong> (20M+
            customers), standardizing design systems, authentication and testing strategy across teams.
          </p>

          <p className="mt-4 max-w-2xl text-ink-dim">
            The angle is deliberate: integrating LLMs, agents, MCP and RAG into real production UX — not
            training or researching models. Strong track record of end-to-end ownership: architecture,
            delivery, mentorship, and production quality.
          </p>

          <ul className="mt-6 grid gap-1.5 text-sm text-ink-dim">
            <li>
              <strong className="font-display font-semibold text-ink">Based in</strong> {profile.location}
            </li>
            <li>
              <strong className="font-display font-semibold text-ink">Languages</strong> {profile.languages}
            </li>
          </ul>
        </Reveal>

        <Reveal className="glass-card rounded-2xl p-7">
          <h3 className="mb-4 text-base font-semibold">Target roles</h3>
          <ul className="grid gap-2.5 text-sm text-ink-dim">
            {targetRoles.map((r) => (
              <li key={r} className="relative pl-4">
                <span className="absolute left-0 text-accent-3">→</span>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
