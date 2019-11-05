import getCurrentOrders from './getOrders';
import { OrderModel, OrderItemModel } from '../types';

const notifyOrdersUpdated = async (Order: OrderModel, OrderItem: OrderItemModel, io: SocketIO.Server) => {
  const orders = await getCurrentOrders(Order, OrderItem);
  io.sockets.emit('ordersUpdate', orders);
};

export default notifyOrdersUpdated;
