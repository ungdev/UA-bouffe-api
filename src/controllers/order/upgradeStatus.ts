import { Request, Response } from 'express';
import notifyOrdersUpdated from '../../sockets/notifyOrdersUpdated';
import { noContent, notFound, badRequest, unauthorized } from '../../utils/responses';
import Order from '../../models/order';
import errorHandler from '../../utils/errorHandler';
import { Status, Permission, Error } from '../../types';

const upgradeStatus = async (req: Request, res: Response) => {
  try {
    // todo: mettre de la validation
    const statusOrdered = [Status.PENDING, Status.PREPARING, Status.READY, Status.FINISHED];

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return notFound(res, Error.ORDER_NOT_FOUND);
    }

    if (order.status === Status.FINISHED) {
      return badRequest(res, Error.ORDER_FINISHED);
    }

    // A pizza role can't finish orders
    if (req.permissions === Permission.PIZZA && order.status === Status.READY) {
      return unauthorized(res);
    }

    const newStatus = statusOrdered[statusOrdered.indexOf(order.status) + 1];
    order.status = newStatus;

    await order.save();

    notifyOrdersUpdated(req.app.locals.io);

    return noContent(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export default upgradeStatus;
