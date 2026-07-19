# Guide administrateur — ONG GRIDév

Guide en français pour publier du contenu et déployer le site.

## 1. Accéder au Studio

1. Une fois le projet Sanity créé et `NEXT_PUBLIC_SANITY_PROJECT_ID` renseigné dans `.env.local` (local) ou dans Vercel (prod).
2. Ouvrir `/studio` sur le site (ex. `https://votre-domaine.com/studio` ou `http://localhost:3000/studio`).
3. Se connecter avec un compte Sanity autorisé sur le projet.

Sans Project ID, le site public continue d’afficher les **contenus de repli** ; le Studio n’est pas utilisable tant que Sanity n’est pas configuré.

## 2. Types de contenu

| Type | Usage |
|------|--------|
| **Paramètres du site** | Nom, slogan, email, téléphones, adresse, logo, texte de pied de page |
| **À propos / Identité** | Vision, mission, valeurs, **Mot du Président** (texte + photo), **Équipe** (membres + photos), domaines, historique, partenaires |
| **Page Opportunités** | Titre, introduction et libellé du formulaire de la page `/opportunites` |
| **Opportunités** | Offres (emploi, collaboration, stage, bénévolat) — une fiche par offre |
| **Actualités** | Articles (titre, slug, extrait, image, date, corps, tags) |
| **Projets** | Fiches projet (statut *en cours* / *passé*, dates, lieu, partenaires, galerie) |

Les documents « Paramètres », « À propos » et « Page Opportunités » sont des **singletons** : un seul document chacun.

## 3. Importer le contenu initial (seed)

Après création du projet Sanity :

```bash
# 1. Renseigner NEXT_PUBLIC_SANITY_PROJECT_ID dans .env.local
# 2. Se connecter à Sanity CLI si besoin : npx sanity login
# 3. Token avec droits d’écriture, puis :
npx sanity dataset import sanity/seed.ndjson production --replace
```

Ou : `npm run seed:sanity` (affiche le rappel de la commande).

Le site utilisera alors Sanity à la place des fallbacks (`src/lib/fallback.ts`).

## 4bis. Photos (Président & équipe)

Oui : dans le Studio → **À propos / Identité** → champs **Mot du Président** (Photo) et **Équipe** (Photo par membre).  
Uploadez l’image directement depuis Sanity (glisser-déposer ou bouton Upload). Pas besoin d’envoyer les fichiers au développeur une fois Sanity configuré.

Sans photo, le site affiche un avatar avec les initiales.

## 4. Publier une actualité, un projet ou une opportunité

1. Dans le Studio → **Actualités**, **Projets** ou **Opportunités**.
2. Créer un document, remplir le titre (le slug se génère souvent automatiquement).
3. Ajouter extrait, image, dates, corps de texte.
4. Pour un projet : choisir le statut **en cours** ou **passé**.
5. Pour une opportunité : choisir la catégorie (**emploi**, **collaboration**, **stage**, **bénévolat**) et cocher **Ouverte**.
6. **Publish**.

Si le webhook de revalidation est configuré, le site se met à jour sous peu. Sinon, attendre le cache ISR (~60 s) ou redeployer.

## 5. Formulaire de contact (Resend)

1. Créer un compte [Resend](https://resend.com) et une clé API.
2. Vérifier un domaine d’envoi (ou utiliser `onboarding@resend.dev` en test).
3. Variables :

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=gridevmali@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Sans clé API, les messages sont **journalisés côté serveur** (utile en local) et le formulaire affiche un succès avec avertissement technique.

## 5bis. Assistant chat (OpenRouter)

1. Créer une clé sur [OpenRouter](https://openrouter.ai/keys).
2. Dans `.env.local` (et Vercel en prod) :

```
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=openai/gpt-4o-mini
```

3. Redémarrer `npm run dev`. Le bouton **Assistance** (bas à droite) ouvre le chat.
4. Sans clé, le chat indique que le service n’est pas configuré.

La clé reste **côté serveur** (`/api/chat`) — ne jamais la mettre dans un fichier `NEXT_PUBLIC_*`.

## 6. Revalidation après publication Sanity

1. Générer un secret (ex. mot de passe long aléatoire) → `SANITY_REVALIDATE_SECRET`.
2. Dans Sanity → API → Webhooks, créer un webhook :

   - URL : `https://VOTRE_DOMAINE/api/revalidate?secret=VOTRE_SECRET`
   - Déclencheurs : create / update / delete / publish sur les documents utiles

3. Tester : publication d’une actualité → la page liste se rafraîchit.

---

## Déploiement Vercel — checklist

- [ ] Repo Git connecté à Vercel (framework **Next.js** détecté).
- [ ] Variables d’environnement (Production + Preview si besoin) :
  - [ ] `NEXT_PUBLIC_SITE_URL` = URL de prod (ex. `https://gridev.vercel.app`)
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` / `NEXT_PUBLIC_SANITY_API_VERSION`
  - [ ] `SANITY_REVALIDATE_SECRET`
  - [ ] `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- [ ] Build : `npm run build` (commande par défaut Next sur Vercel).
- [ ] CORS / hosts Sanity : ajouter le domaine Vercel dans Sanity → Settings → API → CORS origins (`https://…`, avec credentials si besoin pour le Studio).
- [ ] Importer `sanity/seed.ndjson` une fois le Project ID réel en place.
- [ ] Configurer le webhook Sanity → `/api/revalidate`.
- [ ] Vérifier : `/`, `/contact`, `/studio`, `/sitemap.xml`, envoi du formulaire.
- [ ] Domaine personnalisé (optionnel) + mise à jour de `NEXT_PUBLIC_SITE_URL`.

### Notes

- Le site **build et tourne sans Sanity ni Resend** (contenu fallback + log contact).
- Ne pas committer `.env.local` ni de tokens.
- Logo servi depuis `/brand/gridev-logo.jpeg` tant qu’aucune image n’est uploadée dans Sanity.
