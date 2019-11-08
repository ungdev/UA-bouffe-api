import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Order from './order';
import Item from './item';

@Table({
  tableName: 'orderitems',
})
export default class OrderItem extends Model<OrderItem> {
  @AllowNull(false)
  @Column
  public price: number;

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
}
