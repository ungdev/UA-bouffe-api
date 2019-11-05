import { Router } from 'express';
import { Models } from '../types';
import auth from './auth';
import order from './order';
import isAuth from '../middlewares/isAuth';

const routes = (models: Models) => {
  const router = Router();

  router.use('/auth', auth());
  router.use('/orders', isAuth(), order(models));

  return router;
};

export default routes;
