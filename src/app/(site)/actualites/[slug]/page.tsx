import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { RichBody } from "@/components/RichBody";
import { getActualiteBySlug, getActualites } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getActualites();
  return items.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getActualiteBySlug(slug);
  if (!item) return { title: "Actualité" };
  return { title: item.title, description: item.excerpt };
}

export default async function ActualiteDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getActualiteBySlug(slug);
  if (!item) notFound();

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <Reveal>
          <time className="text-sm text-[var(--brand-muted)]" dateTime={item.publishedAt}>
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : null}
          </time>
          <h1 className="font-display mt-3 text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
            {item.title}
          </h1>
          {item.excerpt ? <p className="mt-4 text-lg text-[var(--brand-muted)]">{item.excerpt}</p> : null}
        </Reveal>
        <Reveal delay={0.12} className="mt-10">
          <RichBody body={item.body} bodyText={item.bodyText} />
        </Reveal>
      </div>
    </article>
  );
}
