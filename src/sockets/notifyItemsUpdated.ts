import SocketIO from 'socket.io';
import getCategories from '../utils/categories';
import log from '../utils/log';

const notifyItemsUpdated = async (io: SocketIO.Server) => {
  const categories = await getCategories();
  log.info('Socket emit: categoryUpdate');
  io.sockets.emit('categoryUpdate', categories);
};

export default notifyItemsUpdated;
