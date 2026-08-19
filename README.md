# Trouve ton artisan

Projet réalisé par Simon CLEMENT dans le cadre de la formation Développeur web et web mobile.

Le site permet de rechercher un artisan de la région Auvergne-Rhône-Alpes, de consulter sa fiche et de remplir un formulaire de contact.

## Liens

- Site : https://trouve-ton-artisan-frontend-t6xv.onrender.com
- API : https://trouve-ton-artisan-api-sdm4.onrender.com/api/health
- Dépôt GitHub : https://github.com/KiozTwo/Devoir-Trouve-ton-artisan
- Maquettes Figma : https://www.figma.com/design/ihplUL3iLSQAA9iLKhdYzA/Sans-titre?node-id=2-2

Les services gratuits peuvent mettre quelques secondes à démarrer après une période d'inactivité.

## Technologies utilisées

- ReactJS, React Router, Bootstrap, Sass et Vite pour le frontend
- Node.js et Express pour l'API
- Sequelize pour communiquer avec la base
- MySQL/MariaDB pour les données
- Vitest et Supertest pour les tests de l'API

## Fonctions principales

- affichage des catégories depuis la base de données ;
- liste des artisans par catégorie ;
- recherche par nom ;
- fiche détaillée de chaque artisan ;
- formulaire de contact avec validation ;
- artisans du mois sur la page d'accueil ;
- pages légales et page 404 ;
- affichage adapté au mobile, à la tablette et à l'ordinateur.

## Installation en local

### Prérequis

- Node.js 20 ou une version plus récente
- MySQL 8 ou MariaDB 10.6+

### Étapes

1. Cloner ou télécharger le projet.
2. Copier le fichier `.env.example` et renommer la copie en `.env`.
3. Renseigner dans `.env` les informations de connexion à MySQL.
4. Exécuter `database/create_database.sql` puis `database/seed_database.sql` dans MySQL Workbench.
5. Ouvrir un terminal à la racine du projet.
6. Installer les dépendances :

```bash
npm install
npm run install:all
```

7. Lancer le projet :

```bash
npm run dev
```

Le site est disponible sur `http://localhost:5173` et l'API sur `http://localhost:3001/api`.

## Configuration

Exemple de fichier `.env` :

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=
DB_SSL=false
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
CONTACT_FROM=no-reply@trouve-ton-artisan.fr
```

`DB_SSL` doit être réglé sur `true` pour la base Aiven utilisée en ligne.

La configuration SMTP est facultative pour tester le projet en local. Sans SMTP, le formulaire est contrôlé par l'API, mais aucun e-mail réel n'est envoyé. En production, l'envoi des messages est configuré avec le relais SMTP de Brevo.

Pour le frontend hébergé, `VITE_API_URL` contient l'adresse publique de l'API :

```env
VITE_API_URL=https://trouve-ton-artisan-api-sdm4.onrender.com
```

## Vérifications

Depuis la racine du projet :

```bash
npm test
npm run build
```

- `npm test` lance les tests de l'API.
- `npm run build` crée la version de production du frontend.
- `/api/health` vérifie la connexion entre l'API et la base de données.

## Organisation des dossiers

- `client/` : application React
- `server/` : API Express et modèles Sequelize
- `database/` : scripts SQL de création et d'alimentation
- `docs/` : dossier final, MCD, MLD et sécurité

## Hébergement

- frontend statique : Render ;
- API Node.js : Render ;
- base MySQL : Aiven.

Les mots de passe et les autres informations sensibles sont placés dans les variables d'environnement et ne sont pas enregistrés sur GitHub.

