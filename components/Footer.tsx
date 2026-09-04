import { profile } from "@/lib/data";
import FooterYear from "./FooterYear";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © <FooterYear /> {profile.name}.
        </p>
        <div className="flex gap-5">
          <a href={profile.contact.cv} target="_blank" rel="noopener" className="hover:text-ink">
            CV
          </a>
          <a href={profile.contact.github} target="_blank" rel="noopener" className="hover:text-ink">
            GitHub
          </a>
          <a href={profile.contact.linkedin} target="_blank" rel="noopener" className="hover:text-ink">
            LinkedIn
          </a>
          <a href="#top" className="hover:text-ink">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
