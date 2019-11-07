import { Request, Response } from 'express';
import { CategoryModel, ItemModel } from '../../types';
import errorHandler from '../../utils/errorHandler';
import getCategories from '../../utils/categories';

export default (Category: CategoryModel, Item: ItemModel) => async (req: Request, res: Response) => {
  try {
    const categories = await getCategories(Category, Item);

    return res
      .status(200)
      .json(categories)
      .end();
  } catch (err) {
    return errorHandler(err, res);
  }
};
