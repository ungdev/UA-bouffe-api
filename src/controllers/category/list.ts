import { Request, Response } from 'express';
import errorHandler from '../../utils/errorHandler';
import getCategories from '../../utils/categories';

export default async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();

    return res
      .status(200)
      .json(categories)
      .end();
  } catch (err) {
    return errorHandler(err, res);
  }
};
