import type { Metadata } from "next";
import Image from "next/image";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Mot du Président, équipe, historique et partenaires de l’ONG GRIDév.",
};

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[color-mix(in_srgb,var(--brand-indigo)_12%,white)] font-display text-2xl font-semibold text-[var(--brand-indigo)]"
      aria-hidden
    >
      {initials || "?"}
    </div>
  );
}

export default async function AboutPage() {
  const about = await getAbout();
  const { president } = about;

  return (
    <div className="section">
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
            À propos de GRIDév
          </h1>
          <p className="mt-4 text-[var(--brand-muted)]">
            Organisation malienne à but non lucratif — récépissé 046/CG · accord-cadre 001619.
          </p>
        </div>

        <section className="mt-14 grid gap-10 border-t border-[var(--line)] pt-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-[var(--surface-elevated)] shadow-sm">
            {president.photoUrl ? (
              <Image
                src={president.photoUrl}
                alt={president.photoAlt || `Photo de ${president.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            ) : (
              <InitialsAvatar name={president.name} />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
              {president.sectionTitle}
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[var(--brand-indigo)]">
              {president.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--brand-muted)]">{president.role}</p>
            <div className="prose-gridev mt-6">
              {president.message.split("\n\n").map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-semibold text-[var(--brand-indigo)]">
            Notre équipe
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--brand-muted)]">{about.teamIntro}</p>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {about.team.map((member) => (
              <li key={`${member.name}-${member.role}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--surface-elevated)]">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.photoAlt || `Photo de ${member.name}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 50vw, 300px"
                    />
                  ) : (
                    <InitialsAvatar name={member.name} />
                  )}
                </div>
                <h3 className="font-display mt-4 text-xl font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--brand-indigo)]">{member.role}</p>
                {member.bio ? (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">{member.bio}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <div className="mx-auto mt-20 max-w-3xl">
          <section>
            <h2 className="font-display text-2xl font-semibold">Historique</h2>
            <p className="prose-gridev mt-4">{about.history}</p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">Objectif global</h2>
            <p className="prose-gridev mt-4">{about.globalObjective}</p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-[var(--brand-muted)]">
              {about.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">Structure</h2>
            <ul className="mt-4 space-y-2 text-[var(--brand-muted)]">
              {about.structure.map((s) => (
                <li key={s} className="border-l-2 border-[var(--brand-indigo)] pl-4">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">Zones d’intervention</h2>
            <p className="prose-gridev mt-4">{about.zones}</p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">Partenaires</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.partners.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-[var(--line)] bg-white/60 px-3 py-1 text-sm text-[var(--brand-muted)]"
                >
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
