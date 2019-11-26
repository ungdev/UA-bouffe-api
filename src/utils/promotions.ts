import { Promotion } from '../types';

export const getPromotions = (): Array<Promotion> => [
  {
    formula: ['croque', 'croque', 'croque', 'canette'],
    orgaPrice: 250,
    price: 450,
    name: 'Promo 3 Croques + Canette',
    key: 'croque-canette',
  },
  {
    formula: ['croque', 'croque', 'croque'],
    orgaPrice: 200,
    price: 400,
    name: 'Promo 3 Croques',
    key: 'croque',
  },
  {
    formula: ['pizza', 'canette'],
    orgaPrice: 400,
    price: 500,
    name: 'Promo Pizza + Canette',
    key: 'pizza-canette',
  },
  {
    formula: ['complete', 'canette'],
    orgaPrice: 200,
    price: 300,
    name: 'Promo Crêpe Complète + Canette',
    key: 'complete-canette',
  },
  {
    formula: ['crepe', 'canette'],
    orgaPrice: 150,
    price: 250,
    name: 'Promo Crêpe + Canette',
    key: 'crepe-canette',
  },
  {
    formula: ['croque', 'croque', 'croquenut'],
    orgaPrice: 150,
    price: 300,
    name: 'Promo 2 Croques + Croque Nut',
    key: 'crepe-canette',
  },
  {
    formula: ['barre', 'canette'],
    orgaPrice: 110,
    price: 170,
    name: 'Promo Barre + Canette',
    key: 'barre-canette',
  },
];
