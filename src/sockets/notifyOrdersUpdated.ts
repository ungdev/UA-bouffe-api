import SocketIO from 'socket.io';
import getCurrentOrders from '../utils/orders';
import log from '../utils/log';

const notifyOrdersUpdated = async (io: SocketIO.Server) => {
  const orders = await getCurrentOrders();
  log.info('Socket emit: orderUpdate');
  io.sockets.emit('orderUpdate', orders);
};

export default notifyOrdersUpdated;
