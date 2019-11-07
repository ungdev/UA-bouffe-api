import { Sequelize, DataTypes } from 'sequelize';
import { OrderItemModel } from '../types';

export default (sequelize: Sequelize) =>
  sequelize.define('orderItem', {
    price: { type: DataTypes.INTEGER, allowNull: false },
  }) as OrderItemModel;
