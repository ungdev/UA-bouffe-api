import getOrders from "./getOrders";
import { OrderModel, OrderItemModel } from "../types";

const notifyOrdersUpdated = async (Order: OrderModel, OrderItem: OrderItemModel, io: SocketIO.Server) => {
  const orders = await getOrders(Order, OrderItem);
  io.sockets.emit('ordersUpdate', orders);
};

export default notifyOrdersUpdated;