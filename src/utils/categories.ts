import { CategoryModel, ItemModel } from '../types';

const getCategories = (Category: CategoryModel, Item: ItemModel) => {
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
