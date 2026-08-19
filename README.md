# Trouve ton artisan

Projet rA'AAalisA'AA par Simon CLEMENT dans le cadre de la formation DA'AAveloppeur web et web mobile.

Cette application permet de rechercher un artisan de la rA'AAgion Auvergne-RhA'AAne-Alpes, de consulter sa fiche et de lui envoyer un message avec le formulaire de contact.

## Liens du projet

- Site en ligne : https://trouve-ton-artisan-frontend-t6xv.onrender.com
- API : https://trouve-ton-artisan-api-sdm4.onrender.com/api/health
- DA'AApA'AAt GitHub : https://github.com/KiozTwo/Devoir-Trouve-ton-artisan
- Maquettes Figma : https://www.figma.com/design/ihplUL3iLSQAA9iLKhdYzA/Sans-titre?node-id=2-2

Les services gratuits peuvent prendre quelques secondes pour dA'AAmarrer aprA'AAs une pA'AAriode d'inactivitA'AA.

## Technologies utilisA'AAes

- ReactJS, React Router, Bootstrap, Sass et Vite pour le frontend
- Node.js et Express pour l'API
- Sequelize pour communiquer avec la base de donnA'AAes
- MySQL/MariaDB pour les donnA'AAes
- Vitest et Supertest pour les tests de l'API

## Fonctions principales

- affichage des catA'AAgories enregistrA'AAes dans la base de donnA'AAes ;
- liste des artisans par catA'AAgorie ;
- recherche d'un artisan par son nom ;
- fiche dA'AAtaillA'AAe de chaque artisan ;
- formulaire de contact avec validation et envoi par e-mail ;
- artisans du mois sur la page d'accueil ;
- pages lA'AAgales et page 404 ;
- affichage adaptA'AA au mobile, A'AA la tablette et A'AA l'ordinateur.

## Installation en local

### PrA'AArequis

- Node.js 20 ou une version plus rA'AAcente
- MySQL 8 ou MariaDB 10.6+
- MySQL Workbench

### A'aaAtapes

1. Cloner ou tA'AAlA'AAcharger le projet.
2. A'aasA la racine du projet, copier le fichier `.env.example` et renommer la copie en `.env`.
3. ComplA'AAter le fichier `.env` avec les informations de connexion A'AA MySQL.
4. Pour activer l'envoi des messages, complA'AAter aussi les paramA'AAtres SMTP Brevo dans `.env`.
5. ExA'AAcuter `database/create_database.sql` puis `database/seed_database.sql` dans MySQL Workbench.
6. Ouvrir un terminal A'AA la racine du projet.
7. Installer les dA'AApendances :

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

Le fichier `.env` doit se trouver A'AA la racine du projet.

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
- `SMTP_PASSWORD` contient la clA'AA SMTP fournie par Brevo.
- `CONTACT_FROM` contient l'adresse d'expA'AAdition autorisA'AAe dans Brevo.

Le fichier `.env` contient des informations confidentielles. Il est ignorA'AA par Git et ne doit pas A'AAtre envoyA'AA sur GitHub. Le fichier `.env.example` sert uniquement de modA'AAle et ne contient aucun mot de passe.

Pour le frontend hA'AAbergA'AA, la variable `VITE_API_URL` contient l'adresse publique de l'API :

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
- `npm run build` crA'AAe la version de production du frontend.
- `/api/health` vA'AArifie le fonctionnement de l'API et sa connexion A'AA la base de donnA'AAes.

## Organisation des dossiers

- `client/` : application React
- `server/` : API Express et modA'AAles Sequelize
- `database/` : scripts SQL de crA'AAation et d'alimentation
- `docs/` : documents du projet

## HA'AAbergement

- frontend : Render ;
- API Node.js : Render ;
- base MySQL : Aiven ;
- envoi des e-mails : relais SMTP Brevo.

Les mots de passe et les clA'AAs sont enregistrA'AAs dans les variables d'environnement de Render. Ils ne sont pas prA'AAsents dans le dA'AApA'AAt GitHub.




