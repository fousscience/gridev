import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
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

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <Link
          href="/opportunites"
          className="link-underline text-sm font-semibold text-[var(--brand-indigo)]"
        >
          ← Toutes les opportunités
        </Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--brand-muted)]">
          {categoryLabels[item.category] || item.category}
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
          {item.title}
        </h1>
        {item.location ? <p className="mt-3 text-[var(--brand-muted)]">{item.location}</p> : null}
        {item.summary ? (
          <p className="mt-6 text-lg text-[var(--brand-muted)]">{item.summary}</p>
        ) : null}
        <div className="mt-10">
          <RichBody body={item.body} bodyText={item.bodyText} />
        </div>
        <div className="mt-14 rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)]/80 p-6 md:p-8">
          <h2 className="font-display text-xl font-semibold">Répondre à cette opportunité</h2>
          <p className="mt-2 text-sm text-[var(--brand-muted)]">
            Utilisez le formulaire ci-dessous (CV, lettre ou proposition).
          </p>
          <div className="mt-6">
            <ContactForm defaultSubject={`Opportunité : ${item.title}`} />
          </div>
        </div>
      </div>
    </article>
  );
}
