import Category from '../src/models/category';

const seedCategories = () => {
  let categories = [
    {
      id: 1,
      name: 'Boissons',
      key: 'boissons',
      needsPreparation: 0,
    },
    {
      id: 2,
      name: 'Snacks',
      key: 'snacks',
      needsPreparation: 0,
    },
    {
      id: 3,
      name: 'Crêpes',
      key: 'crepes',
      needsPreparation: 1,
    },
    {
      id: 4,
      name: 'Croques',
      key: 'croques',
      needsPreparation: 1,
    },
    {
      id: 5,
      name: 'Pizzas',
      key: 'pizzas',
      needsPreparation: 1,
    },
    {
      id: 6,
      name: 'Sandwichs',
      key: 'sandwichs',
      needsPreparation: 1,
    },
    {
      id: 7,
      name: 'Petit Dej',
      key: 'dejeuner',
      needsPreparation: 1,
    },
    {
      id: 8,
      name: 'Goodies',
      key: 'goodies',
      needsPreparation: 0,
    },
  ];

  categories = categories.map((category) => ({
    ...category,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return Category.bulkCreate(categories);
};

export default seedCategories;
