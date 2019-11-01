const { Sequelize } = require('sequelize');
const models = require('./models');
require('dotenv').config();

module.exports = async () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: (sql) => console.log(sql)
    }
  );

  process.on('SIGINT', async () => {
    try {
      await sequelize.close();
      process.exit(0);
    } catch (err) {
      process.exit(1);
    }
  });

  const modelsCreated = models(sequelize);
  await sequelize.sync(); // TODO: UNIQUEMENT POUR LE DEV !!!
  console.log('Connected to database');

  return { sequelize, models: modelsCreated };
};
