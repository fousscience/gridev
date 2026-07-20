import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/motion/PageBanner";
import { Reveal } from "@/components/motion/Reveal";
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
    <>
      <PageBanner
        title="Projets"
        description="Actions terrain en cours et retours d’expérience des programmes passés."
      />
      <div className="section">
        <div className="container">
          <Reveal>
            <ProjectFilters active={active} />
          </Reveal>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {projets.map((p, i) => (
              <Reveal key={p._id} delay={i * 0.08} as="li" className="border-t-2 border-[var(--brand-indigo)] pt-5">
                <Link href={`/projets/${p.slug}`} className="group card-hover block rounded-2xl p-4 hover:bg-white/50">
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
              </Reveal>
            ))}
          </ul>
          {projets.length === 0 ? (
            <Reveal className="mt-10 text-[var(--brand-muted)]">
              <p>Aucun projet pour ce filtre.</p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </>
  );
}
