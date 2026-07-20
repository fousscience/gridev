# Guide d’utilisation — Site web ONG GRIDév

Ce guide s’adresse aux personnes de l’ONG qui gèrent le **contenu** du site (actualités, projets, opportunités, contacts, équipe).  
**Vous n’avez pas besoin de connaître le code** ni GitHub.

---

## 1. Adresses utiles

| Quoi | Lien |
|------|------|
| Site public | https://gridev-amber.vercel.app |
| Espace de publication (Studio) | https://gridev-amber.vercel.app/studio |

Quand un nom de domaine propre sera branché (ex. `gridev.org`), remplacez l’adresse ci-dessus par :
- Site : `https://votredomaine.org`
- Studio : `https://votredomaine.org/studio`

---

## 2. Première connexion

1. Ouvrez le **Studio** (lien ci-dessus).
2. Connectez-vous avec le **compte Sanity** qui vous a été envoyé (souvent Google ou e-mail).
3. Si vous n’avez pas encore d’accès : contactez la personne qui administre le projet Sanity pour qu’elle **vous invite** (rôle *Editor*).

Sans invitation, vous ne pourrez pas entrer dans le Studio.

---

## 3. Vue d’ensemble du Studio

Dans le menu de gauche, vous trouverez notamment :

| Menu | À quoi ça sert |
|------|----------------|
| **Paramètres du site** | Nom de l’ONG, slogan, e-mail, téléphones, adresse, logo, texte du pied de page |
| **À propos / Identité** | Vision, mission, valeurs, Mot du Président, équipe, historique, partenaires |
| **Page Opportunités** | Texte d’introduction de la page Opportunités |
| **Actualités** | Articles / nouvelles publiés sur le site |
| **Projets** | Projets en cours ou passés |
| **Opportunités** | Offres d’emploi, partenariats, stages, bénévolat |

Les éléments « Paramètres », « À propos » et « Page Opportunités » existent **une seule fois** (pas de liste).  
Les Actualités, Projets et Opportunités sont des **listes** : vous pouvez en créer plusieurs.

---

## 3bis. Draft et Published — important

Dans le Studio, vous voyez souvent deux vues :

| Vue | Signification |
|-----|----------------|
| **Draft** (brouillon) | Ce que vous êtes en train de modifier — **pas encore** visible sur le site public si non publié |
| **Published** (publié) | Ce qui est **en ligne** sur le site |

**Règle d’or :** après vos modifications, cliquez toujours le bouton vert **Publish**.  
Si vous restez seulement en *Draft*, le site ne change pas.

Si un champ semble vide alors que le site affiche encore un texte : basculez sur **Published**, ou publiez votre brouillon après l’avoir rempli. Le site peut aussi afficher un **texte de secours** tant que le champ Sanity est vide — d’où l’intérêt de remplir puis Publish.

---

## 4. Publier une actualité

1. Menu **Actualités** → **Create** (ou bouton « Nouveau »).
2. Remplissez au minimum :
   - **Titre**
   - **Slug** (souvent généré automatiquement à partir du titre — laissez-le tel quel sauf besoin particulier)
   - **Extrait** (court résumé pour la liste)
   - **Date de publication**
   - **Corps** (texte de l’article)
   - **Image principale** (recommandé) + texte alternatif (alt)
3. Cliquez **Publish** (Publier).
4. Attendez quelques secondes, puis vérifiez sur le site : page **Actualités**.

### Modifier ou retirer une actualité

- Ouvrez l’actualité dans la liste → modifiez → **Publish**.
- Pour la retirer du site : **Unpublish** (dépublier) ou **Delete** (supprimer définitivement). Préférez *Unpublish* si vous pourriez la republier plus tard.

---

## 5. Publier ou mettre à jour un projet

1. Menu **Projets** → créer ou ouvrir un projet.
2. Remplissez :
   - **Titre**, **slug**, **résumé**
   - **Statut** : *En cours* ou *Passé* (important pour les filtres du site)
   - Dates, lieu, partenaires
   - Description, image, galerie éventuelle
3. **Publish**.
4. Vérifiez sur le site : page **Projets** (filtres En cours / Passés).

---

## 6. Publier une opportunité (emploi, partenariat, etc.)

1. Menu **Opportunités** → créer une fiche.
2. Choisissez la **catégorie** :
   - Offre d’emploi  
   - Collaboration / partenariat  
   - Stage  
   - Bénévolat  
3. Remplissez titre, résumé, lieu, description.
4. Cochez **Ouverte** si l’offre est encore active. Décochez-la quand elle est pourvue ou expirée.
5. **Publish**.
6. Vérifiez sur le site : page **Opportunités**.

Le texte d’introduction en haut de la page se modifie dans **Page Opportunités** (document unique).

---

## 7. Mot du Président et équipe

1. Ouvrez **À propos / Identité**.
2. En haut du document, utilisez les onglets :
   - **Mot du Président**
   - **Équipe**
   - Vision & mission / Organisation (le reste)
3. Onglet **Mot du Président** :
   - Nom, fonction, message  
   - Photo (Upload ou glisser-déposer) + texte alternatif
4. Onglet **Équipe** :
   - Introduction  
   - Ajoutez ou modifiez chaque membre (nom, fonction, bio courte, photo)
5. Cliquez **Publish** (obligatoire pour mettre en ligne).
6. Vérifiez sur le site : page **À propos** (rafraîchir après quelques secondes).

Sans photo, le site affiche les **initiales** de la personne.

---

## 8. Modifier les coordonnées (téléphone, e-mail, adresse)

1. Ouvrez **Paramètres du site**.
2. Mettez à jour e-mail, téléphones, adresse, slogan, logo si besoin.
3. **Publish**.
4. Vérifiez le **pied de page** et la page **Contact** du site public.

---

## 9. Après une publication : le site se met-il à jour ?

Oui, en général **en quelques secondes** (mise à jour automatique).

Si le changement n’apparaît pas :
1. Attendez 1 minute et rafraîchissez la page (Ctrl+F5).
2. Vérifiez que vous avez bien cliqué **Publish** (et pas seulement enregistré un brouillon).
3. Contactez le référent technique si le problème continue.

---

## 10. Ce que voit le public (sans le Studio)

| Page du site | Contenu typique |
|--------------|-----------------|
| Accueil | Présentation, vision, mission, valeurs, aperçu projets et actus |
| À propos | Président, équipe, historique, partenaires |
| Actualités | Liste et détail des articles |
| Projets | Liste filtrable et fiches projet |
| Opportunités | Offres et candidatures / propositions |
| Contact | Coordonnées + formulaire d’envoi de message |
| Sara (popup bas à droite) | Assistante virtuelle — s’ouvre à l’arrivée et répond aux questions courantes sur l’ONG |

Les messages du formulaire Contact arrivent sur l’adresse e-mail configurée (aujourd’hui gérée côté technique / Resend).

---

## 11. Bonnes pratiques

- Écrivez des titres clairs et des extraits courts.
- Ajoutez toujours une **image** quand c’est possible, avec un texte alternatif.
- Relisez avant de publier.
- Pour une offre pourvue : décochez **Ouverte** plutôt que de tout supprimer.
- Ne partagez pas votre compte Studio : chaque personne doit avoir **son** invitation.
- Ne modifiez pas les réglages techniques (domaine, clés API) vous-même — laissez cela au référent technique.

---

## 12. Qui contacter en cas de problème

| Problème | Qui |
|----------|-----|
| Impossible de se connecter au Studio | Référent Sanity / administrateur du projet |
| Publication OK mais site pas à jour | Référent technique (webhook / hébergement) |
| Formulaire Contact ne reçoit pas les e-mails | Référent technique (Resend) |
| Besoin d’une nouvelle page ou fonctionnalité | Développeur / référent technique |

---

## 13. Récapitulatif en 4 étapes

1. Aller sur **/studio**  
2. Se connecter  
3. Créer ou modifier le contenu  
4. Cliquer **Publish**  

C’est tout pour le quotidien de l’équipe éditoriale.
