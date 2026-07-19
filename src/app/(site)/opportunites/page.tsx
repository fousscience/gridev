import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
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
    <div className="section">
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--brand-muted)]">{page.intro}</p>
        </div>

        <div className="mt-14 space-y-14">
          {sectionOrder.map((cat) => {
            const list = grouped.get(cat) ?? [];
            if (list.length === 0) return null;
            return (
              <section key={cat} aria-labelledby={`opp-${cat}`}>
                <h2
                  id={`opp-${cat}`}
                  className="font-display text-2xl font-semibold text-[var(--brand-indigo)] md:text-3xl"
                >
                  {categoryLabels[cat]}
                </h2>
                <ul className="mt-6 grid gap-6 md:grid-cols-2">
                  {list.map((o) => (
                    <li key={o._id} className="border-t-2 border-[var(--brand-indigo)] pt-4">
                      <Link href={`/opportunites/${o.slug}`} className="group block">
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
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-[var(--brand-muted)]">
            Aucune opportunité ouverte pour le moment. Revenez bientôt ou contactez-nous.
          </p>
        ) : null}

        <div className="mt-16 grid gap-10 rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)]/80 p-6 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="font-display text-2xl font-semibold">{page.ctaLabel}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--brand-muted)]">
              Candidature, proposition de partenariat ou bénévolat : décrivez votre profil et
              l’objet de votre message. Nous vous répondrons dès que possible.
            </p>
          </div>
          <ContactForm defaultSubject="Opportunité — candidature ou proposition" />
        </div>
      </div>
    </div>
  );
}
