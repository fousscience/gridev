# Mise en production — checklist GRIDév

Ordre recommandé : **Sanity → Resend → Vercel**.

## 1. Sanity (CMS)

1. Crée un compte / connecte-toi : https://www.sanity.io/manage  
2. **Create project** → nom `gridev` → dataset `production`  
3. Copie le **Project ID**  
4. Dans `.env.local` :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ton_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

5. CORS : Sanity → Project → API → CORS origins  
   - `http://localhost:3000`  
   - ton URL Vercel (`https://xxx.vercel.app`)  
6. Importe le contenu seed :

```bash
npx sanity login
npx sanity dataset import sanity/seed.ndjson production --replace
```

7. Ouvre `http://localhost:3000/studio` → publie Mot du Président, équipe, photos.

## 2. Resend (emails contact)

1. Compte : https://resend.com  
2. API Keys → Create → copie la clé  
3. Dans `.env.local` :

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=gridevmali@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

(`onboarding@resend.dev` fonctionne pour les tests ; pour la prod, vérifie un domaine.)

## 3. Vercel (site public)

1. Commit / push le projet sur **GitHub** (repo dédié `gridev`, pas le dossier utilisateur Windows).  
2. https://vercel.com → Import du repo  
3. Variables d’environnement (Production + Preview) — copier depuis `.env.local` :  
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`  
   - `NEXT_PUBLIC_SANITY_DATASET`  
   - `SANITY_REVALIDATE_SECRET`  
   - `OPENROUTER_API_KEY`  
   - `OPENROUTER_MODEL`  
   - `RESEND_API_KEY`  
   - `CONTACT_TO_EMAIL`  
   - `CONTACT_FROM_EMAIL`  
   - `NEXT_PUBLIC_SITE_URL` = `https://ton-domaine.vercel.app`  
4. Deploy  
5. Sanity webhook :  
   - URL : `https://TON_DOMAINE/api/revalidate?secret=SANITY_REVALIDATE_SECRET`  
   - Trigger : create / update / delete / publish  
6. CORS Sanity : ajouter l’URL Vercel  

## Déjà prêt en local

- `SANITY_REVALIDATE_SECRET` généré dans `.env.local`  
- Repo Git initialisé **dans** le dossier du projet  
- Seed : `sanity/seed.ndjson`  
- Build OK, chat OpenRouter déjà configuré  
