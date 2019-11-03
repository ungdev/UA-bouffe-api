import { OrderModel, OrderItemModel } from "../types";
import { IncludeOptions } from "sequelize/types";

const getOrders = (Order: OrderModel, OrderItem: OrderItemModel) => {

  const includeOrderItems: IncludeOptions = {
    model: OrderItem,
    attributes: ['id', 'key', 'price', 'category'],
  };

  return Order.findAll({
    attributes: ['id', 'status', 'method'],
    include: [includeOrderItems]
  });
};

export default getOrders;