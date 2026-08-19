# Trouve ton artisan

Projet réalisé par Simon CLEMENT dans le cadre de la formation Développeur web et web mobile.

Cette application permet de rechercher un artisan de la région Auvergne-Rhône-Alpes, de consulter sa fiche et de lui envoyer un message avec le formulaire de contact.

## Liens du projet

- Site en ligne : https://trouve-ton-artisan-frontend-t6xv.onrender.com
- API : https://trouve-ton-artisan-api-sdm4.onrender.com/api/health
- Dépôt GitHub : https://github.com/KiozTwo/Devoir-Trouve-ton-artisan
- Maquettes Figma : https://www.figma.com/design/ihplUL3iLSQAA9iLKhdYzA/Sans-titre?node-id=2-2

Les services gratuits peuvent prendre quelques secondes pour démarrer après une période d'inactivité.

## Technologies utilisées

- ReactJS, React Router, Bootstrap, Sass et Vite pour le frontend
- Node.js et Express pour l'API
- Sequelize pour communiquer avec la base de données
- MySQL/MariaDB pour les données
- Vitest et Supertest pour les tests de l'API

## Fonctions principales

- affichage des catégories enregistrées dans la base de données ;
- liste des artisans par catégorie ;
- recherche d'un artisan par son nom ;
- fiche détaillée de chaque artisan ;
- formulaire de contact avec validation et envoi par e-mail ;
- artisans du mois sur la page d'accueil ;
- pages légales et page 404 ;
- affichage adapté au mobile, à la tablette et à l'ordinateur.

## Installation en local

### Prérequis

- Node.js 20 ou une version plus récente
- MySQL 8 ou MariaDB 10.6+
- MySQL Workbench

### Étapes

1. Cloner ou télécharger le projet.
2. Copier le fichier `.env.example` et renommer la copie en `.env` à la racine du projet.
3. Compléter `.env` avec les informations de connexion à MySQL.
4. Compléter aussi les paramètres SMTP Brevo pour activer l'envoi des messages.
5. Exécuter `database/create_database.sql` puis `database/seed_database.sql` dans MySQL Workbench.
6. Ouvrir un terminal à la racine du projet.
7. Installer les dépendances :

```bash
npm install
npm run install:all
```

8. Lancer le projet :

```bash
npm run dev
```

Le site est disponible sur `http://localhost:5173` et l'API sur `http://localhost:3001/api`.

## Configuration du fichier `.env`

Le fichier `.env` doit se trouver à la racine du projet.

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=
DB_SSL=false

PORT=3001
CLIENT_ORIGIN=http://localhost:5173

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
CONTACT_FROM=
```

- `DB_PASSWORD` contient le mot de passe MySQL local.
- `DB_SSL` reste sur `false` en local et passe sur `true` pour la base Aiven.
- `SMTP_USER` contient l'identifiant SMTP fourni par Brevo.
- `SMTP_PASSWORD` contient la clé SMTP fournie par Brevo.
- `CONTACT_FROM` contient l'adresse d'expédition autorisée dans Brevo.

Le fichier `.env` contient des informations confidentielles. Il est ignoré par Git et ne doit pas être envoyé sur GitHub. Le fichier `.env.example` sert uniquement de modèle et ne contient aucun mot de passe.

Pour le frontend hébergé, la variable `VITE_API_URL` contient l'adresse publique de l'API :

```env
VITE_API_URL=https://trouve-ton-artisan-api-sdm4.onrender.com
```

## Tests

Depuis la racine du projet :

```bash
npm test
npm run build
```

- `npm test` lance les tests de l'API.
- `npm run build` crée la version de production du frontend.
- `/api/health` vérifie le fonctionnement de l'API et sa connexion à la base de données.

## Organisation des dossiers

- `client/` : application React
- `server/` : API Express et modèles Sequelize
- `database/` : scripts SQL de création et d'alimentation
- `docs/` : documents du projet

## Hébergement

- frontend : Render ;
- API Node.js : Render ;
- base MySQL : Aiven ;
- envoi des e-mails : relais SMTP Brevo.

Les mots de passe et les clés sont enregistrés dans les variables d'environnement de Render. Ils ne sont pas présents dans le dépôt GitHub.
