import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="section">
      <div className="container max-w-3xl prose-gridev">
        <h1 className="font-display text-4xl font-semibold text-[var(--brand-ink)]">
          Politique de confidentialité
        </h1>
        <p className="mt-6">
          Cette page décrit le traitement des données personnelles collectées via le formulaire de
          contact du site de {settings.officialName}.
        </p>
        <h2 className="font-display mt-10 text-xl font-semibold text-[var(--brand-ink)]">
          Données collectées
        </h2>
        <p className="mt-3">
          Nom, adresse email, sujet et contenu du message. Ces données sont utilisées uniquement pour
          répondre à votre demande.
        </p>
        <h2 className="font-display mt-10 text-xl font-semibold text-[var(--brand-ink)]">
          Destinataire
        </h2>
        <p className="mt-3">
          Les messages sont transmis à {settings.email}. Aucun suivi publicitaire n’est déployé en
          version 1 du site.
        </p>
        <h2 className="font-display mt-10 text-xl font-semibold text-[var(--brand-ink)]">
          Vos droits
        </h2>
        <p className="mt-3">
          Pour toute demande relative à vos données, contactez-nous à {settings.email}.
        </p>
      </div>
    </div>
  );
}
