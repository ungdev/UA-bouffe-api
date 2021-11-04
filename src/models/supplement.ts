import { Table, Column, Model, AllowNull, Unique, BelongsToMany } from 'sequelize-typescript';
import type { Price } from '../types';
import Item from './item';

@Table({
  tableName: 'supplements',
})
export default class Supplement extends Model<Supplement> implements Price {
  @AllowNull(false)
  @Unique
  @Column
  public name: string;

  @AllowNull(false)
  @Unique
  @Column
  public key: string;

  @AllowNull(false)
  @Column
  public price: number;

  @AllowNull(false)
  @Column
  public orgaPrice: number;

  @AllowNull(false)
  @Column
  public available: boolean;

  @BelongsToMany(() => Item, {
    through: 'itemsupplements',
    foreignKey: 'supplementKey',
    sourceKey: 'key',
    otherKey: 'itemKey',
    targetKey: 'key',
  })
  public applicableOn: Item[];
}
