import { Router } from 'express';
import list from './list';
import create from './create';
import upgradeStatus from './upgradeStatus';
import hasPermission from '../../middlewares/hasPermission';

export default () => {
  const router = Router();

  router.get('/', list);
  router.post('/', hasPermission('sell'), create);
  router.patch('/:id', hasPermission('pizza'), upgradeStatus);

  return router;
};
