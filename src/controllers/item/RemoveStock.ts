import { Request, Response } from 'express';
import { notFound, noContent } from '../../utils/responses';
import Item from '../../models/item';
import notifyItemsUpdated from '../../sockets/notifyItemsUpdated';
import { Error } from '../../types';
import errorHandler from '../../utils/errorHandler';
import Supplement from '../../models/supplement';

export default async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = id.startsWith('S') ? await Supplement.findByPk(id.substring(1)) : await Item.findByPk(id);

    if (!item) {
      return notFound(res, Error.ITEM_NOT_FOUND);
    }

    item.quantity -= 1;

    await item.save();

    await notifyItemsUpdated(req.app.locals.io);

    return noContent(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};

