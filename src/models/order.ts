import { Table, Column, Model, HasMany, AllowNull, NotNull, DataType, BelongsToMany } from 'sequelize-typescript';
import { Status, PaymentMethod } from '../types';
import OrderItem from './orderItem';
import Item from './item';

@Table({
  tableName: 'orders',
})
export default class Order extends Model<Order> {
  @AllowNull(false)
  @Column
  public place: string;

  @AllowNull(false)
  @Column(DataType.ENUM('pending', 'preparing', 'ready', 'finished'))
  public status: Status;

  @AllowNull(false)
  @Column(DataType.ENUM('card', 'cash'))
  public method!: PaymentMethod;

  @HasMany(() => OrderItem)
  public orderItems: OrderItem[];
}
