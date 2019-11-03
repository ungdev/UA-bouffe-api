import { Router } from 'express';
import { Models } from '../types';
import auth from './auth';
import order from './order';

const routes = (models: Models) => {
  const router = Router();

  router.use('/auth', auth());
  router.use('/orders', order(models));

  return router;
};

export default routes;