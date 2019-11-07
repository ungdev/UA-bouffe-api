import { Request, Response } from 'express';
import { OrderModel, OrderItemModel, ItemModel, CategoryModel } from '../../types';
import getCurrentOrders from '../../utils/orders';
import errorHandler from '../../utils/errorHandler';

export default (Order: OrderModel, OrderItem: OrderItemModel, Item: ItemModel, Category: CategoryModel) => async (
  req: Request,
  res: Response,
) => {
  try {
    const orders = await getCurrentOrders(Order, OrderItem, Item, Category);

    return res
      .status(200)
      .json(orders)
      .end();
  } catch (err) {
    return errorHandler(err, res);
  }
};
