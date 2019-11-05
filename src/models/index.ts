import { Sequelize, DataTypes } from 'sequelize';
import OrderDef from './order';
import OrderItemDef from './orderItem';

export default (sequelize: Sequelize) => {
  const Order = OrderDef(sequelize);
  const OrderItem = OrderItemDef(sequelize);

  Order.hasMany(OrderItem);
  OrderItem.belongsTo(Order);

  return { Order, OrderItem };
};
