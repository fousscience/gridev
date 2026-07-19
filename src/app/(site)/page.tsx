import Image from "next/image";
import Link from "next/link";
import {
  getAbout,
  getLatestActualites,
  getProjetsEnCours,
  getSiteSettings,
} from "@/lib/content";

export default async function HomePage() {
  const [settings, about, projets, actus] = await Promise.all([
    getSiteSettings(),
    getAbout(),
    getProjetsEnCours(),
    getLatestActualites(),
  ]);

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden text-white">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-indigo-deep) 0%, var(--brand-indigo) 42%, #3d2a8a 70%, #1f4d4a 100%)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(0,172,193,0.35), transparent 35%), radial-gradient(circle at 80% 20%, rgba(249,168,37,0.28), transparent 30%), radial-gradient(circle at 70% 70%, rgba(229,57,53,0.2), transparent 25%)",
          }}
        />
        <div className="container flex min-h-[88vh] flex-col justify-end pb-16 pt-24 md:justify-center md:pb-24">
          <div className="max-w-3xl">
            {settings.logoUrl ? (
              <Image
                src={settings.logoUrl}
                alt=""
                width={220}
                height={70}
                className="animate-fade-up mb-8 h-16 w-auto object-contain brightness-0 invert md:h-20"
                priority
              />
            ) : null}
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              {settings.fullName}
            </p>
            <h1 className="animate-fade-up-delay font-display mt-3 text-5xl font-semibold leading-[1.05] md:text-7xl">
              {settings.officialName}
            </h1>
            <p className="animate-fade-up-delay mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
              « {settings.slogan} »
            </p>
            <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base text-white/75">
              {settings.heroTagline}
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-on-dark">
                Nous contacter
              </Link>
              <Link href="/projets" className="btn btn-on-dark-ghost">
                Voir les projets
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="vision">
        <div className="container grid gap-8 md:grid-cols-[0.35fr_1fr]">
          <h2 className="font-display text-3xl font-semibold text-[var(--brand-indigo)] md:text-4xl">
            Vision
          </h2>
          <p className="prose-gridev text-base md:text-lg">{about.vision}</p>
        </div>
      </section>

      <section className="section border-y border-[var(--line)] bg-[var(--surface-elevated)]/60">
        <div className="container grid gap-8 md:grid-cols-[0.35fr_1fr]">
          <h2 className="font-display text-3xl font-semibold text-[var(--brand-indigo)] md:text-4xl">
            Mission
          </h2>
          <p className="prose-gridev text-base md:text-lg">{about.mission}</p>
        </div>
      </section>

      <section className="section" id="valeurs">
        <div className="container">
          <h2 className="font-display text-3xl font-semibold text-[var(--brand-indigo)] md:text-4xl">
            Valeurs
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--brand-muted)]">{about.culture}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v, i) => (
              <li
                key={v.title}
                className="border-t-2 border-[var(--brand-indigo)] pt-4 transition hover:-translate-y-1"
                style={{
                  borderColor: [
                    "var(--accent-red)",
                    "var(--accent-green)",
                    "var(--accent-purple)",
                    "var(--accent-cyan)",
                    "var(--accent-yellow)",
                    "var(--brand-indigo)",
                    "var(--accent-green)",
                  ][i % 7],
                }}
              >
                <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-[var(--brand-indigo-deep)] text-white">
        <div className="container">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Domaines d’intervention</h2>
          <p className="mt-3 max-w-xl text-white/70">
            Des programmes transversaux au service des communautés vulnérables.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.domains.map((d) => (
              <li
                key={d}
                className="border border-white/15 bg-white/5 px-5 py-4 text-sm font-medium backdrop-blur-sm transition hover:bg-white/10"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold text-[var(--brand-indigo)] md:text-4xl">
              Projets en cours
            </h2>
            <Link href="/projets?statut=en_cours" className="link-underline text-sm font-semibold text-[var(--brand-indigo)]">
              Tous les projets
            </Link>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {projets.map((p) => (
              <li key={p._id}>
                <Link href={`/projets/${p.slug}`} className="group block">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-cyan)]">
                    En cours
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold transition group-hover:text-[var(--brand-indigo)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">{p.summary}</p>
                  {p.location ? (
                    <p className="mt-3 text-xs text-[var(--brand-muted)]">{p.location}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-[var(--line)]">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold text-[var(--brand-indigo)] md:text-4xl">
              Actualités
            </h2>
            <Link href="/actualites" className="link-underline text-sm font-semibold text-[var(--brand-indigo)]">
              Toutes les actualités
            </Link>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {actus.map((a) => (
              <li key={a._id}>
                <Link href={`/actualites/${a.slug}`} className="group block">
                  <time className="text-xs text-[var(--brand-muted)]" dateTime={a.publishedAt}>
                    {a.publishedAt
                      ? new Date(a.publishedAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : null}
                  </time>
                  <h3 className="font-display mt-2 text-xl font-semibold transition group-hover:text-[var(--brand-indigo)]">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--brand-muted)]">{a.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pb-24">
        <div className="container overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,var(--brand-indigo),#2f6b66)] px-8 py-14 text-white md:px-14">
          <h2 className="font-display max-w-xl text-3xl font-semibold md:text-4xl">
            Construire ensemble des solutions durables
          </h2>
          <p className="mt-4 max-w-xl text-white/80">
            Institutions, collectivités, bailleurs et organisations de terrain : collaborons pour renforcer le leadership local.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/opportunites" className="btn btn-on-dark">
              Opportunités
            </Link>
            <Link href="/contact" className="btn btn-on-dark-ghost">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
