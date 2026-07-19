export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gridevplaceholder";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/** True when a real Sanity project id is configured (not the placeholder). */
export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "gridevplaceholder";
