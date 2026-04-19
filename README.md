# DFP France — Site web

Site HTML statique pour DFP France (Design Film Protect), spécialiste de la pose de films techniques pour vitrages en Île-de-France.

## Contenu du package

```
dfpfrance/
├── css/
│   └── styles.css                          # CSS global (fondation design)
├── js/
│   └── main.js                             # Interactions (menu, scroll reveal, form)
├── index.html                              # Page d'accueil
├── services/
│   ├── film-solaire.html                   # Service phare (SEO été)
│   ├── film-securite.html                  # Film anti-effraction
│   ├── film-anti-graffiti.html             # Film anti-graffiti
│   └── film-intelligent.html               # Film à opacité variable (PDLC)
├── secteurs/
│   └── bureaux.html                        # CIBLE PRINCIPALE B2B
├── zones/
│   └── versailles.html                     # Template page ville (SEO local)
├── realisations.html                       # Index filtrable
├── realisations/
│   └── bureaux-versailles.html             # Fiche chantier détaillée (exemple)
├── contact.html                            # Page contact avec formulaire
├── a-propos.html                           # Storytelling entreprise
├── blog.html                               # Index blog
├── blog/
│   └── decret-tertiaire-films-solaires.html # Article pilier B2B
├── assets/img/                             # Vide — à remplir avec vraies photos chantiers
└── README.md
```

**13 pages de contenu unique**, toutes optimisées SEO (meta, schema markup, structure Hn, maillage interne).

---

## Identité visuelle — résumé

- **Palette** : crème chaude (#F6F3EC) + encre (#0E1013) + ambre signature (#C26A3A)
- **Typographie** : Fraunces (display) + Manrope (body) + JetBrains Mono (data)
- **Direction artistique** : tertiaire premium éditorial, photos grand format, grille magazine architecture
- **Différenciation vs concurrents** : rupture avec le bleu corporate générique, tonalité "artisan d'exception" plutôt que "artisan du coin"

---

## Mise en ligne — options

### Option 1 : Hébergement statique (le plus simple)

Ce site est du HTML/CSS/JS pur. Il peut être déployé en 5 minutes sur :
- **Netlify** ou **Vercel** (drag & drop du dossier — gratuit pour un site de cette taille)
- **OVH**, **Hostinger**, **O2Switch** (upload FTP simple)
- **GitHub Pages** (gratuit si repo public)

### Option 2 : Migration vers WordPress (recommandée à terme)

Pour faciliter l'ajout de contenu par le client :
1. WordPress sur O2Switch (hébergement FR, support FR, prix correct)
2. Thème léger : **GeneratePress** ou **Kadence** (gratuits + version pro ~60€/an)
3. Plugins essentiels :
   - **RankMath** (SEO — gratuit suffit au démarrage)
   - **WP Rocket** (cache — 60€/an, indispensable pour les Core Web Vitals)
   - **Smush** (compression images — gratuit)
   - **WPForms** ou **Fluent Forms** (formulaires)
   - **Custom Post Type UI** + **ACF** (pour les fiches réalisations)

Le HTML actuel peut servir de **référence visuelle** au développeur qui intégrera sous WordPress — le CSS est déjà écrit, il suffit de le réutiliser.

---

## Configuration avant mise en ligne

### 1. Remplacer les placeholders (obligatoire)

- [ ] **Photos de chantiers** : toutes les images actuelles viennent d'Unsplash (banque libre). Les remplacer par des photos réelles du client au fur et à mesure. Dossier cible : `assets/img/`
- [ ] **Formulaire de contact** : actuellement en mode démo (affiche un "Merci" après 1 seconde). À connecter à un service d'envoi :
  - Option simple : **Formspree** (gratuit jusqu'à 50 envois/mois)
  - Option pro : endpoint API custom (Node, PHP, etc.)
  - Voir `js/main.js` lignes 45-55 pour le point de branchement
- [ ] **Avis Google** : actuellement en dur sur la home (3 avis). À terme, connecter un widget live type **Trustoo** ou **Elfsight** pour afficher les 7 avis réels en temps réel
- [ ] **Mentions légales, CGV, politique de confidentialité** : placeholders à remplir (pages à créer : `/mentions-legales.html`, `/cgv.html`, `/politique-confidentialite.html`)

### 2. Tracking analytics

Avant mise en ligne, ajouter dans le `<head>` de toutes les pages :
- **Google Analytics 4** (GA4)
- **Google Search Console** (balise de vérification)
- **Bannière cookies RGPD** (Axeptio ou équivalent)

### 3. SEO — actions à faire après mise en ligne

- [ ] Soumettre le sitemap XML à Google Search Console (`https://dfpfrance.fr/sitemap.xml` à générer via RankMath ou manuellement)
- [ ] Mettre en place les **redirections 301** depuis les anciennes URLs GHL (liste à fournir séparément)
- [ ] Mettre à jour la fiche **Google Business Profile** avec le nouveau site
- [ ] Demander les premiers avis Google post-refonte (2-3 clients récents suffisent pour confirmer la dynamique)

### 4. À terme — pages supplémentaires à créer

Selon le plan d'éditorialisation (voir arborescence du brief stratégique) :
- Pages services manquantes : **film décoratif / dépoli**
- Pages secteurs manquantes : **commerces, établissements publics, habitat, industrie**
- Pages villes supplémentaires (14 restantes après Versailles) : Champs-sur-Marne, Noisy-le-Grand, Vélizy-Villacoublay, Saint-Germain-en-Laye, Poissy, Sartrouville, etc.
- 14 réalisations supplémentaires (pour atteindre 15 au lancement)
- 4 articles blog piliers supplémentaires

Chaque page existante sert de **template** pour dupliquer et adapter le contenu.

---

## Saisonnalité — actions urgentes avant l'été

Le site est conçu avec la **bannière saisonnalité été 2026** en haut de chaque page. C'est un élément stratégique :
- Active dès maintenant (jusqu'en juillet)
- À désactiver en septembre ou à remplacer par une bannière hiver ("Anticipez les économies de chauffage")
- Pilotable depuis un seul endroit (CSS class `.announce` dans chaque HTML — migrerait idéalement vers un include PHP ou composant WP)

---

## Performance & accessibilité

- Mobile-first responsive (burger menu < 960px, sticky CTA bar < 640px)
- Images en `loading="lazy"` (hors hero)
- Fonts Google en `preconnect`
- Zéro dépendance JavaScript externe (vanilla)
- Animations respectent `prefers-reduced-motion`
- Contrast ratio WCAG AA partout
- Schema.org : LocalBusiness, Service, FAQPage, BlogPosting, Article, BreadcrumbList

**Lighthouse attendu** : 95-100 sur toutes les métriques hors optimisation images CDN.

---

## Contact technique

Pour toute question sur le code ou l'adaptation : le CSS est documenté en 25 sections dans `css/styles.css`. Toutes les variables sont définies au début (palette, typo, spacing) — modification centralisée possible.

© 2026 DFP France — Tous droits réservés.
