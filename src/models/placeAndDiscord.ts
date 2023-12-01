import {Table, Column, Model, AllowNull, PrimaryKey} from 'sequelize-typescript';

@Table({
  tableName: 'placediscord',
  paranoid: true,
  timestamps: false,
})
export default class PlaceAndDiscord extends Model<PlaceAndDiscord> {
  @AllowNull(false)
  @PrimaryKey
  @Column
  public place: string;

  @AllowNull(false)
  @Column
  public discordId: string;
}
