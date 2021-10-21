import getCategories from '../utils/categories';
import log from '../utils/log';
import SocketIO from 'socket.io';

const notifyItemsUpdated = async (io: SocketIO.Server) => {
  const categories = await getCategories();
  log.info('Socket emit: categoryUpdate');
  io.sockets.emit('categoryUpdate', categories);
};

export default notifyItemsUpdated;
