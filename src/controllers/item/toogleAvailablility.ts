import { Request, Response } from 'express';
import { notFound, noContent } from '../../utils/responses';
import Item from '../../models/item';
import { Error } from '../../types';
import errorHandler from '../../utils/errorHandler';

export default async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return notFound(res, Error.ITEM_NOT_FOUND);
    }

    item.available = !item.available;

    await item.save();

    return noContent(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};
