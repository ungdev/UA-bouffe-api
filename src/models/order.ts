import { Table, Column, Model, HasMany, AllowNull, DataType, Default } from 'sequelize-typescript';
import { Status } from '../types';
import OrderItem from './orderItem';
import Transaction from './transaction';

@Table({
  tableName: 'orders',
  paranoid: true,
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
  @Column
  public orgaPrice: boolean;

  @HasMany(() => Transaction)
  public transactions: Transaction[];

  @HasMany(() => OrderItem)
  public orderItems: OrderItem[];
}
