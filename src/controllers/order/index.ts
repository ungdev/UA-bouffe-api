import { Router } from 'express';
import create from './create';
import list from './list';
import dispatch from './dispatch';
import editStatus from './editStatus';
import hasPermission from '../../middlewares/hasPermission';
import hasPermissionInList from '../../middlewares/hasPermissionInList';
import { OrderUpdate } from '../../types';
import isBuck from '../../middlewares/isBuck';
import isAuth from '../../middlewares/isAuth';

export default () => {
  const router = Router();

  router.get('/', isAuth(), list);
  router.post('/', isAuth(), hasPermission('sell'), create);
  router.post('/dispatch', isBuck, dispatch);
  router.patch('/:id/upgrade', isAuth(), hasPermissionInList(['pizza','prepare']), editStatus(OrderUpdate.UPGRADE));
  router.patch('/:id/downgrade', isAuth(), hasPermissionInList(['pizza','prepare']), editStatus(OrderUpdate.DOWNGRADE));

  return router;
};
