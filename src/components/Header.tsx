import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";

const nav = [
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/actualites", label: "Actualités" },
  { href: "/opportunites", label: "Opportunités" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface-elevated)_88%,transparent)] backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {settings.logoUrl ? (
            <Image
              src={settings.logoUrl}
              alt={settings.officialName}
              width={160}
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
          ) : (
            <span className="font-display text-xl font-semibold text-[var(--brand-indigo)]">
              {settings.officialName}
            </span>
          )}
        </Link>
        <nav aria-label="Principale" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-sm font-medium text-[var(--brand-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--brand-indigo)]">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-3 shadow-lg">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-[color-mix(in_srgb,var(--brand-indigo)_8%,transparent)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
