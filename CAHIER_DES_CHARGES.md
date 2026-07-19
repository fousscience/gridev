# Cahier des charges — Site web ONG GRIDév

**Version :** 1.1  
**Date :** 18 juillet 2026  
**Statut :** Validé pour développement  
**Stack figée :** Next.js + Sanity CMS + hébergement Vercel

---

## 1. Contexte et objectifs

### 1.1 Contexte

L’**ONG GRIDév** (Groupe de Réflexion pour les Initiatives de Développement) est une organisation à but non lucratif malienne (récépissé 046/CG du 10 avril 2010 ; accord-cadre 001619 du 23 décembre 2019). Elle œuvre à la lutte contre la pauvreté par le renforcement du leadership local, notamment à Gao, Ménaka, Kidal, Tombouctou et Mopti.

**Slogan :** « Lutter Contre la Pauvreté par le Renforcement du Leadership Local »

**Contacts :** Gao Château Secteur I Rue 345, Porte 521 · Tél. 74 77 91 30 / 69 32 51 19 · gridevmali@gmail.com

### 1.2 Objectifs

- Présenter la vision, la mission et les valeurs dès l’accueil
- Informer sur les actualités et les projets (en cours / passés)
- Faciliter contact et collaboration
- Permettre à un admin de publier du contenu via Sanity Studio
- Déployer à coût maîtrisé (tiers gratuits au démarrage)

### 1.3 Périmètre hors scope (v1)

- Boutique / dons en ligne avec paiement
- Espace membre / intranet
- Multilingue (v1 : français uniquement)
- Application mobile native
- Inventaire matériel / RH interne (hors site public)

**Sources contenus v1.1 :** logo `gridev logo.jpeg` + *Brève Présentation GRIDev* (31 oct. 2024). Voir aussi [`CONTENU_EDITORIAL.md`](CONTENU_EDITORIAL.md).

---

## 2. Publics cibles

| Public | Besoin principal |
|--------|------------------|
| Grand public / visiteurs | Comprendre GRIDév, vision/mission/valeurs, projets |
| Partenaires / collaborateurs | Contacter, proposer une collaboration |
| Médias / institutions | Infos fiables et contacts |
| Administrateur GRIDév | Publier actus et projets sans coder |

---

## 3. Architecture technique

```
Admin GRIDév → Sanity Studio → Content Lake (API)
                                      ↓
                              Next.js (App Router)
                                      ↓
                                   Vercel
                                      ↑
                         Webhook revalidate (publish)
```

| Couche | Choix | Rôle |
|--------|--------|------|
| Frontend | Next.js (App Router, TypeScript, Tailwind CSS) | Pages publiques, SEO |
| CMS | Sanity (schemas + Studio) | Contenu éditorial, médias |
| Hébergement | Vercel | Build, CDN, SSL |
| Studio | `/studio` intégré | Interface admin |
| Email | Resend | Formulaire contact → gridevmali@gmail.com |
| Fallback | Contenu statique TypeScript | Site utilisable sans Sanity configuré |

---

## 4. Structure fonctionnelle du site

### 4.1 Pages publiques

| Route | Contenu |
|-------|---------|
| `/` | Voir structure d’accueil ci-dessous |
| `/a-propos` | Historique, objectif global, structure, zones, partenaires |
| `/actualites` | Liste actualités |
| `/actualites/[slug]` | Détail actualité |
| `/projets` | Filtres En cours / Passés / Tous |
| `/projets/[slug]` | Détail projet |
| `/opportunites` | Offres d’emploi, collaborations, stages, bénévolat + CTA |
| `/contact` | Coordonnées + formulaire |
| `/mentions-legales` | Mentions légales |
| `/politique-confidentialite` | Confidentialité / RGPD |

### 4.2 Accueil `/` (structure figée)

| Ordre | Section | Contenu |
|-------|---------|---------|
| 1 | Hero full-bleed | Logo + **ONG GRIDév** + slogan + 1 phrase + CTA Contact / Projets |
| 2 | Vision | Texte vision |
| 3 | Mission | Mission + approche leadership local |
| 4 | Valeurs | 7 valeurs (+ culture) |
| 5 | Domaines | Santé/Nutrition/WASH, Protection, Agriculture, Éducation, Paix & gouvernance, Assistance humanitaire |
| 6 | Projets | Aperçu projets en cours |
| 7 | Actualités | 3 dernières |
| 8 | Opportunités | CTA → `/opportunites` |

### 4.3 Administration

- `/studio` — Sanity Studio (CRUD actus, projets, settings, about)
- Auth Sanity (Editor / Administrator)

---

## 5. Modèle de contenu Sanity

### 5.1 `actualite`
title, slug, excerpt, mainImage, publishedAt, body (Portable Text), tags

### 5.2 `projet`
title, slug, status (`en_cours` | `passe`), startDate, endDate, summary, body, mainImage, gallery, partners, location

### 5.3 `about` (singleton)
vision, mission, values[], culture, domains[], history, globalObjective, zones, partners[], structure

### 5.4 `siteSettings` (singleton)
officialName, slogan, logo, email, phones, address, footerText, socials

### 5.5 `opportunitesPage` + `opportunite`
- Singleton page : title, intro, ctaLabel
- Documents : title, slug, category (`emploi` | `collaboration` | `stage` | `benevolat`), summary, body, location, isOpen

---

## 6–8. Exigences (inchangées dans l’esprit v1.0)

Fonctionnel : actus publiées, projets filtrables, formulaire Resend, SEO, revalidation.  
Non fonctionnel : FR, HTTPS, RGPD de base, Free tiers.  
Design : marque GRIDév hero-forte ; palette indigo brand + accents étoile ; typos expressives ; hero full-bleed ; sections mono-job ; motions légères.

---

## 9. Critères d’acceptation

- [ ] Accueil : marque, vision, mission, valeurs, domaines, aperçus projets/actus, CTA
- [ ] CRUD Studio → visible après publish / revalidate
- [ ] Projets filtrables ; fiches détail OK
- [ ] À propos, Contact, Opportunités accessibles
- [ ] Formulaire → gridevmali@gmail.com (Resend configuré)
- [ ] Mentions légales + confidentialité
- [ ] Responsive
- [ ] HTTPS / déploiement Vercel

---

## 10. Validation

1. Stack Next.js + Sanity + Vercel  
2. Périmètre v1.1 ci-dessus  
3. Langue français  
4. Contenus issus de la présentation officielle + logo fourni
