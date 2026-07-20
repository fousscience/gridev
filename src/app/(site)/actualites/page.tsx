import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/motion/PageBanner";
import { Reveal } from "@/components/motion/Reveal";
import { getActualites } from "@/lib/content";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Actualités et nouvelles de l’ONG GRIDév.",
};

export default async function ActualitesPage() {
  const actualites = await getActualites();

  return (
    <>
      <PageBanner
        title="Actualités"
        description="Suivez les actions et annonces de GRIDév sur le terrain."
      />
      <div className="section">
        <div className="container">
          <ul className="grid gap-10 md:grid-cols-2">
            {actualites.map((a, i) => (
              <Reveal key={a._id} delay={i * 0.08} as="li" className="border-t border-[var(--line)] pt-6">
                <Link href={`/actualites/${a.slug}`} className="group card-hover block rounded-2xl p-4 hover:bg-white/50">
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
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
