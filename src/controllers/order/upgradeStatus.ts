import { Request, Response } from 'express';
import { OrderModel, OrderItemModel, ItemModel, CategoryModel } from '../../types';
import notifyOrdersUpdated from '../../utils/notifyOrdersUpdated';
import errorHandler from '../../utils/errorHandler';

const upgradeStatus = (
  Order: OrderModel,
  OrderItem: OrderItemModel,
  Item: ItemModel,
  Category: CategoryModel,
) => async (req: Request, res: Response) => {
  // todo: mettre de la validation
  const { status } = req.body;

  try {
    await Order.update(
      {
        status,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    notifyOrdersUpdated(Order, OrderItem, Item, Category, req.app.locals.io);

    return res.status(204).end();
  } catch (err) {
    return errorHandler(err, res);
  }
};

export default upgradeStatus;
