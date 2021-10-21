import { Table, Column, Model, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export default class User extends Model<User> {
  @AllowNull(false)
  @Unique
  @Column
  public name: string;

  @AllowNull(false)
  @Unique
  @Column
  public key: string;

  @Column
  public permissions?: string;
}
