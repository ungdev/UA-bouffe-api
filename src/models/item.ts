import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo, Unique, BelongsToMany } from 'sequelize-typescript';
import Category from './category';
import { Price } from '../types';
import Supplement from './supplement';

@Table({
  tableName: 'items',
})
export default class Item extends Model<Item> implements Price {
  @AllowNull(false)
  @Unique
  @Column
  public name: string;

  @AllowNull(false)
  @Unique
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

  @BelongsTo(() => Category)
  public category: Category;

  @BelongsToMany(() => Supplement, {
    through: 'itemsupplements',
    foreignKey: 'itemKey',
    sourceKey: 'key',
    otherKey: 'supplementKey',
    targetKey: 'key',
  })
  public supplements: Supplement[];
}
