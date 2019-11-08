import { Table, Column, Model, HasMany, AllowNull, NotNull, DataType, ForeignKey } from 'sequelize-typescript';
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
}
