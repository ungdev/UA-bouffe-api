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
