import { Model as SequelizeModel, BuildOptions } from 'sequelize/types';

/**
 * DISCLAMER: Dans mode développement, la modification de ce fichier ne sera peut-être pas prise en compte par le serveur de dev
 * Redémarrer le serveur dans ce cas là
 */
// General
export interface Item {
  readonly id: number;
  name: string;
  key: string;
  promoKey: string;
  price: number;
  orgaPrice: number;
  available: boolean;
}

export interface Category {
  readonly id: number;
  name: string;
  key: string;
  needsPreparation: boolean;
}

export interface Order {
  readonly id: number;
  place: string;
  method: PaymentMethod;
  status: Status;
  orderItems: Array<Item>;
}

export interface OrderItem {
  readonly id: number;
  price: number;
}

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
// Sequelize
export interface DefaultStatic extends SequelizeModel {
  readonly id: number;
}

interface OrderStatic extends DefaultStatic, Order {}
export type OrderModel = typeof SequelizeModel & {
  new (values?: object, options?: BuildOptions): OrderStatic;
};

interface OrderItemStatic extends DefaultStatic, Item {}
export type OrderItemModel = typeof SequelizeModel & {
  new (values?: object, options?: BuildOptions): OrderItemStatic;
};

interface ItemStatic extends DefaultStatic, Item {}
export type ItemModel = typeof SequelizeModel & {
  new (values?: object, options?: BuildOptions): ItemStatic;
};

interface CategoryStatic extends DefaultStatic, Category {}
export type CategoryModel = typeof SequelizeModel & {
  new (values?: object, options?: BuildOptions): CategoryStatic;
};

export interface Models {
  Order: OrderModel;
  OrderItem: OrderItemModel;
  Item: ItemModel;
  Category: CategoryModel;
}
