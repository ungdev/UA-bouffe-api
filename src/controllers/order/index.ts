import { Router } from 'express';
import { Models } from '../../types';
import list from './list';
import create from './create';
import upgradeStatus from './upgradeStatus';

export default (models: Models) => {
  const router = Router();

  const { Order, OrderItem } = models;

  router.get('/', list(Order, OrderItem));
  router.post('/', create(Order, OrderItem));
  router.patch('/:id', upgradeStatus(Order, OrderItem));

  return router;
};