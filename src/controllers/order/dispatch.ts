import { Response } from 'express';
import { badRequest, created } from '../../utils/responses';
import notifyOrdersUpdated from '../../sockets/notifyOrdersUpdated';
import Order from '../../models/order';
import OrderItem from '../../models/orderItem';
import { BodyRequest, Error, Status } from '../../types';
import Item from '../../models/item';
import errorHandler from '../../utils/errorHandler';
import sendSlackMessage from '../../utils/sendSlackMessage';
import Supplement from '../../models/supplement';
import OrderSupplement from '../../models/orderSupplement';
import Transaction from '../../models/transaction';
import type { BuckResponse, OrderData } from '../../middlewares/isBuck';

const dispatch = async (req: BodyRequest<BuckResponse>, res: Response<any, OrderData>) => {
  try {
    const { payment, orgaPrice, items, place } = res.locals;

    if (items.length === 0) {
      return badRequest(res, Error.BASKET_EMPTY);
    }

    const separatedItems = items.reduce(
      (acc, item) => {
        acc[Number(item.category.key === 'pizzas')].push(item);
        return acc;
      },
      [[], []] as [Partial<Item>[], Partial<Item>[]],
    );

    await Promise.all(
      separatedItems.map((items) => {
        if (items.length === 0) return Promise.resolve(null);

        const needPreparation = items.some((entry) => entry.category.needsPreparation);
        const status = needPreparation ? Status.PENDING : Status.READY;

        const orderItems = items.map(
          (entry) =>
            ({
              itemId: entry.id,
              supplements: [],
            } as OrderItem),
        );

        return Order.create(
          {
            place,
            orderItems,
            status,
            orgaPrice,
            transactions: payment,
          } as Order,
          {
            include: [
              { model: Transaction },
              {
                model: OrderItem,
                include: [
                  {
                    model: OrderSupplement,
                    include: [Supplement],
                  },
                ],
              },
            ],
          },
        );
      }),
    );

    sendSlackMessage();

    notifyOrdersUpdated(req.app.locals.io);

    return created(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export default dispatch;
