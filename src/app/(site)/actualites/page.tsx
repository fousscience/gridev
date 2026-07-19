import type { Metadata } from "next";
import Link from "next/link";
import { getActualites } from "@/lib/content";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Actualités et nouvelles de l’ONG GRIDév.",
};

export default async function ActualitesPage() {
  const actualites = await getActualites();

  return (
    <div className="section">
      <div className="container">
        <h1 className="font-display text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
          Actualités
        </h1>
        <p className="mt-3 max-w-xl text-[var(--brand-muted)]">
          Suivez les actions et annonces de GRIDév sur le terrain.
        </p>
        <ul className="mt-12 grid gap-10 md:grid-cols-2">
          {actualites.map((a) => (
            <li key={a._id} className="border-t border-[var(--line)] pt-6">
              <Link href={`/actualites/${a.slug}`} className="group block">
                <time className="text-xs text-[var(--brand-muted)]" dateTime={a.publishedAt}>
                  {a.publishedAt
                    ? new Date(a.publishedAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : null}
                </time>
                <h2 className="font-display mt-2 text-2xl font-semibold transition group-hover:text-[var(--brand-indigo)]">
                  {a.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">{a.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
