import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Order from './order';
import Item from './item';
import OrderSupplement from './orderSupplement';

@Table({
  tableName: 'orderitems',
  paranoid: true,
})
export default class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @AllowNull(false)
  @Column
  public orderId: number;

  @ForeignKey(() => Item)
  @AllowNull(false)
  @Column
  public itemId: number;

  @BelongsTo(() => Order)
  public order: Order;

  @BelongsTo(() => Item)
  public item: Item;

  @HasMany(() => OrderSupplement)
  public supplements: OrderSupplement[];
}
