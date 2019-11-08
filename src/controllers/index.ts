import { Router } from 'express';
import auth from './auth';
import order from './order';
import isAuth from '../middlewares/isAuth';
import category from './category';

const routes = () => {
  const router = Router();

  router.use('/auth', auth());
  router.use('/orders', isAuth(), order());
  router.use('/categories', isAuth(), category());

  return router;
};

export default routes;
