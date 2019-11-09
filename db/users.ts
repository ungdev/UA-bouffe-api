import { hash, genSaltSync } from 'bcrypt';
import User from '../src/models/user';

const seedUsers = async () => {
  const saltRounds = parseInt(process.env.APP_SALT_ROUNDS);

  // Il faut impérativement le même sel pour éviter que 2 users aient le même mot de passe
  const salt = genSaltSync(saltRounds);
  let users = [
    {
      name: 'Télévision',
      key: 'tv',
      password: await hash(process.env.APP_PIN_TV, salt),
    },
    {
      name: 'Vendeur',
      key: 'seller',
      password: await hash(process.env.APP_PIN_SELLER, salt),
      permissions: 'sell',
    },
    {
      name: 'Préparateur Pizza',
      key: 'pizza',
      password: await hash(process.env.APP_PIN_PIZZA, salt),
      permissions: 'pizza',
    },
    {
      name: 'Administrateur',
      key: 'admin',
      password: await hash(process.env.APP_PIN_ADMIN, salt),
      permissions: 'admin',
    },
  ];

  users = users.map((user) => ({
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return User.bulkCreate(users);
};

export default seedUsers;
