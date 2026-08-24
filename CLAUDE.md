# CLAUDE.md — DFP France

Contexte projet pour Claude. À lire avant toute modification.

## Le projet
Site vitrine de **DFP France (Design Film Protect)** — pose de **films techniques pour vitrages** en Île-de-France : film solaire (anti-chaleur), film de sécurité, film anti-graffiti, film intelligent (opacité variable). Cibles : bureaux/tertiaire (B2B prioritaire), commerces, établissements publics, habitat.

- **Site en production** : https://dfpfrance.fr (apex = host canonique ; `www` redirige vers l'apex)
- **Repo** : `jmd971/dfpfrance` (public), branche `main`
- **Hébergement** : Vercel, **déploiement automatique à chaque push sur `main`**

## Stack & architecture
- **HTML statique pur** — pas de framework, pas de build, pas de JS applicatif (juste `js/main.js` pour menu/scroll et `js/chatbot-widget.js`).
- CSS global unique : `css/styles.css`. Polices Google : Fraunces + Manrope + JetBrains Mono.
- Chaque page est un `.html` autonome qui **duplique** header/footer/bandeau `announce`/`mobile-cta`. Pour rester cohérent, **copier ces blocs depuis une page récente** (ex. `realisations/veranda-film-solaire.html` ou `zones/champs-sur-marne.html`) plutôt que les réécrire.
- Images dans `assets/img/` (photos de chantiers nommées `chantier-*.jpg`).

## ⚠️ Déploiement = direct prod (pas de filet)
Tout commit sur `main` part **immédiatement en production** sur dfpfrance.fr. Il n'y a **pas d'environnement de démo**. Donc :
- Vérifier le HTML avant de pousser.
- **Grouper les changements en UN seul commit** (via l'API Git Data de GitHub : blobs → tree → commit → update ref) pour ne déclencher qu'un seul déploiement Vercel, surtout quand on ajoute plusieurs fichiers/images.
- Workflow : modifications via `gh api` / interface web GitHub, **jamais de clone local**.

## 🔗 Convention d'URL — IMPORTANT
`vercel.json` active **`cleanUrls: true`**. Conséquences à respecter :
- Les URLs propres **sans `.html`** sont les URLs officielles (`/contact`, `/zones/versailles`). `/contact.html` redirige vers `/contact`.
- **Toujours écrire les `<link rel="canonical">` en URL propre apex** : `https://dfpfrance.fr/zones/ma-ville` (sans `.html`).
- Liens internes : préférer les URLs propres (les liens `.html` fonctionnent mais ajoutent une redirection).
- `vercel.json` contient aussi des rewrites d'URLs courtes : `/avis` et `/avis-negatif` (parcours QR code de notation client).

## SEO — conventions
- **`sitemap.xml`** à la racine, en URLs propres apex. **À mettre à jour manuellement à chaque ajout/suppression de page.**
- **`robots.txt`** à la racine (autorise le crawl + déclare le sitemap).
- Pages **zones** (SEO local) : `zones/<ville>.html`, basées sur le template `zones/versailles.html`, avec **schema `LocalBusiness`** (JSON-LD) et **contenu local unique** (pas de copier-coller entre villes, sinon risque de « pages satellites » pénalisées). Zones existantes : Champs-sur-Marne (siège), Noisy-le-Grand, Marne-la-Vallée, Versailles. Liées depuis `zones.html` (chips cliquables).
- Pages **réalisations** : `realisations/<chantier>.html` + cartes sur `realisations.html`. **Une seule carte par chantier** sur l'index (pas de doublons menant à la même fiche).

## Règles de contenu (à ne pas enfreindre)
- **Ne jamais inventer de chiffres techniques** (TSER, % UV, transmission lumineuse) : utiliser une formulation bénéfices si les specs réelles ne sont pas fournies.
- **DFP ne fait PAS de film automobile / PPF** (protection carrosserie/pare-brise). Ignorer ces requêtes ; ne pas créer de page PPF.
- **Pas de faux chantiers** : ne lier que vers des réalisations réelles existantes.
- Ton : pro, concret, orienté bénéfice client. Français.

## Coordonnées (publiques, déjà sur le site)
- Tél : 07 69 62 89 12 · WhatsApp : +33 7 69 62 89 12 · E-mail : info@dfpfrance.fr
- Adresse / siège : 5 Rue Albert Einstein, 77420 Champs-sur-Marne
- Prise de RDV : https://webapps.dfpfrance.fr/widget/bookings/rdv-dfpfrance

## Priorités acquisition
1. SEO local (pages zones + Google Business Profile + Search Console + sitemap soumis).
2. Top requêtes réelles (Search Console) : *film solaire fenêtre, film anti-chaleur fenêtre, film fenêtre effet miroir, film anti-UV, pose film vitre bâtiment 94*.
3. Après une livraison SEO : **attendre 3-4 semaines et mesurer** dans Search Console avant d'ajouter d'autres pages.
