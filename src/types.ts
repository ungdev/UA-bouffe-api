import { Request } from 'express';

/**
 * DISCLAMER: Dans mode développement, la modification de ce fichier ne sera peut-être pas prise en compte par le serveur de dev
 * Redémarrer le serveur dans ce cas là
 */
// General
export enum Status {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  FINISHED = 'finished',
}

export enum PaymentMethod {
  Card = 'card',
  Cash = 'cash',
}

export interface BodyRequest<T> extends Request {
  body: T;
}

export interface Token {
  name: string;
  key: string;
  permissions: string;
}

export enum Error {
  // 400
  BAD_REQUEST = 'BAD_REQUEST',
  BASKET_EMPTY = 'BASKET_EMPTY',

  // 401
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_PIN = 'INVALID_PIN',

  // 403
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_IN_LOCAL_NETWORK = 'NOT_IN_LOCAL_NETWORK',

  // 404
  NOT_FOUND = 'NOT_FOUND',
  ITEM_NOT_FOUND = 'ITEM_NOT_FOUND',

  // 500
  UNKNOWN = 'UNKNOWN',
}
