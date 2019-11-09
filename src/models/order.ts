import { Table, Column, Model, HasMany, AllowNull, DataType, Default } from 'sequelize-typescript';
import { Status, PaymentMethod } from '../types';
import OrderItem from './orderItem';

@Table({
  tableName: 'orders',
})
export default class Order extends Model<Order> {
  @AllowNull(false)
  @Column
  public place: string;

  @AllowNull(false)
  @Default('pending')
  @Column(DataType.ENUM('pending', 'preparing', 'ready', 'finished'))
  public status: Status;

  @AllowNull(false)
  @Column(DataType.ENUM('card', 'cash'))
  public method!: PaymentMethod;

  @AllowNull(false)
  @Column
  public price: number;

  @HasMany(() => OrderItem)
  public orderItems: OrderItem[];
}
