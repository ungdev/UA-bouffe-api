import { Router } from 'express';
import list from './list';
import create from './create';
import upgradeStatus from './upgradeStatus';

export default () => {
  const router = Router();

  router.get('/', list);
  router.post('/', create);
  router.patch('/:id', upgradeStatus);

  return router;
};
