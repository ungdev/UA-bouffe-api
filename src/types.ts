/* eslint-disable no-shadow */
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
  Ticket = 'ticket',
}

export enum Permission {
  ADMIN = 'admin',
  SELLER = 'seller',
  PIZZA = 'pizza',
  PREPARATOR = 'preparator'
}

export interface Token {
  name: string;
  key: string;
  permissions: Permission;
}

// This interface is also used in Items
export interface Price {
  price: number;
  orgaPrice: number;
}

export interface Promotion extends Price {
  name: string;
  key: string;
  formula: Array<string>; // array of promo key
  price: number;
  orgaPrice: number;
}

export enum OrderUpdate {
  UPGRADE = 1,
  DOWNGRADE = -1,
}

export enum Error {
  // 400
  BAD_REQUEST = 'BAD_REQUEST',
  BASKET_EMPTY = 'BASKET_EMPTY',
  ORDER_PENDING = 'ORDER_PENDING',
  ORDER_FINISHED = 'ORDER_FINISHED',

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
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',

  // 500
  UNKNOWN = 'UNKNOWN',
}

// Express method merging
declare module 'express' {
  interface Request {
    user?: Token;
  }
}

export interface BodyRequest<T> extends Request {
  body: T;
}
