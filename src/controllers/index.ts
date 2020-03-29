import { Router } from 'express';
import auth from './auth';
import order from './order';
import isAuth from '../middlewares/isAuth';
import category from './category';
import item from './item';
import promotions from './promotions';
import status from './status';

const routes = () => {
  const router = Router();

  router.get('/', status());
  router.use('/auth', auth());
  router.use('/orders', isAuth(), order());
  router.use('/categories', isAuth(), category());
  router.use('/items', isAuth(), item());
  router.use('/promotions', isAuth(), promotions());

  return router;
};

export default routes;
