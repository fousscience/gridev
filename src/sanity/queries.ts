export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  officialName, fullName, slogan, email, phones, address, footerText, heroTagline,
  logo
}`;

export const aboutQuery = `*[_type == "about"][0]{
  vision, mission, values, culture, domains, history, globalObjective,
  objectives, zones, structure, partners, teamIntro,
  president{
    sectionTitle, name, role, message,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt
  },
  team[]{
    name, role, bio,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt
  }
}`;

export const opportunitesPageQuery = `*[_type == "opportunitesPage"][0]{
  title, intro, ctaLabel
}`;

export const opportunitesQuery = `*[_type == "opportunite" && isOpen != false] | order(publishedAt desc){
  _id, title, "slug": slug.current, category, summary, location, publishedAt, isOpen
}`;

export const opportuniteBySlugQuery = `*[_type == "opportunite" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, category, summary, location, publishedAt, isOpen, body
}`;

export const actualitesQuery = `*[_type == "actualite"] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt, tags, mainImage
}`;

export const actualiteBySlugQuery = `*[_type == "actualite" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, publishedAt, tags, mainImage, body
}`;

export const projetsQuery = `*[_type == "projet"] | order(startDate desc){
  _id, title, "slug": slug.current, status, startDate, endDate, summary,
  location, partners, mainImage
}`;

export const projetBySlugQuery = `*[_type == "projet" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, status, startDate, endDate, summary,
  location, partners, mainImage, gallery, body
}`;

export const latestActualitesQuery = `*[_type == "actualite"] | order(publishedAt desc)[0...3]{
  _id, title, "slug": slug.current, excerpt, publishedAt, mainImage
}`;

export const projetsEnCoursQuery = `*[_type == "projet" && status == "en_cours"] | order(startDate desc)[0...4]{
  _id, title, "slug": slug.current, status, summary, location, mainImage
}`;
