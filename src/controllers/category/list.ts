import { Request, Response } from 'express';
import { success } from '../../utils/responses';
import getCategories from '../../utils/categories';
import errorHandler from '../../utils/errorHandler';

export default async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();

    return success(res, categories);
  } catch (err) {
    return errorHandler(res, err);
  }
};
