import { Request, Response } from 'express';
import getCurrentOrders from '../../utils/orders';
import errorHandler from '../../utils/errorHandler';

export default async (req: Request, res: Response) => {
  try {
    const orders = await getCurrentOrders();

    return res
      .status(200)
      .json(orders)
      .end();
  } catch (err) {
    return errorHandler(err, res);
  }
};
