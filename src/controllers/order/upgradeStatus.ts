import { Request, Response } from 'express';
import notifyOrdersUpdated from '../../sockets/notifyOrdersUpdated';
import errorHandler from '../../utils/errorHandler';
import Order from '../../models/order';

const upgradeStatus = async (req: Request, res: Response) => {
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

    notifyOrdersUpdated(req.app.locals.io);

    return res.status(204).end();
  } catch (err) {
    return errorHandler(err, res);
  }
};

export default upgradeStatus;
