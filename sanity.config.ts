import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  about,
  actualite,
  blockContent,
  opportunite,
  opportunitesPage,
  projet,
  siteSettings,
} from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["siteSettings", "about", "opportunitesPage"]);

export default defineConfig({
  name: "gridev",
  title: "ONG GRIDév",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            S.listItem()
              .title("Paramètres du site")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings"),
              ),
            S.listItem()
              .title("À propos / Identité")
              .id("about")
              .child(S.document().schemaType("about").documentId("about")),
            S.listItem()
              .title("Page Opportunités")
              .id("opportunitesPage")
              .child(
                S.document()
                  .schemaType("opportunitesPage")
                  .documentId("opportunitesPage"),
              ),
            S.divider(),
            S.documentTypeListItem("actualite").title("Actualités"),
            S.documentTypeListItem("projet").title("Projets"),
            S.documentTypeListItem("opportunite").title("Opportunités"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: [
      blockContent,
      actualite,
      projet,
      siteSettings,
      about,
      opportunitesPage,
      opportunite,
    ],
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
