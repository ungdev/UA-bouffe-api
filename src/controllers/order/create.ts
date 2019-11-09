import { Response } from 'express';
import { Op } from 'sequelize';
import { badRequest, created } from '../../utils/responses';
import notifyOrdersUpdated from '../../sockets/notifyOrdersUpdated';
import Order from '../../models/order';
import OrderItem from '../../models/orderItem';
import { BodyRequest, PaymentMethod, Error } from '../../types';
import Item from '../../models/item';
import errorHandler from '../../utils/errorHandler';

interface Body {
  method: PaymentMethod;
  place: string;
  orgaPrice: boolean;
  orders: Array<number>;
}

const create = async (req: BodyRequest<Body>, res: Response) => {
  try {
    const { method, place, orgaPrice, orders } = req.body;

    if (orders.length === 0) {
      return badRequest(res, Error.BASKET_EMPTY);
    }

    // Calculates promotions...
    const items = await Item.findAll({
      where: {
        id: {
          [Op.in]: orders,
        },
      },
    });

    const orderItems = items.map((item) => ({
      itemId: item.id,
      price: orgaPrice ? item.orgaPrice : item.price,
    }));

    await Order.create(
      {
        method,
        place,
        orderItems,
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
