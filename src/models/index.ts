import { Sequelize } from 'sequelize';
import OrderDef from './order';
import OrderItemDef from './orderItem';
import CategoryDef from './category';
import ItemDef from './item';
import { Models } from '../types';

export default (sequelize: Sequelize): Models => {
  const Order = OrderDef(sequelize);
  const OrderItem = OrderItemDef(sequelize);
  const Item = ItemDef(sequelize);
  const Category = CategoryDef(sequelize);

  Order.hasMany(OrderItem, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade',
  });
  OrderItem.belongsTo(Order, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade',
  });

  Item.hasMany(OrderItem, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade',
  });
  OrderItem.belongsTo(Item, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade',
  });

  Category.hasMany(Item, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade',
  });
  Item.belongsTo(Category, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade',
  });

  return { Order, OrderItem, Category, Item };
};
