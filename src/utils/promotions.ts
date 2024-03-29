import { Promotion } from '../types';
import PersistantPromotion from '../models/promotion';

export const getPromotions = () =>
  PersistantPromotion.findAll({
    attributes: ['key', 'name', 'price', 'orgaPrice', 'formula'],
  }).then((promotions) =>
    promotions.map<Promotion>((promotion) =>
      Object.assign(promotion, {
        formula: promotion.formula.split('|'),
      }),
    ),
  );
