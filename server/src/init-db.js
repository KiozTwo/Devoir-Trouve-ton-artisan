import mysql from 'mysql2/promise';
import {readFile} from 'node:fs/promises';

const ssl=process.env.DB_SSL==='true'?{rejectUnauthorized:false}:undefined;
const connection=await mysql.createConnection({
  host:process.env.DB_HOST,
  port:Number(process.env.DB_PORT||3306),
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:'defaultdb',
  ssl,
  multipleStatements:true
});

try {
  const createSql=await readFile(new URL('../../database/create_database.sql',import.meta.url),'utf8');
  await connection.query(createSql);
  const [rows]=await connection.query('SELECT COUNT(*) AS total FROM trouve_ton_artisan.artisans');
  if(Number(rows[0].total)===0){
    const seedSql=await readFile(new URL('../../database/seed_database.sql',import.meta.url),'utf8');
    await connection.query(seedSql);
  }
  console.log('Base de données initialisée.');
} finally {
  await connection.end();
}
