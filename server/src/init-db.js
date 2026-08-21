import { readFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';
import { config } from './config.js';

const connection = await mysql.createConnection({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.ssl ? 'defaultdb' : undefined,
  ssl: config.db.ssl ? { rejectUnauthorized: false } : undefined,
  multipleStatements: true
});

try {
  const createSql = await readFile(
    new URL('../../database/create_database.sql', import.meta.url),
    'utf8'
  );
  await connection.query(createSql);

  // Cette migration met à niveau une ancienne base qui stockait la ville en texte.
  const [columns] = await connection.query(`
    SELECT COLUMN_NAME
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = 'trouve_ton_artisan'
      AND TABLE_NAME = 'artisans'
  `);
  const columnNames = columns.map((column) => column.COLUMN_NAME);

  if (columnNames.includes('city') && !columnNames.includes('city_id')) {
    await connection.query(`
      INSERT IGNORE INTO trouve_ton_artisan.cities (name)
      SELECT DISTINCT city FROM trouve_ton_artisan.artisans;
      ALTER TABLE trouve_ton_artisan.artisans
        ADD COLUMN city_id INT UNSIGNED NULL AFTER specialty_id;
      UPDATE trouve_ton_artisan.artisans AS artisan
      JOIN trouve_ton_artisan.cities AS city ON city.name = artisan.city
      SET artisan.city_id = city.id;
      ALTER TABLE trouve_ton_artisan.artisans
        MODIFY city_id INT UNSIGNED NOT NULL,
        ADD INDEX idx_artisan_city (city_id),
        ADD CONSTRAINT fk_artisan_city
          FOREIGN KEY (city_id) REFERENCES trouve_ton_artisan.cities(id)
          ON UPDATE CASCADE ON DELETE RESTRICT,
        DROP COLUMN city;
    `);
  }

  const [rows] = await connection.query(
    'SELECT COUNT(*) AS total FROM trouve_ton_artisan.artisans'
  );

  if (Number(rows[0].total) === 0) {
    const seedSql = await readFile(
      new URL('../../database/seed_database.sql', import.meta.url),
      'utf8'
    );
    await connection.query(seedSql);
  }

  console.log('Base de données initialisée.');
} finally {
  await connection.end();
}
