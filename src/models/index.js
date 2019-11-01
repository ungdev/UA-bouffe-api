module.exports = (sequelize) => {
  const Order = sequelize.import(`${__dirname}/order`);
  const OrderItem = sequelize.import(`${__dirname}/orderItem`);

  Order.hasMany(OrderItem);
  OrderItem.belongsTo(Order);
  return { Order, OrderItem };
};
