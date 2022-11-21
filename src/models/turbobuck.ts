import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import Item from './item';

@Table({
  tableName: 'turbobuck',
  paranoid: true,
})
export default class TurboBuck extends Model<TurboBuck> {
  @ForeignKey(() => Item)
  @AllowNull(false)
  @Column
  public turboId: number;

  @BelongsTo(() => Item)
  public item: Item;

  @PrimaryKey
  @AllowNull(false)
  @Column
  public buckId: string;

  @AllowNull(true)
  @Column
  public orgaPriceId: string;
}
