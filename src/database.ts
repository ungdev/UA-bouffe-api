import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import log from './utils/log';
import devEnv from './utils/devEnv';

export default async (_forceSync = false) => {
  let sequelize: Sequelize;

  try {
    sequelize = new Sequelize({
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: parseInt(process.env.DB_PORT),
      models: [path.join(__dirname, 'models')],
      logging: (sql: string) => log.info(sql),
    });
  } catch (err) {
    process.exit(1);
  }

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
    process.exit(1);
  }

  const forceSync = _forceSync && devEnv();

  if (forceSync) {
    log.warn('Database synced with force. Be careful...');
  }

  await sequelize.sync({ force: forceSync });
  log.info('Connected to database');

  return { sequelize };
};
