# ONG GRIDév — Site web

Site vitrine de l’ONG GRIDév (Groupe de Réflexion pour les Initiatives de Développement), organisation malienne basée à Gao.

Stack : **Next.js 16** (App Router) · **Sanity** (CMS) · **Resend** (formulaire contact) · **Tailwind CSS 4** · **Vercel**.

## Documentation

| Document | Public |
|----------|--------|
| [GUIDE_UTILISATION.md](GUIDE_UTILISATION.md) | Équipe ONG — publier du contenu (sans code) |
| [GUIDE_ADMIN.md](GUIDE_ADMIN.md) | Référent technique — Studio, Resend, webhooks, déploiement |
| [CAHIER_DES_CHARGES.md](CAHIER_DES_CHARGES.md) | Spécifications du projet |
| [MISE_EN_PRODUCTION.md](MISE_EN_PRODUCTION.md) | Checklist mise en production |

Sans projet Sanity ni clé Resend, le site fonctionne en local grâce aux contenus de repli (`src/lib/fallback.ts`).

## Prérequis

- Node.js 20+
- npm

## Démarrage local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Le Studio Sanity (si configuré) : [http://localhost:3000/studio](http://localhost:3000/studio).

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Servir le build |
| `npm run lint` | ESLint |
| `npm run seed:sanity` | Aide pour importer `sanity/seed.ndjson` |

## Variables d’environnement

Voir `.env.example`. Principales clés :

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Projet Sanity (laisser vide → fallbacks) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (`production` par défaut) |
| `SANITY_REVALIDATE_SECRET` | Secret webhook → `/api/revalidate` |
| `RESEND_API_KEY` | Envoi email contact (sinon log serveur) |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Destinataire / expéditeur |
| `OPENROUTER_API_KEY` | Assistante Sara (chat) |
| `OPENROUTER_MODEL` | Modèle OpenRouter (défaut `openai/gpt-4o-mini`) |
| `NEXT_PUBLIC_SITE_URL` | URL publique (sitemap, metadata) |

## Pages publiques

- `/` — Accueil (vision, mission, valeurs, projets, actualités)
- `/a-propos` — Identité, domaines, structure, partenaires
- `/actualites` et `/actualites/[slug]`
- `/projets` et `/projets/[slug]` (filtres en cours / passés)
- `/opportunites` et `/opportunites/[slug]` (emplois, partenariats, stages…)
- `/contact` (formulaire + API `/api/contact`)
- `/mentions-legales`, `/politique-confidentialite`
- `/studio` — CMS Sanity
- `/sitemap.xml`, `/robots.txt`

## Contenu éditorial & seed

- Référence rédactionnelle : `CONTENU_EDITORIAL.md`
- Cahier des charges : `CAHIER_DES_CHARGES.md`
- Logo : `public/brand/gridev-logo.jpeg`
- Seed Sanity : `sanity/seed.ndjson` (voir `sanity/seed-readme.ts` et `GUIDE_ADMIN.md`)

## Documentation admin & déploiement

- Guide éditeurs / Studio : [`GUIDE_ADMIN.md`](./GUIDE_ADMIN.md)
- Checklist Vercel : section « Déploiement Vercel » dans `GUIDE_ADMIN.md`
