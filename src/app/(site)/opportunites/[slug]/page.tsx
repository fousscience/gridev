import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobApplyCta, OpportuniteApplyLink } from "@/components/OpportuniteApply";
import { Reveal } from "@/components/motion/Reveal";
import { RichBody } from "@/components/RichBody";
import { getOpportuniteBySlug, getOpportunites } from "@/lib/content";
import { categoryLabels } from "@/lib/fallback";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getOpportunites();
  return items.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getOpportuniteBySlug(slug);
  if (!item) return { title: "Opportunité" };
  return { title: item.title, description: item.summary };
}

export default async function OpportuniteDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getOpportuniteBySlug(slug);
  if (!item) notFound();

  const categoryLabel = categoryLabels[item.category] || item.category;
  const isJob = item.category === "emploi";
  const hasDescription = Boolean(
    (Array.isArray(item.body) && item.body.length > 0) || item.bodyText,
  );

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <Reveal>
          <Link
            href="/opportunites"
            className="link-underline text-sm font-semibold text-[var(--brand-indigo)]"
          >
            ← Toutes les opportunités
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--brand-muted)]">
            {categoryLabel}
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
            {item.title}
          </h1>
          {item.location ? <p className="mt-3 text-[var(--brand-muted)]">{item.location}</p> : null}
          {item.isOpen === false ? (
            <p className="mt-4 inline-block rounded-full bg-[color-mix(in_srgb,var(--accent-red)_12%,white)] px-3 py-1 text-xs font-semibold text-[var(--accent-red)]">
              Offre pourvue
            </p>
          ) : null}
          {item.summary ? (
            <p className="mt-6 text-lg text-[var(--brand-muted)]">{item.summary}</p>
          ) : null}
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[var(--brand-indigo)]">
            {isJob ? "Description du poste" : "Description"}
          </h2>
          {hasDescription ? (
            <div className="mt-4">
              <RichBody body={item.body} bodyText={item.bodyText} />
            </div>
          ) : (
            <p className="mt-4 text-[var(--brand-muted)]">
              La description détaillée sera publiée prochainement. Vous pouvez déjà nous contacter
              pour manifester votre intérêt.
            </p>
          )}
        </Reveal>

        <Reveal delay={0.2} variant="scale" className="mt-14">
          {isJob ? (
            <JobApplyCta title={item.title} closed={item.isOpen === false} />
          ) : (
            <OpportuniteApplyLink title={item.title} categoryLabel={categoryLabel} />
          )}
        </Reveal>
      </div>
    </article>
  );
}
