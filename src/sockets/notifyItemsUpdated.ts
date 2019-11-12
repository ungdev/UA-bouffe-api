import getCategories from '../utils/categories';

const notifyItemsUpdated = async (io: SocketIO.Server) => {
  const categories = await getCategories();
  console.log('Socket: categoryUpdate');
  io.sockets.emit('categoryUpdate', categories);
};

export default notifyItemsUpdated;
