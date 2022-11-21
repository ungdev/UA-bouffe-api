import { Router } from 'express';
import create from './create';
import list from './list';
import dispatch from './dispatch';
import editStatus from './editStatus';
import hasPermission from '../../middlewares/hasPermission';
import { OrderUpdate } from '../../types';
import isBuck from '../../middlewares/isBuck';

export default () => {
  const router = Router();

  router.get('/', list);
  router.post('/', hasPermission('sell'), create);
  router.post('/dispatch', isBuck, dispatch);
  router.patch('/:id/upgrade', hasPermission('pizza'), editStatus(OrderUpdate.UPGRADE));
  router.patch('/:id/downgrade', hasPermission('pizza'), editStatus(OrderUpdate.DOWNGRADE));

  return router;
};
