import { Sequelize, DataTypes } from 'sequelize/types';
import { OrderModel, OrderItemModel } from '../types';

export default (sequelize: Sequelize) => {
  const Order = sequelize.define('order', {
    status: {
      type: DataTypes.ENUM('pending', 'preparing', 'ready', 'finished'),
      allowNull: false,
      defaultValue: 'pending',
    },
    method: { type: DataTypes.ENUM('cash', 'card'), allowNull: false },
  }) as OrderModel;

  const OrderItem = sequelize.define('orderItem', {
    key: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
  }) as OrderItemModel;

  Order.hasMany(OrderItem);
  OrderItem.belongsTo(Order);

  return { Order, OrderItem };
};
