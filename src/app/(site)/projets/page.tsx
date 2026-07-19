import type { Metadata } from "next";
import Link from "next/link";
import { ProjectFilters } from "@/components/ProjectFilters";
import { getProjets } from "@/lib/content";
import { filterProjets } from "@/lib/fallback";

export const metadata: Metadata = {
  title: "Projets",
  description: "Projets en cours et passés de l’ONG GRIDév.",
};

type Props = { searchParams: Promise<{ statut?: string }> };

export default async function ProjetsPage({ searchParams }: Props) {
  const { statut } = await searchParams;
  const active = statut === "en_cours" || statut === "passe" ? statut : "tous";
  const all = await getProjets();
  const projets = filterProjets(all, active);

  return (
    <div className="section">
      <div className="container">
        <h1 className="font-display text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
          Projets
        </h1>
        <p className="mt-3 max-w-xl text-[var(--brand-muted)]">
          Actions terrain en cours et retours d’expérience des programmes passés.
        </p>
        <div className="mt-8">
          <ProjectFilters active={active} />
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {projets.map((p) => (
            <li key={p._id} className="border-t-2 border-[var(--brand-indigo)] pt-5">
              <Link href={`/projets/${p.slug}`} className="group block">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-muted)]">
                  {p.status === "en_cours" ? "En cours" : "Passé"}
                </p>
                <h2 className="font-display mt-2 text-2xl font-semibold transition group-hover:text-[var(--brand-indigo)]">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">{p.summary}</p>
                {p.location ? (
                  <p className="mt-3 text-xs text-[var(--brand-muted)]">{p.location}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        {projets.length === 0 ? (
          <p className="mt-10 text-[var(--brand-muted)]">Aucun projet pour ce filtre.</p>
        ) : null}
      </div>
    </div>
  );
}
