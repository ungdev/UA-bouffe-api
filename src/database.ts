import { Sequelize, Options } from 'sequelize';
import models from './models';

export default async () => {
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: (sql: string) => console.log(sql),
  });

  process.on('SIGINT', async () => {
    try {
      await sequelize.close();
      process.exit(0);
    } catch (err) {
      process.exit(1);
    }
  });

  const modelsCreated = models(sequelize);
  await sequelize.sync({ force: true });
  console.log('Connected to database');

  return { sequelize, models: modelsCreated };
};
