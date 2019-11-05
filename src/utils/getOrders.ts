import { Op } from 'sequelize';
import { IncludeOptions } from 'sequelize/types';
import { OrderModel, OrderItemModel } from '../types';

const getCurrentOrders = (Order: OrderModel, OrderItem: OrderItemModel) => {
  const includeOrderItems: IncludeOptions = {
    model: OrderItem,
    attributes: ['id', 'name', 'key', 'price', 'category'],
  };

  return Order.findAll({
    attributes: ['id', 'place', 'status', 'method', 'createdAt'],
    include: [includeOrderItems],
    where: {
      status: {
        [Op.not]: 'finished',
      },
    },
  });
};

export default getCurrentOrders;
