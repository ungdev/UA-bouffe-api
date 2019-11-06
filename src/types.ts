import { Model as SequelizeModel, BuildOptions } from 'sequelize/types';

// General
export interface Item {
  key: string;
  name: string;
  price: number;
  category: string;
}

export interface Category {
  name: string;
}

export enum Status {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  FINISHED = 'finished',
}

export interface Order {
  readonly id: number;
  place: string;
  method: PaymentMethod;
  status: Status;
  orderItems: Array<Item>;
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
}
