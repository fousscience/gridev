import type { MetadataRoute } from "next";
import { getActualites, getProjets } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [actus, projets] = await Promise.all([getActualites(), getProjets()]);

  const staticRoutes = [
    "",
    "/a-propos",
    "/actualites",
    "/projets",
    "/contact",
    "/opportunites",
    "/mentions-legales",
    "/politique-confidentialite",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...actus.map((a) => ({
      url: `${base}/actualites/${a.slug}`,
      lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...projets.map((p) => ({
      url: `${base}/projets/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
