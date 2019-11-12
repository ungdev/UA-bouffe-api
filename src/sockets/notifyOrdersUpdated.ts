import getCurrentOrders from '../utils/orders';

const notifyOrdersUpdated = async (io: SocketIO.Server) => {
  const orders = await getCurrentOrders();
  console.log('OrderUpdate: categoryUpdate');
  io.sockets.emit('orderUpdate', orders);
};

export default notifyOrdersUpdated;
