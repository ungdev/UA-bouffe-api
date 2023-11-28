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
import Supplement from '../../models/supplement';
import OrderSupplement from '../../models/orderSupplement';
import Transaction from '../../models/transaction';

interface Body {
  method: PaymentMethod;
  place: string;
  orgaPrice: boolean;
  orders: Array<{
    item: number;
    supplements: number[];
  }>;
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
      include: [Category, Supplement],
      attributes: ['id'],
      where: {
        id: {
          [Op.in]: orders.map((order) => order.item),
        },
      },
    });

    const separatedItems = orders
      .map(({ item: itemId, supplements }) => {
        const item = itemCatalog.find((catalogItem) => catalogItem.id === itemId);
        return {
          item,
          supplements:
            supplements?.map?.((supplementId) =>
              item.supplements.find((supplement) => supplement.id === supplementId),
            ) ?? ([] as Supplement[]),
        };
      })
      .reduce(
        (acc, item) => {
          if (item.item.category.key !== 'pizzas') {
            acc[0].push(item);
          } else {
            acc[1].push(item);
          }

          return acc;
        },
        [[], []] as [
          {
            item: Partial<Item>;
            supplements: Supplement[];
          }[],
          {
            item: Partial<Item>;
            supplements: Supplement[];
          }[],
        ],
      );

    await Promise.all(
      separatedItems.map((items) => {
        if (items.length === 0) return Promise.resolve(null);

        const needPreparation = items.some((entry) => entry.item.category.needsPreparation);
        const status = needPreparation ? Status.PENDING : Status.READY;

        const orderItems = items.map(
          (entry) =>
            ({
              itemId: entry.item.id,
              supplements: entry.supplements.map((supplement) => ({ supplementId: supplement.id })),
            } as OrderItem),
        );

        return Order.create(
          {
            place,
            orderItems,
            status,
            orgaPrice,
            transactions: [
              {
                amount: total,
                method,
              },
            ],
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

    await sendSlackMessage();

    await notifyOrdersUpdated(req.app.locals.io);

    return created(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export default create;
