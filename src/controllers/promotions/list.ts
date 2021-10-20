import { Request, Response } from 'express';
import { success } from '../../utils/responses';
import errorHandler from '../../utils/errorHandler';
import { getPromotions } from '../../utils/promotions';

export default async (req: Request, res: Response) => {
  try {
    const categories = await getPromotions();

    return success(res, categories);
  } catch (err) {
    return errorHandler(res, err);
  }
};
