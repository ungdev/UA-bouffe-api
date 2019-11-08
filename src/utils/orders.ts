import { Op } from 'sequelize';
import Order from '../models/order';
import OrderItem from '../models/orderItem';
import Item from '../models/item';
import Category from '../models/category';

const getCurrentOrders = () => {
  return Order.findAll({
    attributes: ['id', 'place', 'status', 'method', 'createdAt'],
    include: [
      {
        model: OrderItem,
        attributes: ['id'],
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
