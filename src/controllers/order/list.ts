import { Request, Response } from 'express';
import { OrderModel, OrderItemModel } from '../../types';
import getCurrentOrders from '../../utils/getOrders';
import errorHandler from '../../utils/errorHandler';

export default (Order: OrderModel, OrderItem: OrderItemModel) => async (req: Request, res: Response) => {
  try {
    const orders = await getCurrentOrders(Order, OrderItem);

    return res
      .status(200)
      .json(orders)
      .end();
  } catch (err) {
    return errorHandler(err, res);
  }
};
