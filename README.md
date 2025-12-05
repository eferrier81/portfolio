# Portfolio – Enzo Ferrier

Portfolio personnel d’**Enzo Ferrier**, étudiant ingénieur en 4e année à **ISIS Castres**, spécialisé en **Intelligence Artificielle** et **systèmes d’information en santé**.

Ce dépôt contient le code source de mon site de portfolio, une page statique moderne hébergée sur **GitHub Pages**, développée avec **HTML5 / CSS3 / JavaScript vanilla** (aucun framework ni build).

---

## Aperçu

- Section d’accueil (hero) avec photo, accroche et liens rapides
- Sections : À propos, Compétences, Projets, Expériences, Contact
- Projets mis en avant : Nuit de l’Info, ALPOS (avec diaporama), projets académiques
- Formulaire de contact fonctionnel (via un service externe type Formspree)

---

## Structure du projet

```text
portfolio/
├── index.html      # Page principale du portfolio
├── style.css       # Styles globaux (layout, couleurs, responsive)
├── script.js       # Interactions (menu mobile, diaporama, formulaire)
├── README.md       # Ce fichier
└── assets/
      ├── images/     # Photos (portrait, fonds, etc.)
      ├── icons/      # Favicons, icônes SVG éventuelles
      └── projects/   # Visuels de projets (captures d'écran, logos)
```

---

## Utilisation en local

Aucune dépendance ni build n’est nécessaire.

1. Cloner le dépôt :

```bash
git clone https://github.com/eferrier81/portfolio.git
cd portfolio
```

2. Lancer le site :

- Ouvrir `index.html` directement dans le navigateur, **ou**
- Utiliser un petit serveur local (recommandé pour tester les chemins relatifs).

### Avec Python (3.x)

```bash
python -m http.server 8000
```

Puis ouvrir : <http://localhost:8000>

### Avec VS Code (Live Server)

- Installer l’extension **Live Server**
- Clic droit sur `index.html` → **Open with Live Server**

---

## Déploiement sur GitHub Pages

### Option 1 : dépôt `eferrier81.github.io`

1. Créer un dépôt public nommé **`eferrier81.github.io`**
2. Copier tout le contenu de ce projet à la racine du dépôt
3. Pousser sur la branche `main` :

```bash
git add .
git commit -m "Initialisation du portfolio"
git push origin main
```

4. Le site sera disponible à l’adresse : <https://eferrier81.github.io>

### Option 2 : dépôt `portfolio`

1. Créer un dépôt public nommé par exemple **`portfolio`**
2. Pousser le code sur la branche `main`
3. Dans GitHub : **Settings → Pages** :
    - **Source** : sélectionner **Deploy from a branch**
    - **Branch** : choisir `main` et `/ (root)`
4. Le site sera disponible à l’adresse : <https://eferrier81.github.io/portfolio>

---

## Personnalisation rapide

- **Photo** :
  - Remplacer `assets/images/portrait.jpg` par votre photo
- **Coordonnées** :
  - Mettre à jour l’email et le lien LinkedIn dans la section `Contact` de `index.html`
- **Projets** :
  - Adapter les titres, descriptions, logos et liens GitHub/démos dans la section `#projects`

Les principales couleurs et styles se trouvent en haut de `style.css` (variables CSS `:root`).

---

## Accessibilité & bonnes pratiques

- HTML sémantique : sections structurées (`<header>`, `<main>`, `<section>`, `<footer>`)
- Couleurs prévues pour un bon contraste sur fond sombre
- Navigation clavier : liens principaux et boutons accessibles
- Animations légères (scroll, diaporama) sans dépendance externe

---

## Idées d’évolution

- Filtrage des projets (par type ou technologie)
- Ajout d’un blog statique (articles Markdown → HTML)
- Version bilingue français / anglais