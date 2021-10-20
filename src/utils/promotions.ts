import { Promotion } from '../types';

export const getPromotions = (): Array<Promotion> => [
  {
    formula: ['croque', 'croque', 'croque'],
    orgaPrice: 250,
    price: 250,
    name: 'Promo 3 Croques',
    key: 'croque',
  },
  {
    formula: ['crepe', 'crepe', 'crepe'],
    orgaPrice: 100,
    price: 100,
    name: 'Promo 3 Crepes',
    key: 'crepe',
  }
];
