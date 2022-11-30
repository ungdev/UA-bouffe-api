import { Response, NextFunction, Request } from 'express';
import { unauthorized } from '../utils/responses';
import errorHandler from '../utils/errorHandler';
import { PaymentMethod } from '../types';
import { toTurbo } from '../utils/turbobuck';
import Item from '../models/item';
import { notifyRequestReceived } from '../sockets/notifyNetworkStatus';

export interface BuckEntry {
  id: string;
  vat: number;
  kind: 'purchase';
  name: string;
  amount: number;
  priceId: string;
  articleId: string;
  vatAmount: number;
  isCancellation: boolean;
}

export interface BuckPayment {
  id: string;
  amount: number;
  source: 'purchase';
  provider: 'pax' | 'external';
  meanOfPaymentId: string;
  neptingTransactionId?: string;
}

export interface BuckPayload {
  date: string;
  entries: BuckEntry[];
  deviceId: string;
  payments: BuckPayment[];
  sellerUserId: string;
  pointOfSaleId: string;
  sellerWalletId: string;
  orderIdentifier: string;
}

export interface BuckResponse {
  event: 'basketCreated';
  id: string;
  payload: BuckPayload;
}

export type OrderData = {
  items: Partial<Item>[];
  orgaPrice: boolean;
  payment: {
    method: PaymentMethod;
    amount: number;
  }[];
  place: string;
};

export default async (
  req: Request<unknown, unknown, BuckResponse>,
  res: Response<unknown, OrderData>,
  next: NextFunction,
) => {
  try {
    const { event, id, payload } = req.body;

    if (
      event === 'basketCreated' &&
      id &&
      payload &&
      process.env.DEVICE_ID.split(',').includes(payload.deviceId) &&
      payload.pointOfSaleId === process.env.SALE_POINT_ID
    ) {
      notifyRequestReceived(req.app.locals.io);
      res.locals.payment = payload.payments.map((payment) => ({
        method: payment.provider === 'pax' ? PaymentMethod.Card : PaymentMethod.Cash,
        amount: -payment.amount,
      }));
      res.locals.items = await Promise.all(
        payload.entries.map((entry) => toTurbo(entry.articleId).then((turboEntry) => turboEntry.item)),
      );
      res.locals.place = payload.orderIdentifier;
      const orgaPrices = (
        await Promise.all(
          payload.entries.map(async (entry) => {
            const { orgaPriceId } = await toTurbo(entry.articleId);
            if (orgaPriceId !== null) return orgaPriceId === entry.priceId;
            return null;
          }),
        )
      ).filter((orgaPrice) => orgaPrice !== null);
      if (orgaPrices.length < 1) orgaPrices[0] = false;
      // Check that all items have orgaPrice (or none)
      if (orgaPrices.some((price) => price !== orgaPrices[0])) return unauthorized(res);
      [res.locals.orgaPrice] = orgaPrices;
      return next();
    }
    return unauthorized(res);
  } catch (err) {
    return errorHandler(res, err);
  }
};
