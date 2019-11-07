import { Router } from 'express';
import { Models } from '../../types';
import list from './list';

export default (models: Models) => {
  const router = Router();

  const { Item, Category } = models;

  router.get('/', list(Category, Item));

  return router;
};
