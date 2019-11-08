import getCurrentOrders from '../utils/orders';

const notifyOrdersUpdated = async (io: SocketIO.Server) => {
  const orders = await getCurrentOrders();
  io.sockets.emit('orderUpdate', orders);
};

export default notifyOrdersUpdated;
