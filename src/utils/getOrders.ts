import { IncludeOptions } from 'sequelize/types';
import { OrderModel, OrderItemModel } from '../types';

const getOrders = (Order: OrderModel, OrderItem: OrderItemModel) => {
  const includeOrderItems: IncludeOptions = {
    model: OrderItem,
    attributes: ['id', 'name', 'key', 'price', 'category'],
  };

  return Order.findAll({
    attributes: ['id', 'status', 'method'],
    include: [includeOrderItems],
  });
};

export default getOrders;