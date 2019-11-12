import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import log from './utils/log';
import devEnv from './utils/devEnv';

export default async (_forceSync = false) => {
  const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    models: [path.join(__dirname, 'models')],
    logging: (sql: string) => log.info(sql),
  });

  process.on('SIGINT', async () => {
    try {
      await sequelize.close();
      process.exit(0);
    } catch (err) {
      process.exit(1);
    }
  });

  if (_forceSync && !devEnv()) {
    log.error('You must set your NODE_ENV to development to force sync the database');
  }

  const forceSync = _forceSync && devEnv();

  if (forceSync) {
    log.warn('Database synced with force. Be carefull...');
  }

  await sequelize.sync({ force: forceSync });
  log.info('Connected to database');

  return { sequelize };
};
