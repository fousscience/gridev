import Link from "next/link";
import { JOB_APPLY_EMAIL, jobApplyMailto } from "@/lib/opportunites";

type Props = {
  title: string;
  closed?: boolean;
};

export function JobApplyCta({ title, closed }: Props) {
  if (closed) {
    return (
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)]/80 p-6 md:p-8">
        <h2 className="font-display text-xl font-semibold">Postuler</h2>
        <p className="mt-2 text-sm text-[var(--brand-muted)]">
          Cette offre n’est plus ouverte aux candidatures.
        </p>
      </div>
    );
  }

  const mailto = jobApplyMailto(title);

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)]/80 p-6 md:p-8">
      <h2 className="font-display text-xl font-semibold">Postuler</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">
        Envoyez votre CV et votre lettre de motivation par e-mail. Indiquez le titre du poste dans
        l’objet de votre message.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a href={mailto} className="btn btn-primary">
          Postuler par e-mail
        </a>
        <a
          href={`mailto:${JOB_APPLY_EMAIL}`}
          className="text-sm font-medium text-[var(--brand-indigo)] hover:underline"
        >
          {JOB_APPLY_EMAIL}
        </a>
      </div>
    </div>
  );
}

type GenericApplyProps = {
  title: string;
  categoryLabel: string;
};

/** CTA générique pour stages, collaboration, etc. — lien contact. */
export function OpportuniteApplyLink({ title, categoryLabel }: GenericApplyProps) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)]/80 p-6 md:p-8">
      <h2 className="font-display text-xl font-semibold">Répondre à cette opportunité</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">
        Pour cette {categoryLabel.toLowerCase()}, contactez-nous en précisant l’objet « {title} ».
      </p>
      <Link href="/contact" className="btn btn-primary mt-6">
        Nous contacter
      </Link>
    </div>
  );
}
