import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageBanner } from "@/components/motion/PageBanner";
import { Reveal } from "@/components/motion/Reveal";
import { getOpportunites, getOpportunitesPage } from "@/lib/content";
import { categoryLabels } from "@/lib/fallback";
import type { OpportuniteCategory, OpportuniteListItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Opportunités",
  description:
    "Offres d’emploi, stages, bénévolat et opportunités de collaboration avec l’ONG GRIDév.",
};

const sectionOrder: OpportuniteCategory[] = [
  "emploi",
  "collaboration",
  "stage",
  "benevolat",
];

function groupByCategory(items: OpportuniteListItem[]) {
  const map = new Map<OpportuniteCategory, OpportuniteListItem[]>();
  for (const cat of sectionOrder) map.set(cat, []);
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return map;
}

export default async function OpportunitesPage() {
  const [page, items] = await Promise.all([getOpportunitesPage(), getOpportunites()]);
  const grouped = groupByCategory(items);

  return (
    <>
      <PageBanner title={page.title} description={page.intro} />
      <div className="section">
        <div className="container">
          <div className="space-y-14">
            {sectionOrder.map((cat, sectionIndex) => {
              const list = grouped.get(cat) ?? [];
              if (list.length === 0) return null;
              return (
                <Reveal key={cat} delay={sectionIndex * 0.05} as="section" aria-labelledby={`opp-${cat}`}>
                  <h2
                    id={`opp-${cat}`}
                    className="font-display text-2xl font-semibold text-[var(--brand-indigo)] md:text-3xl"
                  >
                    {categoryLabels[cat]}
                  </h2>
                  <ul className="mt-6 grid gap-6 md:grid-cols-2">
                    {list.map((o, i) => (
                      <Reveal key={o._id} delay={i * 0.07} as="li" className="border-t-2 border-[var(--brand-indigo)] pt-4">
                        <Link href={`/opportunites/${o.slug}`} className="group card-hover block rounded-2xl p-3 hover:bg-white/50">
                          <h3 className="font-display text-xl font-semibold transition group-hover:text-[var(--brand-indigo)]">
                            {o.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">
                            {o.summary}
                          </p>
                          {o.location ? (
                            <p className="mt-3 text-xs text-[var(--brand-muted)]">{o.location}</p>
                          ) : null}
                        </Link>
                      </Reveal>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>

          {items.length === 0 ? (
            <Reveal className="mt-10 text-[var(--brand-muted)]">
              <p>
                Aucune opportunité ouverte pour le moment. Revenez bientôt ou contactez-nous.
              </p>
            </Reveal>
          ) : null}

          <Reveal variant="scale" className="mt-16">
            <div className="grid gap-10 rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)]/80 p-6 md:grid-cols-2 md:p-10">
              <div>
                <h2 className="font-display text-2xl font-semibold">{page.ctaLabel}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-muted)]">
                  Candidature, proposition de partenariat ou bénévolat : décrivez votre profil et
                  l’objet de votre message. Nous vous répondrons dès que possible.
                </p>
              </div>
              <ContactForm defaultSubject="Opportunité — candidature ou proposition" />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
