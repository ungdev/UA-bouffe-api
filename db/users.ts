import User from '../src/models/user';

const seedUsers = async () => {
  // Il faut impérativement le même sel pour éviter que 2 users aient le même mot de passe
  let users = [
    {
      name: 'Télévision',
      key: 'tv',
    },
    {
      name: 'Vendeur',
      key: 'seller',
      permissions: 'sell',
    },
    {
      name: 'Préparateur Pizza',
      key: 'pizza',
      permissions: 'pizza',
    },
    {
      name: 'Administrateur',
      key: 'admin',
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
