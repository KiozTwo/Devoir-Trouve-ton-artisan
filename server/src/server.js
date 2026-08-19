import {app} from './app.js';import {sequelize} from './db.js';import {config} from './config.js';
async function start(){try{await sequelize.authenticate();app.listen(config.port,()=>console.log(`API disponible sur http://localhost:${config.port}`))}catch(e){console.error('Connexion MySQL impossible :',e.message);process.exit(1)}}start();
