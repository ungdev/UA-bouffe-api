import Category from '../models/category';
import TurboBuck from '../models/turbobuck';

export const toTurbo = (buckId: string) => TurboBuck.findByPk(buckId, { include: Category });
