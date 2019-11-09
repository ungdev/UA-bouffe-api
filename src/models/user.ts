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

  // Le password doit être unique car il n'y a pas de nom d'uilisateur. Il faut que le sel soit statique aussi
  @AllowNull(false)
  @Unique
  @Column
  public password: string;

  @Column
  public permissions?: string;
}
