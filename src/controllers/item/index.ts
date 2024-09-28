import { Router } from 'express';
import toggleAvailablility from './toggleAvailablility';
import RemoveStock from './RemoveStock';
import hasPermission from '../../middlewares/hasPermission';

export default () => {
  const router = Router();

  router.patch('/:id/availability/toggle', hasPermission('admin'), toggleAvailablility);
  router.patch('/:id/quantity/remove', RemoveStock);

  return router;
};

