import { Request, Response } from 'express';
import { OrderModel, OrderItemModel, ItemModel, CategoryModel } from '../../types';
import errorHandler from '../../utils/errorHandler';
import notifyOrdersUpdated from '../../utils/notifyOrdersUpdated';

const create = (Order: OrderModel, OrderItem: OrderItemModel, Item: ItemModel, Category: CategoryModel) => async (
  req: Request,
  res: Response,
) => {
  try {
    const { method, items, place } = req.body;

    if (items.length === 0) {
      return res
        .status(400)
        .json({ error: 'BASKET_EMPTY' })
        .end();
    }

    // items = items.map(item => )

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

    notifyOrdersUpdated(Order, OrderItem, Item, Category, req.app.locals.io);

    return res.status(204).end();
  } catch (err) {
    return errorHandler(err, res);
  }
};

export default create;
