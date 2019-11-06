import { Sequelize, DataTypes } from 'sequelize';
import OrderDef from './order';
import OrderItemDef from './orderItem';
import CategoryDef from './category';
import ItemDef from './item';

export default (sequelize: Sequelize) => {
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

  Item.hasMany(Order, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade',
  });
  Order.belongsTo(Item, {
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

  return { Order, OrderItem, Item, Category };
};
