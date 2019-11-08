import { Table, Column, Model, HasMany, AllowNull, NotNull, ForeignKey } from 'sequelize-typescript';
import Category from './category';

@Table({
  tableName: 'items',
})
export default class Item extends Model<Item> {
  @AllowNull(false)
  @Column
  public name: string;

  @AllowNull(false)
  @Column
  public key: string;

  @Column
  public promoKey?: string;

  @AllowNull(false)
  @Column
  public price: number;

  @AllowNull(false)
  @Column
  public orgaPrice: number;

  @AllowNull(false)
  @Column
  public available: boolean;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column
  public categoryId: number;
}
