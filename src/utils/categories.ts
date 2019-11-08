import Category from '../models/category';
import Item from '../models/item';

const getCategories = () => {
  return Category.findAll({
    attributes: ['id', 'name', 'key', 'needsPreparation'],
    include: [
      {
        model: Item,
        attributes: ['id', 'name', 'key', 'promoKey', 'price', 'orgaPrice', 'available'],
      },
    ],
  });
};

export default getCategories;
