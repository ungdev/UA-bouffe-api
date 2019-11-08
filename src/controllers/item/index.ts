import { Router } from 'express';
import toogleAvailablility from './toogleAvailablility';

export default () => {
  const router = Router();

  router.patch('/:id/availability/toogle', toogleAvailablility);

  return router;
};
