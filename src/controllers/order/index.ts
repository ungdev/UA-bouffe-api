import { Router } from 'express';
import list from './list';
import create from './create';
import editStatus from './editStatus';
import hasPermission from '../../middlewares/hasPermission';
import { OrderUpdate } from '../../types';

export default () => {
  const router = Router();

  router.get('/', list);
  router.post('/', hasPermission('sell'), create);
  router.patch('/:id/upgrade', hasPermission('pizza'), editStatus(OrderUpdate.UPGRADE));
  router.patch('/:id/downgrade', hasPermission('pizza'), editStatus(OrderUpdate.DOWNGRADE));

  return router;
};
