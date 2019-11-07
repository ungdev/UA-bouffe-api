import { Op } from 'sequelize';
import { OrderModel, OrderItemModel, ItemModel, CategoryModel } from '../types';

const getCurrentOrders = (Order: OrderModel, OrderItem: OrderItemModel, Item: ItemModel, Category: CategoryModel) => {
  return Order.findAll({
    attributes: ['id', 'place', 'status', 'method', 'createdAt'],
    include: [
      {
        model: OrderItem,
        attributes: ['price'],
        include: [
          {
            model: Item,
            attributes: ['name', 'key', 'promokey'],
            include: [
              {
                model: Category,
                attributes: ['name', 'key', 'needsPreparation'],
              },
            ],
          },
        ],
      },
    ],
    where: {
      status: {
        [Op.not]: 'finished',
      },
    },
  });
};

export default getCurrentOrders;
