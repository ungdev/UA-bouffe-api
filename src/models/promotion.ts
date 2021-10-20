import { Table, Column, Model, AllowNull, Unique, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'promotions',
})
export default class Promotion extends Model<Promotion> {
  @AllowNull(false)
  @Unique
  @Column
  public name: string;

  @AllowNull(false)
  @PrimaryKey
  @Column
  public key: string;

  @AllowNull(false)
  @Column
  public price: number;

  @AllowNull(false)
  @Column
  public orgaPrice: number;

  @Column
  public formula: string;
}
