import type {
  AboutContent,
  ActualiteDetail,
  ActualiteListItem,
  OpportuniteDetail,
  OpportunitesPageContent,
  ProjetDetail,
  ProjetListItem,
  SiteSettings,
} from "./types";

export const fallbackSettings: SiteSettings = {
  officialName: "ONG GRIDév",
  fullName: "Groupe de Réflexion pour les Initiatives de Développement",
  slogan: "Lutter Contre la Pauvreté par le Renforcement du Leadership Local",
  email: "gridevmali@gmail.com",
  phones: ["74 77 91 30", "69 32 51 19"],
  address: "Gao Château, Secteur I, Rue 345, Porte 521, Mali",
  footerText:
    "Organisation malienne à but non lucratif — récépissé 046/CG · accord-cadre 001619.",
  heroTagline:
    "Organisation malienne engagée auprès des communautés vulnérables — femmes, enfants et personnes en situation d’urgence — pour une sortie durable de la pauvreté.",
  logoUrl: "/brand/gridev-logo.jpeg",
};

export const fallbackAbout: AboutContent = {
  vision:
    "Être une organisation nationale et panafricaine forte, œuvrant à la transmission et à une large application des actions de résilience dans les domaines de la santé et de la nutrition (WASH), de la protection, de l’agriculture et de la croissance économique, de la paix et de la gouvernance redevable, de l’éducation et de l’alphabétisation, et de l’assistance humanitaire. Permettre un changement à court, moyen et long terme dans une perspective d’auto-développement durable et participatif, dans une société où tous les citoyens peuvent équitablement réaliser leurs droits et s’acquitter de leurs responsabilités.",
  mission:
    "Fournir des services de haute qualité aux communautés avec lesquelles nous travaillons, en répondant à leurs besoins et en dépassant leurs attentes, et promouvoir le développement durable à l’échelle nationale et continentale par une approche d’intervention claire : lutter contre la pauvreté par le renforcement du leadership local, la gestion et la valorisation des ressources existantes au plan local, de façon participative et inclusive. GRIDév fait cause commune avec les populations pauvres, vulnérables et privées de leurs droits, en vue de la justice sociale et du développement, en s’appuyant sur des organisations de citoyens établies au niveau local.",
  values: [
    {
      title: "Leadership local",
      text: "Nous plaçons les communautés au cœur de l’action et renforçons leur capacité à conduire leur propre développement.",
    },
    {
      title: "Justice sociale",
      text: "Nous œuvrons pour la justice sociale et l’égalité, en particulier pour les populations pauvres et marginalisées.",
    },
    {
      title: "Partenariats",
      text: "Nous travaillons en partenariat avec les communautés et en alliance avec d’autres organisations.",
    },
    {
      title: "Paix durable",
      text: "Nous contribuons à la prévention et à la résolution des conflits — la justice sociale et l’égalité fondent une paix véritable.",
    },
    {
      title: "Intégrité",
      text: "GRIDév accomplit son travail avec intégrité et courage.",
    },
    {
      title: "Diversité",
      text: "Nous respectons et célébrons la diversité, dans les communautés et au sein de notre organisation.",
    },
    {
      title: "Excellence",
      text: "Nous visons l’excellence dans tout ce que nous faisons.",
    },
  ],
  culture:
    "La culture de GRIDév repose sur l’intégrité, la transparence et le respect entre les équipes. Valorisation, inclusion, diversité et reconnaissance constituent le credo de l’organisation, ancrée auprès des communautés sans distinction d’origine ethnique, de sexe ou de religion.",
  domains: [
    "Santé / Nutrition / Hydraulique (WASH)",
    "Protection",
    "Agriculture et croissance économique",
    "Éducation et alphabétisation",
    "Paix et gouvernance redevable",
    "Assistance humanitaire",
  ],
  history:
    "L’ONG GRIDév, créée et enregistrée sous le récépissé 046/CG du 10 avril 2010 et l’accord-cadre 001619 du 23 décembre 2019, est une organisation à but non lucratif de nationalité malienne, fondée par de jeunes consultants expérimentés. Elle intervient dans toutes les régions du Mali, en particulier Gao, Ménaka, Kidal, Tombouctou et Mopti. Elle promeut les groupes vulnérables — femmes, enfants et personnes en situation d’urgence — dans les zones sédentaires, nomades et semi-nomades, par la lutte contre la pauvreté et le renforcement du leadership local. Le fondement des actions est la solidarité avec les plus vulnérables, l’entraide au sein des communautés, et l’autonomie des bénéficiaires comme acteurs du changement.",
  globalObjective:
    "Promouvoir le développement durable à l’échelle nationale et continentale par l’approche : lutter contre la pauvreté par le renforcement du leadership local, et gérer et valoriser les ressources locales de façon participative.",
  objectives: [
    "Appuyer le développement du monde rural, nomade et semi-nomade",
    "Contribuer aux politiques nationales de développement rural et urbain",
    "Réaliser et gérer des projets au profit des couches vulnérables",
    "Capitaliser et vulgariser les expériences de développement durable",
    "Assurer un environnement sain et une vigilance climatique",
    "Apporter un appui-conseil aux institutions et entreprises",
    "Promouvoir l’égalité et l’équité au sein des communautés",
  ],
  zones:
    "Interventions dans toutes les régions du Mali et le district de Bamako, en priorité Gao, Ménaka, Tombouctou, Kidal et Mopti.",
  structure: [
    "Assemblée générale",
    "Conseil d’administration",
    "Direction exécutive",
  ],
  partners: [
    "USAID",
    "MIHR",
    "JSI",
    "PAM",
    "Banque mondiale",
    "GIZ",
    "UNICEF",
    "MINUSMA",
    "CREATIVE International Inc.",
    "AEN",
  ],
  president: {
    sectionTitle: "Mot du Président",
    name: "Président de GRIDév",
    role: "Président",
    message:
      "Chers partenaires, amis et communautés,\n\nAu nom de l’ONG GRIDév, je vous remercie de l’intérêt que vous portez à notre action. Depuis 2010, nous œuvrons aux côtés des populations vulnérables du Mali — en particulier à Gao, Ménaka, Kidal, Tombouctou et Mopti — pour lutter contre la pauvreté par le renforcement du leadership local.\n\nNotre conviction est simple : les communautés sont les premiers acteurs de leur développement. Ensemble, avec intégrité, solidarité et excellence, construisons des solutions durables et participatives.\n\nLe texte définitif et la photo du Président pourront être mis à jour dans Sanity Studio.",
  },
  teamIntro:
    "L’équipe de GRIDév combine direction, coordination de projets, expertise technique et animateurs de proximité. Les photos et biographies détaillées seront ajoutées prochainement (ou directement via Sanity Studio).",
  team: [
    {
      name: "Directeur Exécutif",
      role: "Direction exécutive",
      bio: "Pilotage stratégique et représentation de l’organisation.",
    },
    {
      name: "Coordinateur de projets",
      role: "Coordination",
      bio: "Suivi de la mise en œuvre des programmes terrain.",
    },
    {
      name: "Chargé(e) santé maternelle, néonatale et infantile",
      role: "Santé / Nutrition",
      bio: "Appui aux activités de santé communautaire.",
    },
    {
      name: "Chargé(e) de suivi-évaluation",
      role: "Suivi-évaluation",
      bio: "Mesure des résultats et capitalisation.",
    },
    {
      name: "Chargé(e) d’administration et finance",
      role: "Administration & finance",
      bio: "Gestion administrative et financière.",
    },
    {
      name: "Comptable",
      role: "Comptabilité",
      bio: "Comptabilité et reporting financier.",
    },
  ],
};

export const fallbackOpportunitesPage: OpportunitesPageContent = {
  title: "Opportunités",
  intro:
    "Rejoignez ou accompagnez GRIDév : offres d’emploi, stages, bénévolat et opportunités de collaboration avec les communautés, collectivités et partenaires techniques ou financiers.",
  ctaLabel: "Postuler ou proposer",
};

export const fallbackOpportunites: OpportuniteDetail[] = [
  {
    _id: "seed-opp-emploi-1",
    title: "Chargé(e) de suivi-évaluation — Gao",
    slug: "charge-suivi-evaluation-gao",
    category: "emploi",
    summary:
      "Appuyer le suivi des programmes santé / nutrition et la capitalisation des résultats au niveau communautaire.",
    location: "Gao, Mali",
    publishedAt: "2024-10-01",
    isOpen: true,
    bodyText:
      "Missions principales\n\n- Concevoir et mettre en œuvre les plans de suivi-évaluation des projets santé et nutrition\n- Collecter, analyser et restituer les données auprès des équipes et partenaires\n- Appuyer la capitalisation des bonnes pratiques et rédiger les rapports d’avancement\n\nProfil recherché\n\n- Expérience en suivi-évaluation de projets de développement ou humanitaires\n- Maîtrise des outils de collecte de données et rédaction de rapports\n- Excellent français ; connaissance du contexte local du nord du Mali appréciée\n\nConditions\n\n- Poste basé à Gao avec déplacements terrain\n- Contrat selon profil et disponibilité des financements",
  },
  {
    _id: "seed-opp-collab-1",
    title: "Appel à partenariats techniques et financiers",
    slug: "appel-partenariats-2025",
    category: "collaboration",
    summary:
      "GRIDév recherche des alliés pour renforcer le leadership local, la paix et l’accès aux services essentiels au nord et au centre du Mali.",
    location: "Mali (Gao, Ménaka, Kidal, Tombouctou, Mopti)",
    publishedAt: "2024-09-20",
    isOpen: true,
    bodyText:
      "Nous construisons des partenariats avec des organisations paysannes, des collectivités, des ONG et des bailleurs partageant une vision commune. Domaines prioritaires : santé/nutrition, protection, agriculture, éducation, paix et gouvernance, assistance humanitaire. Contactez-nous pour explorer une collaboration.",
  },
  {
    _id: "seed-opp-stage-1",
    title: "Stage — Appui communication et capitalisation",
    slug: "stage-communication-capitalisation",
    category: "stage",
    summary:
      "Contribuer à la valorisation des expériences terrain et à la communication institutionnelle de GRIDév.",
    location: "Gao (présentiel ou hybride selon profil)",
    publishedAt: "2024-08-15",
    isOpen: true,
    bodyText:
      "Stage de 3 à 6 mois. Mission : appuyer la rédaction de contenus, la documentation de projets et la diffusion des résultats auprès des partenaires. Profil : études en communication, développement ou sciences sociales.",
  },
];

export function getFallbackOpportunite(slug: string): OpportuniteDetail | undefined {
  return fallbackOpportunites.find((o) => o.slug === slug);
}

export const categoryLabels: Record<string, string> = {
  emploi: "Offre d’emploi",
  collaboration: "Collaboration",
  stage: "Stage",
  benevolat: "Bénévolat",
};

export const fallbackProjets: ProjetDetail[] = [
  {
    _id: "seed-mihr",
    title: "USAID-MIHR — Santé et nutrition communautaire (Gao)",
    slug: "usaid-mihr-sante-nutrition-gao",
    status: "en_cours",
    startDate: "2022-09-01",
    summary:
      "Partenaire principal de USAID-MIHR pour les activités de santé et de nutrition au niveau communautaire dans la région de Gao.",
    location: "Région de Gao",
    partners: ["USAID", "MIHR"],
    bodyText:
      "Depuis septembre 2022, GRIDév est partenaire principal de USAID-MIHR pour la mise en œuvre d’activités de santé et de nutrition au niveau communautaire dans la région de Gao.",
  },
  {
    _id: "seed-kidal",
    title: "Réconciliation et emploi des jeunes et femmes (Kidal)",
    slug: "reconciliation-emploi-kidal",
    status: "en_cours",
    summary:
      "Appui aux populations de Kidal à la réconciliation pour la paix, la prévention et la résolution de conflits communautaires, via formations et création d’emploi.",
    location: "Kidal, Tessalit, Anefif",
    partners: [],
    bodyText:
      "Projet d’appui aux populations de Kidal à la réconciliation pour la paix, la prévention et la résolution de conflits communautaires à travers des formations et la création d’emploi pour les femmes, les jeunes et les victimes du conflit armé dans trois cercles de Kidal (Kidal, Tessalit, Anefif). En recherche de financement.",
  },
  {
    _id: "seed-debbo",
    title: "Debbo ALAFIA — Santé de la reproduction et VBG",
    slug: "debbo-alafia",
    status: "passe",
    startDate: "2017-05-01",
    endDate: "2018-03-31",
    summary:
      "Programme de santé de la reproduction et de lutte contre les violences basées sur le genre en milieu scolaire.",
    location: "Mali",
    partners: ["AEN"],
    bodyText:
      "De mai 2017 à mars 2018, GRIDév a participé en consortium au programme Debbo ALAFIA sous financement AEN, sur la santé de la reproduction et la lutte contre les VBG en milieu scolaire.",
  },
  {
    _id: "seed-pcp",
    title: "USAID Mali PCP — Paix et emploi à Ouatagouna",
    slug: "usaid-pcp-ouatagouna",
    status: "passe",
    summary:
      "Consolidation de la paix, résolution de conflits, prévention de l’extrémisme violent, formations professionnelles et création d’emploi.",
    location: "Ouatagouna, cercle d’Ansongo",
    partners: ["USAID"],
    bodyText:
      "Mise en œuvre d’un projet sur la consolidation de la paix, la résolution de conflits communautaires, la prévention et la lutte contre l’extrémisme violent à travers la formation professionnelle et la création d’emploi pour les jeunes et les victimes du conflit armé dans la commune de Ouatagouna (cercle d’Ansongo), financé par USAID via Mali PCP. Formations, comités de veille, digues HIMO, kits métiers, etc.",
  },
  {
    _id: "seed-eau",
    title: "Adduction d’eau — Tigoubar (Almoustrat)",
    slug: "adduction-eau-tigoubar",
    status: "passe",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    summary:
      "Réalisation d’une adduction d’eau sommaire au profit des populations d’Almoustrat.",
    location: "Tigoubar, cercle d’Almoustrat",
    partners: ["MINUSMA"],
    bodyText:
      "Conception et mise en œuvre d’un projet d’appui aux populations d’Almoustrat à travers la réalisation d’une adduction d’eau sommaire dans le village de Tigoubar (2023), sous financement de la MINUSMA.",
  },
];

export const fallbackActualites: ActualiteDetail[] = [
  {
    _id: "seed-actu-1",
    title: "GRIDév partenaire USAID-MIHR pour la santé communautaire à Gao",
    slug: "partenariat-usaid-mihr-gao",
    excerpt:
      "Depuis septembre 2022, GRIDév met en œuvre des activités de santé et de nutrition au niveau communautaire dans la région de Gao.",
    publishedAt: "2024-10-31",
    tags: ["Santé", "Gao"],
    bodyText:
      "Depuis septembre 2022, GRIDév est partenaire principal de USAID-MIHR pour la mise en œuvre d’activités de santé et de nutrition au niveau communautaire dans la région de Gao. Ce partenariat s’inscrit dans notre mission de renforcer le leadership local et d’améliorer l’accès aux services essentiels pour les populations vulnérables.",
  },
  {
    _id: "seed-actu-2",
    title: "Renforcement du leadership local : notre approche",
    slug: "approche-leadership-local",
    excerpt:
      "Lutter contre la pauvreté en valorisant les ressources et les compétences locales, de façon participative et inclusive.",
    publishedAt: "2024-09-15",
    tags: ["Mission"],
    bodyText:
      "Notre approche place les communautés au centre : programmes construits, mis en œuvre et évalués avec les bénéficiaires, implication des ressources humaines locales, solutions innovantes, durables et réplicables.",
  },
  {
    _id: "seed-actu-3",
    title: "Zones d’intervention prioritaires au nord et au centre du Mali",
    slug: "zones-intervention",
    excerpt:
      "Gao, Ménaka, Tombouctou, Kidal et Mopti restent au cœur de nos interventions terrain.",
    publishedAt: "2024-08-01",
    tags: ["Territoires"],
    bodyText:
      "GRIDév intervient dans toutes les régions du Mali et le district de Bamako, avec une priorité pour Gao, Ménaka, Tombouctou, Kidal et Mopti, auprès des communautés sédentaires, nomades et semi-nomades.",
  },
];

export function getFallbackProjet(slug: string): ProjetDetail | undefined {
  return fallbackProjets.find((p) => p.slug === slug);
}

export function getFallbackActualite(slug: string): ActualiteDetail | undefined {
  return fallbackActualites.find((a) => a.slug === slug);
}

export function filterProjets(
  items: ProjetListItem[],
  status?: string,
): ProjetListItem[] {
  if (!status || status === "tous") return items;
  return items.filter((p) => p.status === status);
}
