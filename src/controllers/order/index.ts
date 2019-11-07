import { Router } from 'express';
import { Models } from '../../types';
import list from './list';
import create from './create';
import upgradeStatus from './upgradeStatus';

export default (models: Models) => {
  const router = Router();

  const { Order, OrderItem, Item, Category } = models;

  router.get('/', list(Order, OrderItem, Item, Category));
  router.post('/', create(Order, OrderItem, Item, Category));
  router.patch('/:id', upgradeStatus(Order, OrderItem, Item, Category));

  return router;
};
