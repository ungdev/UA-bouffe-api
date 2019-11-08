import { Table, Column, Model, HasMany, AllowNull, NotNull, DataType } from 'sequelize-typescript';
import Item from './item';

@Table({
  tableName: 'categories',
})
export default class Category extends Model<Category> {
  @AllowNull(false)
  @Column
  public name: string;

  @AllowNull(false)
  @Column
  public key: string;

  @AllowNull(false)
  @Column
  public needsPreparation: boolean;

  @HasMany(() => Item)
  public items: Item[];
}
