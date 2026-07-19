import Link from "next/link";

const filters = [
  { href: "/projets", label: "Tous", value: "tous" },
  { href: "/projets?statut=en_cours", label: "En cours", value: "en_cours" },
  { href: "/projets?statut=passe", label: "Passés", value: "passe" },
];

export function ProjectFilters({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer les projets">
      {filters.map((f) => {
        const isActive = active === f.value;
        return (
          <Link
            key={f.value}
            href={f.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-[var(--brand-indigo)] text-white"
                : "border border-[var(--line)] bg-white/50 text-[var(--brand-indigo)] hover:bg-white"
            }`}
          >
            {f.label}
          </Link>
        );
      })}
    </div>
  );
}
