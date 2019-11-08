import getCurrentOrders from './orders';

const notifyOrdersUpdated = async (io: SocketIO.Server) => {
  const orders = await getCurrentOrders();
  io.sockets.emit('orderUpdate', orders);
};

export default notifyOrdersUpdated;
