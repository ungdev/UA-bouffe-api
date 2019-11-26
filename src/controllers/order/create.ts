import { Response } from 'express';
import { Op } from 'sequelize';
import { badRequest, created } from '../../utils/responses';
import notifyOrdersUpdated from '../../sockets/notifyOrdersUpdated';
import Order from '../../models/order';
import OrderItem from '../../models/orderItem';
import { BodyRequest, PaymentMethod, Error, Status } from '../../types';
import Item from '../../models/item';
import errorHandler from '../../utils/errorHandler';
import Category from '../../models/category';
import sendSlackMessage from '../../utils/sendSlackMessage';

interface Body {
  method: PaymentMethod;
  place: string;
  orgaPrice: boolean;
  orders: Array<number>;
  total: number;
}

const create = async (req: BodyRequest<Body>, res: Response) => {
  try {
    // Orders = [orders ids]
    const { method, place, orgaPrice, orders, total } = req.body;

    if (orders.length === 0) {
      return badRequest(res, Error.BASKET_EMPTY);
    }

    const itemCatalog = await Item.findAll({
      include: [Category],
      where: {
        id: {
          [Op.in]: orders,
        },
      },
    });

    const needPreparation = itemCatalog.some((item) => item.category.needsPreparation);
    const status = needPreparation ? Status.PENDING : Status.READY;

    const items = orders.map((order) => itemCatalog.find((item) => item.id === order));

    const orderItems = items.map((item) => ({
      itemId: item.id,
    }));

    await Order.create(
      {
        method,
        place,
        orderItems,
        status,
        orgaPrice,
        total,
      },
      {
        include: [OrderItem],
      },
    );

    sendSlackMessage();

    notifyOrdersUpdated(req.app.locals.io);

    return created(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export default create;
