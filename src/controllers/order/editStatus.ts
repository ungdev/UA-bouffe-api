import {Request, Response} from 'express';
import notifyOrdersUpdated from '../../sockets/notifyOrdersUpdated';
import {badRequest, noContent, notFound, unauthorized} from '../../utils/responses';
import Order from '../../models/order';
import errorHandler from '../../utils/errorHandler';
import {Error, OrderUpdate, Permission, Status} from '../../types';
import OrderItem from '../../models/orderItem';
import Item from '../../models/item';
import Category from '../../models/category';
import sendOrderToDiscordApi from '../../utils/sendDiscordMessage';

const editStatus = (orderUpdate: OrderUpdate) => async (req: Request, res: Response) => {
  try {
    const statusOrdered = [Status.PENDING, Status.PREPARING, Status.READY, Status.FINISHED];

    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Item,
              include: [Category],
            },
          ],
        },
      ],
    });

    if (!order) {
      return notFound(res, Error.ORDER_NOT_FOUND);
    }

    // You can't upgrade an order already finished
    if (order.status === Status.FINISHED && orderUpdate === OrderUpdate.UPGRADE) {
      return badRequest(res, Error.ORDER_FINISHED);
    }

    // Deletes the orders if the usesr has the right to
    if (order.status === Status.PENDING && orderUpdate === OrderUpdate.DOWNGRADE) {
      if (req.user.permissions === Permission.ADMIN) {
        // Even if the foreign key is in cascade, as it is soft delete, you have to delete manually
        await OrderItem.destroy({ where: { orderId: order.id } });
        await order.destroy();

        await notifyOrdersUpdated(req.app.locals.io);
        return noContent(res);
      }

      return unauthorized(res);
    }

    // A pizza role can't finish orders and only pizzas orders
    const isPizzaOrder = order.orderItems.every((orderItem) => orderItem.item.category.key === 'pizzas');
    if (req.user.permissions === Permission.PIZZA) {
      if ((order.status === Status.READY && orderUpdate === OrderUpdate.UPGRADE) || !isPizzaOrder) {
        return unauthorized(res);
      }
    }

    order.status = statusOrdered[statusOrdered.indexOf(order.status) + orderUpdate];

    await order.save();

    if (order.status === Status.READY
      && orderUpdate === OrderUpdate.UPGRADE
      && order.orderItems.some((item) => item.item.category.needsPreparation)) {
      await sendOrderToDiscordApi(order);
    }

    await notifyOrdersUpdated(req.app.locals.io);

    return noContent(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export default editStatus;
