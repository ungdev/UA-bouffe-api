import dotenv from 'dotenv';
import database from '../src/database';
import seedCategories from './categories';
import seedItems from './items';

dotenv.config();

(async () => {
  const forceSync = process.argv.some((arg) => arg === '--force-sync');

  const { sequelize } = await database(forceSync);

  await seedCategories();
  await seedItems();

  sequelize.close();
})();
