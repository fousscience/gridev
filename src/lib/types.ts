export type SiteSettings = {
  officialName: string;
  fullName: string;
  slogan: string;
  email: string;
  phones: string[];
  address: string;
  footerText: string;
  heroTagline: string;
  logoUrl?: string;
};

export type ValueItem = { title: string; text: string };

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  photoAlt?: string;
};

export type PresidentMessage = {
  sectionTitle: string;
  name: string;
  role: string;
  message: string;
  photoUrl?: string;
  photoAlt?: string;
};

export type AboutContent = {
  vision: string;
  mission: string;
  values: ValueItem[];
  culture: string;
  domains: string[];
  history: string;
  globalObjective: string;
  objectives: string[];
  zones: string;
  structure: string[];
  partners: string[];
  president: PresidentMessage;
  teamIntro: string;
  team: TeamMember[];
};

export type OpportunitesPageContent = {
  title: string;
  intro: string;
  ctaLabel: string;
};

export type OpportuniteCategory =
  | "emploi"
  | "collaboration"
  | "stage"
  | "benevolat";

export type OpportuniteListItem = {
  _id: string;
  title: string;
  slug: string;
  category: OpportuniteCategory;
  summary: string;
  location?: string;
  publishedAt?: string;
  isOpen?: boolean;
};

export type OpportuniteDetail = OpportuniteListItem & {
  body?: unknown;
  bodyText?: string;
};

export type ActualiteListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags?: string[];
  imageUrl?: string;
};

export type ActualiteDetail = ActualiteListItem & {
  body?: unknown;
  bodyText?: string;
};

export type ProjetStatus = "en_cours" | "passe";

export type ProjetListItem = {
  _id: string;
  title: string;
  slug: string;
  status: ProjetStatus;
  startDate?: string;
  endDate?: string;
  summary: string;
  location?: string;
  partners?: string[];
  imageUrl?: string;
};

export type ProjetDetail = ProjetListItem & {
  body?: unknown;
  bodyText?: string;
  galleryUrls?: string[];
};
