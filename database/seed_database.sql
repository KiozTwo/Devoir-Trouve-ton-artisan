USE trouve_ton_artisan;
SET NAMES utf8mb4;
INSERT INTO categories(name,slug) VALUES ('Alimentation','alimentation'),('Bâtiment','batiment'),('Fabrication','fabrication'),('Services','services');
INSERT INTO specialties(name,category_id) SELECT 'Boucher',id FROM categories WHERE slug='alimentation' UNION ALL SELECT 'Boulanger',id FROM categories WHERE slug='alimentation' UNION ALL SELECT 'Chocolatier',id FROM categories WHERE slug='alimentation' UNION ALL SELECT 'Traiteur',id FROM categories WHERE slug='alimentation' UNION ALL SELECT 'Chauffagiste',id FROM categories WHERE slug='batiment' UNION ALL SELECT 'Electricien',id FROM categories WHERE slug='batiment' UNION ALL SELECT 'Menuisier',id FROM categories WHERE slug='batiment' UNION ALL SELECT 'Plombier',id FROM categories WHERE slug='batiment' UNION ALL SELECT 'Bijoutier',id FROM categories WHERE slug='fabrication' UNION ALL SELECT 'Couturier',id FROM categories WHERE slug='fabrication' UNION ALL SELECT 'Ferronier',id FROM categories WHERE slug='fabrication' UNION ALL SELECT 'Coiffeur',id FROM categories WHERE slug='services' UNION ALL SELECT 'Fleuriste',id FROM categories WHERE slug='services' UNION ALL SELECT 'Toiletteur',id FROM categories WHERE slug='services' UNION ALL SELECT 'Webdesign',id FROM categories WHERE slug='services';
SET @about='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.';
INSERT INTO artisans(name,rating,city,about,email,website,is_top,specialty_id) VALUES
('Boucherie Dumont',4.5,'Lyon',@about,'boucherie.dumond@gmail.com',NULL,FALSE,(SELECT id FROM specialties WHERE name='Boucher')),
('Au pain chaud',4.8,'Montélimar',@about,'aupainchaud@hotmail.com',NULL,TRUE,(SELECT id FROM specialties WHERE name='Boulanger')),
('Chocolaterie Labbé',4.9,'Lyon',@about,'chocolaterie-labbe@gmail.com','https://chocolaterie-labbe.fr',TRUE,(SELECT id FROM specialties WHERE name='Chocolatier')),
('Traiteur Truchon',4.1,'Lyon',@about,'contact@truchon-traiteur.fr','https://truchon-traiteur.fr',FALSE,(SELECT id FROM specialties WHERE name='Traiteur')),
('Orville Salmons',5.0,'Evian',@about,'o-salmons@live.com',NULL,TRUE,(SELECT id FROM specialties WHERE name='Chauffagiste')),
('Mont Blanc Eléctricité',4.5,'Chamonix',@about,'contact@mont-blanc-electricite.com','https://mont-blanc-electricite.com',FALSE,(SELECT id FROM specialties WHERE name='Electricien')),
('Boutot & fils',4.7,'Bourg-en-bresse',@about,'boutot-menuiserie@gmail.com','https://boutot-menuiserie.com',FALSE,(SELECT id FROM specialties WHERE name='Menuisier')),
('Vallis Bellemare',4.0,'Vienne',@about,'v.bellemare@gmail.com','https://plomberie-bellemare.com',FALSE,(SELECT id FROM specialties WHERE name='Plombier')),
('Claude Quinn',4.2,'Aix-les-bains',@about,'claude.quinn@gmail.com',NULL,FALSE,(SELECT id FROM specialties WHERE name='Bijoutier')),
('Amitee Lécuyer',4.5,'Annecy',@about,'a.amitee@hotmail.com','https://lecuyer-couture.com',FALSE,(SELECT id FROM specialties WHERE name='Couturier')),
('Ernest Carignan',5.0,'Le Puy-en-Velay',@about,'e-carigan@hotmail.com',NULL,FALSE,(SELECT id FROM specialties WHERE name='Ferronier')),
('Royden Charbonneau',3.8,'Saint-Priest',@about,'r.charbonneau@gmail.com',NULL,FALSE,(SELECT id FROM specialties WHERE name='Coiffeur')),
('Leala Dennis',3.8,'Chambéry',@about,'l.dennos@hotmail.fr','https://coiffure-leala-chambery.fr',FALSE,(SELECT id FROM specialties WHERE name='Coiffeur')),
('C''est sup''hair',4.1,'Romans-sur-Isère',@about,'sup-hair@gmail.com','https://sup-hair.fr',FALSE,(SELECT id FROM specialties WHERE name='Coiffeur')),
('Le monde des fleurs',4.6,'Annonay',@about,'contact@le-monde-des-fleurs-annonay.fr','https://le-monde-des-fleurs-annonay.fr',FALSE,(SELECT id FROM specialties WHERE name='Fleuriste')),
('Valérie Laderoute',4.5,'Valence',@about,'v-laredoute@gmail.com',NULL,FALSE,(SELECT id FROM specialties WHERE name='Toiletteur')),
('CM Graphisme',4.4,'Valence',@about,'contact@cm-graphisme.com','https://cm-graphisme.com',FALSE,(SELECT id FROM specialties WHERE name='Webdesign'));
