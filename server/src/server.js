import { app } from './app.js';
import { config } from './config.js';
import { sequelize } from './models/index.js';

async function start() {
  try {
    await sequelize.authenticate();
    app.listen(config.port, () => {
      console.log(`API disponible sur http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Connexion MySQL impossible :', error.message);
    process.exit(1);
  }
}

start();
