import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default async function MentionsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="section">
      <div className="container max-w-3xl prose-gridev">
        <h1 className="font-display text-4xl font-semibold text-[var(--brand-ink)]">Mentions légales</h1>
        <h2 className="font-display mt-10 text-xl font-semibold text-[var(--brand-ink)]">Éditeur</h2>
        <p className="mt-3">
          {settings.officialName} — {settings.fullName}
          <br />
          {settings.address}
          <br />
          Email : {settings.email}
          <br />
          Tél. : {settings.phones.join(" · ")}
        </p>
        <p className="mt-4">
          Organisation à but non lucratif malienne — récépissé 046/CG du 10 avril 2010 ;
          accord-cadre 001619 du 23 décembre 2019.
        </p>
        <h2 className="font-display mt-10 text-xl font-semibold text-[var(--brand-ink)]">Hébergement</h2>
        <p className="mt-3">
          Site hébergé par Vercel Inc. Le contenu éditorial peut être géré via Sanity.io.
        </p>
      </div>
    </div>
  );
}
