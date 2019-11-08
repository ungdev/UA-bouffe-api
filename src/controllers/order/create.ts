import { Request, Response } from 'express';
import errorHandler from '../../utils/errorHandler';
import notifyOrdersUpdated from '../../utils/notifyOrdersUpdated';
import Order from '../../models/order';
import OrderItem from '../../models/orderItem';

const create = async (req: Request, res: Response) => {
  try {
    const { method, items, place } = req.body;

    if (items.length === 0) {
      return res
        .status(400)
        .json({ error: 'BASKET_EMPTY' })
        .end();
    }

    await Order.create(
      {
        method,
        place,
        orderItems: items,
      },
      {
        include: [OrderItem],
      },
    );

    notifyOrdersUpdated(req.app.locals.io);

    return res.status(204).end();
  } catch (err) {
    return errorHandler(err, res);
  }
};

export default create;
