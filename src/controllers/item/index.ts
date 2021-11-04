import { Router } from 'express';
import toggleAvailablility from './toggleAvailablility';
import hasPermission from '../../middlewares/hasPermission';

export default () => {
  const router = Router();

  router.patch('/:id/availability/toggle', hasPermission('admin'), toggleAvailablility);

  return router;
};
