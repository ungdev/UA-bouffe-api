import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PaymentMethod } from '../types';
import Order from './order';

@Table({
  tableName: 'transactions',
  paranoid: true,
})
export default class Transaction extends Model<Transaction> {
  @AllowNull(false)
  @Column(DataType.ENUM('card', 'cash', 'ticket'))
  public method!: PaymentMethod;

  @AllowNull(false)
  @Column
  public amount!: number;

  @AllowNull(true)
  @Column
  public transactionId?: string;

  @ForeignKey(() => Order)
  @AllowNull(false)
  @Column
  public orderId!: number;

  @BelongsTo(() => Order)
  public order!: Order;
}
