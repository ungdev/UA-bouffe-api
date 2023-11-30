import { Router } from 'express';
import list from './list';

export default () => {
  const router = Router();

  router.get('/', list);

  return router;
};
