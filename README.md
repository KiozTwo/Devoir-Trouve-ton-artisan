# Trouve ton artisan

Plateforme mobile-first de la Région Auvergne-Rhône-Alpes permettant de rechercher un artisan par nom ou catégorie, consulter sa fiche et lui envoyer une demande.

## Technologies

- Frontend : React 18, React Router, Bootstrap 5, Sass, Vite
- API : Node.js, Express, Sequelize, MySQL/MariaDB
- Qualité : Helmet, CORS restreint, limitation de débit, validation, Vitest/Supertest

## Prérequis

- Node.js 20 ou plus récent
- MySQL 8 ou MariaDB 10.6+

## Installation

1. Copier `.env.example` vers `.env` et renseigner l'accès MySQL.
2. Exécuter `database/create_database.sql`, puis `database/seed_database.sql` dans MySQL.
3. À la racine : `npm install`, puis `npm run install:all`.
4. Lancer les deux applications avec `npm run dev`.
5. Ouvrir `http://localhost:5173` (API sur `http://localhost:3001`).

Pour envoyer réellement les messages, renseigner les variables SMTP. Sans SMTP, l'API valide la demande et la journalise en développement sans exposer l'adresse de l'artisan au navigateur.

## Vérification

- `npm run build` : build de production du frontend.
- `npm test` : tests de l'API.
- `GET /api/health` : état de l'API et de la base.

## Structure

- `client/` interface React
- `server/` API Express/Sequelize
- `database/` scripts SQL de création et d'alimentation
- `docs/` contenu du dossier final, MCD/MLD et sécurité

## Déploiement

Construire le client (`npm run build`), déployer `client/dist` sur un hébergement statique et l'API sur un hôte Node connecté à MySQL. Définir `VITE_API_URL` à l'URL publique de l'API et `CLIENT_ORIGIN` à l'origine exacte du frontend. Les liens GitHub, Figma et du site sont à compléter dans `docs/DOSSIER_FINAL.md` après publication.
