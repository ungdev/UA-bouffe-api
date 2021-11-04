import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Supplement from './supplement';
import OrderItem from './orderItem';

@Table({
  tableName: 'ordersupplements',
  paranoid: true,
})
export default class OrderSupplement extends Model<OrderSupplement> {
  @ForeignKey(() => OrderItem)
  @AllowNull(false)
  @Column
  public orderItemId: number;

  @ForeignKey(() => Supplement)
  @AllowNull(false)
  @Column
  public supplementId: number;

  @BelongsTo(() => OrderItem)
  public orderItem: OrderItem;

  @BelongsTo(() => Supplement)
  public supplement: Supplement;
}
