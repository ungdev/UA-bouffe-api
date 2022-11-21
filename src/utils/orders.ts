import { Op } from 'sequelize';
import Order from '../models/order';
import OrderItem from '../models/orderItem';
import Item from '../models/item';
import Category from '../models/category';
import Supplement from '../models/supplement';
import OrderSupplement from '../models/orderSupplement';

const getCurrentOrders = () =>
  Order.findAll({
    attributes: ['id', 'place', 'status', 'createdAt'],
    include: [
      {
        model: OrderItem,
        attributes: ['id'],
        include: [
          {
            model: Item,
            attributes: ['id', 'name', 'key', 'promokey'],
            include: [
              {
                model: Category,
                attributes: ['name', 'key', 'needsPreparation'],
              },
            ],
          },
          {
            model: OrderSupplement,
            include: [
              {
                model: Supplement,
                attributes: ['id', 'name', 'key'],
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

export default getCurrentOrders;
