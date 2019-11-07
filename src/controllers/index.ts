import { Router } from 'express';
import { Models } from '../types';
import auth from './auth';
import order from './order';
import isAuth from '../middlewares/isAuth';
import category from './category';

const routes = (models: Models) => {
  const router = Router();

  router.use('/auth', auth());
  router.use('/orders', isAuth(), order(models));
  router.use('/categories', isAuth(), category(models));

  return router;
};

export default routes;
