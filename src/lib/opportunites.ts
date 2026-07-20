/** E-mail de candidature pour les offres d’emploi (provisoire). */
export const JOB_APPLY_EMAIL =
  process.env.NEXT_PUBLIC_JOB_APPLY_EMAIL?.trim() || "gridev@gmail.com";

export function jobApplyMailto(title: string) {
  const subject = encodeURIComponent(`Candidature — ${title}`);
  const body = encodeURIComponent(
    "Bonjour,\n\nJe souhaite postuler à cette offre d’emploi.\n\nVeuillez trouver ci-joint mon CV et ma lettre de motivation.\n\nCordialement,\n",
  );
  return `mailto:${JOB_APPLY_EMAIL}?subject=${subject}&body=${body}`;
}
