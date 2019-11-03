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
  items: Array<Item>;
}

export enum Status {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  FINISHED = 'finished',
}

export interface Order {
  readonly id: number;
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
interface OrderStatic extends DefaultStatic, Order { }
interface OrderItemStatic extends DefaultStatic, Item { }

export type OrderModel = typeof SequelizeModel & {
  new(values?: object, options?: BuildOptions): OrderStatic;
}

export type OrderItemModel = typeof SequelizeModel & {
  new(values?: object, options?: BuildOptions): OrderItemStatic;
}

export interface Models {
  Order: OrderModel;
  OrderItem: OrderItemModel;
}