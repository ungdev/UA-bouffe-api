import Category from '../models/category';
import Item from '../models/item';
import Supplement from '../models/supplement';

const getCategories = () =>
  Category.findAll({
    attributes: ['id', 'name', 'key', 'needsPreparation'],
    include: [
      {
        model: Item,
        attributes: ['id', 'name', 'key', 'promoKey', 'price', 'orgaPrice', 'available'],
        include: [
          {
            model: Supplement,
            attributes: ['id', 'name', 'key', 'price', 'orgaPrice', 'available'],
          },
        ],
      },
    ],
  });

export default getCategories;
