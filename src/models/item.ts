import { DataTypes, Sequelize } from 'sequelize';
import { ItemModel } from '../types';

export default (sequelize: Sequelize) =>
  sequelize.define('item', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    key: { type: DataTypes.STRING, allowNull: false, unique: true },
    promoKey: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, allowNull: false },
    orgaPrice: { type: DataTypes.INTEGER, allowNull: false },
    available: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  }) as ItemModel;
