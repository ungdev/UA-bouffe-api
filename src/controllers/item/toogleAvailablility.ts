import { Request, Response } from 'express';
import errorHandler from '../../utils/errorHandler';
import Item from '../../models/item';
import notifyItemsUpdated from '../../sockets/notifyItemsUpdated';

export default async (req: Request, res: Response) => {
  try {
    console.log('azqswx');
    const { id } = req.params;
    console.log('ezafvgsvd');
    const item = await Item.findByPk(id);

    console.log('aqw');
    if (!item) {
      return res
        .status(404)
        .json({ error: 'ITEM_NOT_FOUND' })
        .end();
    }

    console.log('gné');

    item.available = !item.available;

    console.log('aaa');
    await item.save();
    console.log('bb');

    notifyItemsUpdated(req.app.locals.io);
    console.log('cc');

    return res.status(204).end();
  } catch (err) {
    return errorHandler(err, res);
  }
};
