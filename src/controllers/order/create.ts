import { Request, Response } from 'express';
import { OrderModel, OrderItemModel } from '../../types';
import errorHandler from '../../utils/errorHandler';
import notifyOrdersUpdated from '../../utils/notifyOrdersUpdated';

const create = (Order: OrderModel, OrderItem: OrderItemModel) => async (req: Request, res: Response) => {
  try {
    const { method, items } = req.body;

    if (items.length === 0) {
      return res
        .status(400)
        .json({ error: 'BASKET_EMPTY' })
        .end();
    }

    await Order.create(
      {
        method,
        orderItems: items,
      },
      {
        include: [OrderItem],
      },
    );

    notifyOrdersUpdated(Order, OrderItem, req.app.locals.io);

    return res
      .status(204)
      .end();
  }

  catch (err) {
    errorHandler(err, res);
  }
};

export default create;