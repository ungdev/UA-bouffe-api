import { Request, Response } from 'express';
import { OrderModel, OrderItemModel } from '../../types';
import getOrders from '../../utils/getOrders';
import errorHandler from '../../utils/errorHandler';

export default (Order: OrderModel, OrderItem: OrderItemModel) => async (req: Request, res: Response) => {
  try {
    const orders = await getOrders(Order, OrderItem);

    return res
      .status(200)
      .json(orders)
      .end();
  }

  catch (err) {
    return errorHandler(err, res);
  }
};