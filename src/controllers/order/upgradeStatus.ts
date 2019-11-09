import { Request, Response } from 'express';
import notifyOrdersUpdated from '../../sockets/notifyOrdersUpdated';
import { noContent } from '../../utils/responses';
import Order from '../../models/order';
import errorHandler from '../../utils/errorHandler';

const upgradeStatus = async (req: Request, res: Response) => {
  try {
    // todo: mettre de la validation
    const { status } = req.body;

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

    notifyOrdersUpdated(req.app.locals.io);

    return noContent(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export default upgradeStatus;
