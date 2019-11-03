import { OrderModel, OrderItemModel } from "../../types";
import { Request, Response } from "express";
import notifyOrdersUpdated from "../../utils/notifyOrdersUpdated";
import errorHandler from "../../utils/errorHandler";

const upgradeStatus = (Order: OrderModel, OrderItem: OrderItemModel) => async (req: Request, res: Response) => {
  // todo: mettre de la validation
  const { status } = req.body;

  try {
    await Order.update({
      status,
    }, {
      where: {
        id: req.params.id,
      },
    });

    notifyOrdersUpdated(Order, OrderItem, req.app.locals.io);

    return res
      .status(204)
      .end();
  }

  catch (err) {
    errorHandler(err, res);
  }
}

export default upgradeStatus;