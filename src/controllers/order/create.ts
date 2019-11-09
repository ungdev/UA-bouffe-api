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

interface Body {
  method: PaymentMethod;
  place: string;
  orgaPrice: boolean;
  orders: Array<number>;
}

const create = async (req: BodyRequest<Body>, res: Response) => {
  try {
    // Orders: [orders ids]
    const { method, place, orgaPrice, orders } = req.body;

    if (orders.length === 0) {
      return badRequest(res, Error.BASKET_EMPTY);
    }

    // Calculates promotions...
    const items = await Item.findAll({
      include: [Category],
      where: {
        id: {
          [Op.in]: orders,
        },
      },
    });

    const needPreparation = items.some((item) => item.category.needsPreparation);
    const status = needPreparation ? Status.PENDING : Status.READY;

    const orderItems = items.map((item) => ({
      itemId: item.id,
      price: orgaPrice ? item.orgaPrice : item.price,
    }));

    await Order.create(
      {
        method,
        place,
        orderItems,
        status,
      },
      {
        include: [OrderItem],
      },
    );

    notifyOrdersUpdated(req.app.locals.io);

    return created(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export default create;
