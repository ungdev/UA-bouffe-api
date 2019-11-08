import { Response } from 'express';
import { Op } from 'sequelize';
import errorHandler from '../../utils/errorHandler';
import notifyOrdersUpdated from '../../utils/notifyOrdersUpdated';
import Order from '../../models/order';
import OrderItem from '../../models/orderItem';
import { BodyRequest, PaymentMethod } from '../../types';
import Item from '../../models/item';

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
      return res
        .status(400)
        .json({ error: 'BASKET_EMPTY' })
        .end();
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

    return res.status(204).end();
  } catch (err) {
    return errorHandler(err, res);
  }
};

export default create;
