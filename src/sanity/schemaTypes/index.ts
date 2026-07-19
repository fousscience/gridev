import { defineField, defineType } from "sanity";

export const blockContent = defineType({
  title: "Contenu riche",
  name: "blockContent",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Titre 2", value: "h2" },
        { title: "Titre 3", value: "h3" },
        { title: "Citation", value: "blockquote" },
      ],
      lists: [
        { title: "Puces", value: "bullet" },
        { title: "Numéroté", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Gras", value: "strong" },
          { title: "Italique", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Lien",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) =>
                  Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
    },
  ],
});

export const actualite = defineType({
  name: "actualite",
  title: "Actualité",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({ name: "excerpt", title: "Extrait", type: "text", rows: 3 }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt" }],
    }),
    defineField({ name: "publishedAt", title: "Date de publication", type: "datetime" }),
    defineField({ name: "body", title: "Corps", type: "blockContent" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    {
      title: "Date de publication",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "publishedAt" },
  },
});

export const projet = defineType({
  name: "projet",
  title: "Projet",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "status",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "En cours", value: "en_cours" },
          { title: "Passé", value: "passe" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: "startDate", title: "Date de début", type: "date" }),
    defineField({ name: "endDate", title: "Date de fin", type: "date" }),
    defineField({ name: "summary", title: "Résumé", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Description", type: "blockContent" }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt" }],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt" }],
        },
      ],
    }),
    defineField({
      name: "partners",
      title: "Partenaires",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "location", title: "Localisation", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "mainImage" },
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({ name: "officialName", title: "Nom officiel", type: "string" }),
    defineField({ name: "fullName", title: "Nom complet", type: "string" }),
    defineField({ name: "slogan", title: "Slogan", type: "text", rows: 2 }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "phones",
      title: "Téléphones",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "address", title: "Adresse", type: "text", rows: 2 }),
    defineField({ name: "footerText", title: "Texte pied de page", type: "text", rows: 2 }),
    defineField({ name: "heroTagline", title: "Accroche hero", type: "text", rows: 3 }),
  ],
});

export const about = defineType({
  name: "about",
  title: "À propos / Identité",
  type: "document",
  fields: [
    defineField({ name: "vision", title: "Vision", type: "text", rows: 8 }),
    defineField({ name: "mission", title: "Mission", type: "text", rows: 8 }),
    defineField({
      name: "values",
      title: "Valeurs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Titre" },
            { name: "text", type: "text", title: "Texte", rows: 3 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({ name: "culture", title: "Culture", type: "text", rows: 5 }),
    defineField({
      name: "domains",
      title: "Domaines d'intervention",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "history", title: "Historique", type: "text", rows: 10 }),
    defineField({ name: "globalObjective", title: "Objectif global", type: "text", rows: 5 }),
    defineField({
      name: "objectives",
      title: "Axes / objectifs",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "zones", title: "Zones d'intervention", type: "text", rows: 4 }),
    defineField({
      name: "structure",
      title: "Structure",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "partners",
      title: "Partenaires",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "president",
      title: "Mot du Président",
      type: "object",
      fields: [
        { name: "sectionTitle", type: "string", title: "Titre de section", initialValue: "Mot du Président" },
        { name: "name", type: "string", title: "Nom" },
        { name: "role", type: "string", title: "Fonction", initialValue: "Président" },
        { name: "message", type: "text", title: "Message", rows: 10 },
        {
          name: "photo",
          type: "image",
          title: "Photo",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
        },
      ],
    }),
    defineField({
      name: "teamIntro",
      title: "Introduction équipe",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "team",
      title: "Équipe",
      type: "array",
      of: [
        {
          type: "object",
          name: "member",
          fields: [
            { name: "name", type: "string", title: "Nom", validation: (R) => R.required() },
            { name: "role", type: "string", title: "Fonction" },
            { name: "bio", type: "text", title: "Bio courte", rows: 3 },
            {
              name: "photo",
              type: "image",
              title: "Photo",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
            },
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "photo" },
          },
        },
      ],
    }),
  ],
});

export const opportunitesPage = defineType({
  name: "opportunitesPage",
  title: "Page Opportunités",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 6 }),
    defineField({ name: "ctaLabel", title: "Libellé CTA", type: "string" }),
  ],
});

export const opportunite = defineType({
  name: "opportunite",
  title: "Opportunité",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Offre d'emploi", value: "emploi" },
          { title: "Collaboration / partenariat", value: "collaboration" },
          { title: "Stage", value: "stage" },
          { title: "Bénévolat", value: "benevolat" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: "summary", title: "Résumé", type: "text", rows: 3 }),
    defineField({ name: "location", title: "Lieu", type: "string" }),
    defineField({ name: "publishedAt", title: "Date de publication", type: "datetime" }),
    defineField({
      name: "isOpen",
      title: "Ouverte",
      type: "boolean",
      initialValue: true,
      description: "Décochez pour archiver / pourvoir l'offre",
    }),
    defineField({ name: "body", title: "Description", type: "blockContent" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
