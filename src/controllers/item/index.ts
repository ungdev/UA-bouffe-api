import { Router } from 'express';
import toogleAvailablility from './toogleAvailablility';
import hasPermission from '../../middlewares/hasPermission';

export default () => {
  const router = Router();

  router.patch('/:id/availability/toogle', hasPermission('admin'), toogleAvailablility);

  return router;
};
