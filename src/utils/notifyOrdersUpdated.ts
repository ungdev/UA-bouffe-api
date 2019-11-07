import getCurrentOrders from './orders';
import { OrderModel, OrderItemModel, ItemModel, CategoryModel } from '../types';

const notifyOrdersUpdated = async (
  Order: OrderModel,
  OrderItem: OrderItemModel,
  Item: ItemModel,
  Category: CategoryModel,
  io: SocketIO.Server,
) => {
  const orders = await getCurrentOrders(Order, OrderItem, Item, Category);
  io.sockets.emit('orderUpdate', orders);
};

export default notifyOrdersUpdated;
