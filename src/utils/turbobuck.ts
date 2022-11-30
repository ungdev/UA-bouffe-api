import Category from '../models/category';
import Item from '../models/item';
import TurboBuck from '../models/turbobuck';

export const toTurbo = (buckId: string) =>
  TurboBuck.findByPk(buckId, {
    include: {
      model: Item,
      include: [Category],
    },
  });
