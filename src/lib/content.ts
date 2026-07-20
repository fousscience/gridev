import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { urlFor } from "@/sanity/image";
import {
  aboutQuery,
  actualiteBySlugQuery,
  actualitesQuery,
  latestActualitesQuery,
  opportuniteBySlugQuery,
  opportunitesPageQuery,
  opportunitesQuery,
  projetBySlugQuery,
  projetsEnCoursQuery,
  projetsQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import {
  fallbackAbout,
  fallbackActualites,
  fallbackOpportunites,
  fallbackOpportunitesPage,
  fallbackProjets,
  fallbackSettings,
  getFallbackActualite,
  getFallbackOpportunite,
  getFallbackProjet,
} from "./fallback";
import type {
  AboutContent,
  ActualiteDetail,
  ActualiteListItem,
  OpportuniteDetail,
  OpportuniteListItem,
  OpportunitesPageContent,
  ProjetDetail,
  ProjetListItem,
  SiteSettings,
} from "./types";

function imageUrl(img: unknown): string | undefined {
  if (!img || typeof img !== "object") return undefined;
  try {
    return urlFor(img as Parameters<typeof urlFor>[0]).width(1200).url();
  } catch {
    return undefined;
  }
}

async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params ?? {}, {
      next: { revalidate: 60, tags: ["sanity"] },
    });
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await safeFetch<{
    officialName?: string;
    fullName?: string;
    slogan?: string;
    email?: string;
    phones?: string[];
    address?: string;
    footerText?: string;
    heroTagline?: string;
    logo?: unknown;
  }>(siteSettingsQuery);

  if (!data) return fallbackSettings;

  return {
    officialName: data.officialName || fallbackSettings.officialName,
    fullName: data.fullName || fallbackSettings.fullName,
    slogan: data.slogan || fallbackSettings.slogan,
    email: data.email || fallbackSettings.email,
    phones: data.phones?.length ? data.phones : fallbackSettings.phones,
    address: data.address || fallbackSettings.address,
    footerText: data.footerText || fallbackSettings.footerText,
    heroTagline: data.heroTagline || fallbackSettings.heroTagline,
    logoUrl: imageUrl(data.logo) || fallbackSettings.logoUrl,
  };
}

export async function getAbout(): Promise<AboutContent> {
  const data = await safeFetch<{
    vision?: string;
    mission?: string;
    values?: AboutContent["values"];
    culture?: string;
    domains?: string[];
    history?: string;
    globalObjective?: string;
    objectives?: string[];
    zones?: string;
    structure?: string[];
    partners?: string[];
    teamIntro?: string;
    president?: Partial<AboutContent["president"]> | null;
    team?: AboutContent["team"] | null;
  }>(aboutQuery);

  if (!data) return fallbackAbout;

  const president = data.president
    ? {
        sectionTitle:
          data.president.sectionTitle || fallbackAbout.president.sectionTitle,
        name: data.president.name || fallbackAbout.president.name,
        role: data.president.role || fallbackAbout.president.role,
        message: data.president.message || fallbackAbout.president.message,
        photoUrl: data.president.photoUrl,
        photoAlt: data.president.photoAlt,
      }
    : fallbackAbout.president;

  return {
    vision: data.vision || fallbackAbout.vision,
    mission: data.mission || fallbackAbout.mission,
    values: data.values?.length ? data.values : fallbackAbout.values,
    culture: data.culture || fallbackAbout.culture,
    domains: data.domains?.length ? data.domains : fallbackAbout.domains,
    history: data.history || fallbackAbout.history,
    globalObjective: data.globalObjective || fallbackAbout.globalObjective,
    objectives: data.objectives?.length ? data.objectives : fallbackAbout.objectives,
    zones: data.zones || fallbackAbout.zones,
    structure: data.structure?.length ? data.structure : fallbackAbout.structure,
    partners: data.partners?.length ? data.partners : fallbackAbout.partners,
    president,
    teamIntro: data.teamIntro || fallbackAbout.teamIntro,
    team: data.team?.length ? data.team : fallbackAbout.team,
  };
}

export async function getOpportunitesPage(): Promise<OpportunitesPageContent> {
  const data = await safeFetch<Partial<OpportunitesPageContent>>(opportunitesPageQuery);
  if (!data) return fallbackOpportunitesPage;
  return {
    title: data.title || fallbackOpportunitesPage.title,
    intro: data.intro || fallbackOpportunitesPage.intro,
    ctaLabel: data.ctaLabel || fallbackOpportunitesPage.ctaLabel,
  };
}

export async function getOpportunites(): Promise<OpportuniteListItem[]> {
  const data = await safeFetch<
    Array<{
      _id: string;
      title: string;
      slug: string;
      category: OpportuniteListItem["category"];
      summary?: string;
      location?: string;
      publishedAt?: string;
      isOpen?: boolean;
    }>
  >(opportunitesQuery);

  if (!data?.length) {
    return fallbackOpportunites.map(({ bodyText: _, body: __, ...rest }) => rest);
  }

  return data.map((o) => ({
    _id: o._id,
    title: o.title,
    slug: o.slug,
    category: o.category,
    summary: o.summary || "",
    location: o.location,
    publishedAt: o.publishedAt,
    isOpen: o.isOpen,
  }));
}

export async function getOpportuniteBySlug(slug: string): Promise<OpportuniteDetail | null> {
  const data = await safeFetch<{
    _id: string;
    title: string;
    slug: string;
    category: OpportuniteListItem["category"];
    summary?: string;
    location?: string;
    publishedAt?: string;
    isOpen?: boolean;
    body?: unknown;
  }>(opportuniteBySlugQuery, { slug });

  if (!data) return getFallbackOpportunite(slug) ?? null;

  const fallback = getFallbackOpportunite(slug);
  const hasBody = Array.isArray(data.body) && data.body.length > 0;

  return {
    _id: data._id,
    title: data.title,
    slug: data.slug,
    category: data.category,
    summary: data.summary || fallback?.summary || "",
    location: data.location ?? fallback?.location,
    publishedAt: data.publishedAt ?? fallback?.publishedAt,
    isOpen: data.isOpen ?? fallback?.isOpen,
    body: hasBody ? data.body : undefined,
    bodyText: hasBody ? undefined : fallback?.bodyText,
  };
}

export async function getActualites(): Promise<ActualiteListItem[]> {
  const data = await safeFetch<
    Array<{
      _id: string;
      title: string;
      slug: string;
      excerpt?: string;
      publishedAt?: string;
      tags?: string[];
      mainImage?: unknown;
    }>
  >(actualitesQuery);

  if (!data?.length) {
    return fallbackActualites.map(({ bodyText: _, body: __, ...rest }) => rest);
  }

  return data.map((a) => ({
    _id: a._id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt || "",
    publishedAt: a.publishedAt || "",
    tags: a.tags,
    imageUrl: imageUrl(a.mainImage),
  }));
}

export async function getActualiteBySlug(slug: string): Promise<ActualiteDetail | null> {
  const data = await safeFetch<{
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt?: string;
    tags?: string[];
    mainImage?: unknown;
    body?: unknown;
  }>(actualiteBySlugQuery, { slug });

  if (!data) return getFallbackActualite(slug) ?? null;

  return {
    _id: data._id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || "",
    publishedAt: data.publishedAt || "",
    tags: data.tags,
    imageUrl: imageUrl(data.mainImage),
    body: data.body,
  };
}

export async function getLatestActualites(): Promise<ActualiteListItem[]> {
  const data = await safeFetch<
    Array<{
      _id: string;
      title: string;
      slug: string;
      excerpt?: string;
      publishedAt?: string;
      mainImage?: unknown;
    }>
  >(latestActualitesQuery);

  if (!data?.length) {
    return fallbackActualites.slice(0, 3).map(({ bodyText: _, body: __, ...rest }) => rest);
  }

  return data.map((a) => ({
    _id: a._id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt || "",
    publishedAt: a.publishedAt || "",
    imageUrl: imageUrl(a.mainImage),
  }));
}

export async function getProjets(): Promise<ProjetListItem[]> {
  const data = await safeFetch<
    Array<{
      _id: string;
      title: string;
      slug: string;
      status: "en_cours" | "passe";
      startDate?: string;
      endDate?: string;
      summary?: string;
      location?: string;
      partners?: string[];
      mainImage?: unknown;
    }>
  >(projetsQuery);

  if (!data?.length) {
    return fallbackProjets.map(({ bodyText: _, body: __, galleryUrls: ___, ...rest }) => rest);
  }

  return data.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    status: p.status,
    startDate: p.startDate,
    endDate: p.endDate,
    summary: p.summary || "",
    location: p.location,
    partners: p.partners,
    imageUrl: imageUrl(p.mainImage),
  }));
}

export async function getProjetsEnCours(): Promise<ProjetListItem[]> {
  const data = await safeFetch<
    Array<{
      _id: string;
      title: string;
      slug: string;
      status: "en_cours" | "passe";
      summary?: string;
      location?: string;
      mainImage?: unknown;
    }>
  >(projetsEnCoursQuery);

  if (!data?.length) {
    return fallbackProjets
      .filter((p) => p.status === "en_cours")
      .map(({ bodyText: _, body: __, galleryUrls: ___, ...rest }) => rest);
  }

  return data.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    status: p.status,
    summary: p.summary || "",
    location: p.location,
    imageUrl: imageUrl(p.mainImage),
  }));
}

export async function getProjetBySlug(slug: string): Promise<ProjetDetail | null> {
  const data = await safeFetch<{
    _id: string;
    title: string;
    slug: string;
    status: "en_cours" | "passe";
    startDate?: string;
    endDate?: string;
    summary?: string;
    location?: string;
    partners?: string[];
    mainImage?: unknown;
    gallery?: unknown[];
    body?: unknown;
  }>(projetBySlugQuery, { slug });

  if (!data) return getFallbackProjet(slug) ?? null;

  return {
    _id: data._id,
    title: data.title,
    slug: data.slug,
    status: data.status,
    startDate: data.startDate,
    endDate: data.endDate,
    summary: data.summary || "",
    location: data.location,
    partners: data.partners,
    imageUrl: imageUrl(data.mainImage),
    galleryUrls: data.gallery?.map((g) => imageUrl(g)).filter(Boolean) as string[] | undefined,
    body: data.body,
  };
}
