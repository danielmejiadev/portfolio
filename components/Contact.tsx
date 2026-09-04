import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  const mailHref = `mailto:${profile.contact.email}?subject=${encodeURIComponent(profile.mailSubject)}`;

  const contactRows = [
    { label: "Phone", value: profile.contact.phone, href: `tel:${profile.contact.phoneHref}` },
    { label: "GitHub", value: "github.com/danielmejiadev", href: profile.contact.github },
    { label: "LinkedIn", value: "linkedin.com/in/danielmejiadev", href: profile.contact.linkedin },
    { label: "Location", value: profile.location, href: null },
  ];

  return (
    <section id="contact" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="mesh-backdrop" aria-hidden="true" />
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal as="p" className="font-mono text-xs tracking-wide text-accent-3 uppercase">
          Contact
        </Reveal>
        <Reveal as="h2" className="mt-2 text-2xl font-semibold sm:text-4xl">
          Building AI-native products, or need someone to own the frontend end-to-end?
        </Reveal>
        <Reveal as="p" className="mt-3 text-ink-dim">
          Let&rsquo;s talk.
        </Reveal>

        <Reveal className="mt-7 flex flex-wrap items-center gap-4">
          <MagneticButton
            href={mailHref}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent-1 to-accent-2 px-6 py-3 font-mono text-sm font-semibold text-[#05060b] shadow-[0_8px_30px_-8px_rgba(109,139,255,0.55)]"
          >
            {profile.contact.email}
          </MagneticButton>
          <a
            href={profile.contact.cv}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border border-glass-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-glass hover:border-accent-3"
          >
            Download CV
          </a>
        </Reveal>

        <Reveal as="ul" className="mt-12 grid gap-3 border-t border-line pt-7">
          {contactRows.map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-4 border-b border-dashed border-line pb-3 text-sm last:border-b-0">
              <span className="font-mono text-xs tracking-wide text-ink-faint uppercase">{row.label}</span>
              {row.href ? (
                <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="transition-colors hover:text-accent-3">
                  {row.value}
                </a>
              ) : (
                <span>{row.value}</span>
              )}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
