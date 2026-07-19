import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--brand-indigo-deep)] text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{settings.officialName}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">{settings.slogan}</p>
          <p className="mt-4 text-sm text-white/60">{settings.footerText}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">Navigation</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/a-propos" className="hover:underline">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/projets" className="hover:underline">
                Projets
              </Link>
            </li>
            <li>
              <Link href="/actualites" className="hover:underline">
                Actualités
              </Link>
            </li>
            <li>
              <Link href="/opportunites" className="hover:underline">
                Opportunités
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>{settings.address}</li>
            {settings.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:underline">
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${settings.email}`} className="hover:underline">
                {settings.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {settings.officialName}</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
