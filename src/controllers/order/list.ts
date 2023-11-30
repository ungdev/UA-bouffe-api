import { Request, Response } from 'express';
import getCurrentOrders from '../../utils/orders';
import { success } from '../../utils/responses';
import errorHandler from '../../utils/errorHandler';

export default async (req: Request, res: Response) => {
  try {
    const orders = await getCurrentOrders();

    return success(res, orders);
  } catch (err) {
    return errorHandler(res, err);
  }
};
