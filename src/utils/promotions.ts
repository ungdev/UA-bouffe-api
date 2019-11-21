import { Promotion, Price } from '../types';
import Item from '../models/item';

export const getPromotions = (): Array<Promotion> => [
  {
    formula: ['croque', 'croque', 'croque'],
    orgaPrice: 200,
    price: 200,
    name: 'Promo 3 croques',
    key: 'croque',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrayContainsArray = (superset: Array<any>, subset: Array<any>) => {
  if (subset.length === 0) {
    return false;
  }
  return subset.every((value) => superset.indexOf(value) >= 0);
};

const removePromo = (_basket: Array<Item>, promotions: Promotion) => {
  const basket = _basket.slice();

  // eslint-disable-next-line
  for (const itemPromo of promotions.formula) {
    const i = basket.findIndex((e) => e.promoKey === itemPromo);
    basket.splice(i, 1);
  }

  return basket;
};

interface FindPromoReturn {
  basket: Array<Item>;
  promotion: Promotion;
}

const findPromo = (basket: Array<Item>, promotions: Array<Promotion>): FindPromoReturn => {
  // eslint-disable-next-line
  for (const promotion of promotions) {
    const isPromo = arrayContainsArray(basket.map((item) => item.promoKey), promotion.formula);
    if (isPromo) {
      const newCart = removePromo(basket, promotion);
      return { basket: newCart, promotion };
    }
  }
  return { basket, promotion: null };
};

interface ComputePromotionsReturn {
  promotions: Array<Promotion>;
  itemsLeft: Array<Item>;
  total: number;
}

const calculateTotal = (array: Array<Price>, orgaPrice: boolean) => {
  return array.reduce((acc, curr) => acc + (orgaPrice ? curr.orgaPrice : curr.price), 0);
};

export const computePromotions = (_basket: Array<Item>, orgaPrice: boolean): ComputePromotionsReturn => {
  let basket = _basket.slice();
  let hasPromotions = true;
  const listPromotions = [];

  while (hasPromotions) {
    const result = findPromo(basket, getPromotions());
    basket = result.basket;
    hasPromotions = !!result.promotion;

    if (result.promotion) {
      listPromotions.push(result.promotion);
    }
  }

  return {
    promotions: listPromotions,
    itemsLeft: basket,
    total: calculateTotal(listPromotions, orgaPrice) + calculateTotal(basket, orgaPrice),
  };
};
