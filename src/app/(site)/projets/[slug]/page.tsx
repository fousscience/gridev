import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { RichBody } from "@/components/RichBody";
import { getProjetBySlug, getProjets } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getProjets();
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getProjetBySlug(slug);
  if (!item) return { title: "Projet" };
  return { title: item.title, description: item.summary };
}

export default async function ProjetDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getProjetBySlug(slug);
  if (!item) notFound();

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-muted)]">
            {item.status === "en_cours" ? "Projet en cours" : "Projet passé"}
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
            {item.title}
          </h1>
          {item.location ? <p className="mt-3 text-[var(--brand-muted)]">{item.location}</p> : null}
          {item.summary ? <p className="mt-6 text-lg text-[var(--brand-muted)]">{item.summary}</p> : null}
          {item.partners?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {item.partners.map((p) => (
                <li
                  key={p}
                  className="card-hover rounded-full border border-[var(--line)] bg-white/60 px-3 py-1 text-xs"
                >
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
        <Reveal delay={0.12} className="mt-10">
          <RichBody body={item.body} bodyText={item.bodyText} />
        </Reveal>
      </div>
    </article>
  );
}
