import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter l’ONG GRIDév à Gao.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="section">
      <div className="container grid gap-12 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-semibold text-[var(--brand-indigo)] md:text-5xl">
            Contact
          </h1>
          <p className="mt-4 text-[var(--brand-muted)]">
            Une question, une proposition, un partenariat ? Écrivez-nous.
          </p>
          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="font-semibold text-[var(--brand-ink)]">Adresse</dt>
              <dd className="mt-1 text-[var(--brand-muted)]">{settings.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--brand-ink)]">Téléphone</dt>
              <dd className="mt-1 space-y-1 text-[var(--brand-muted)]">
                {settings.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:underline">
                    {p}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--brand-ink)]">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${settings.email}`} className="text-[var(--brand-indigo)] hover:underline">
                  {settings.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)]/80 p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
