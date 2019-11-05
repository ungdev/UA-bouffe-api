import { DataTypes, Sequelize } from 'sequelize/types';
import { OrderModel } from '../types';

export default (sequelize: Sequelize) => sequelize.define('order', {
    place: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM('pending', 'preparing', 'ready', 'finished'),
      allowNull: false,
      defaultValue: 'pending',
    },
    method: { type: DataTypes.ENUM('cash', 'card'), allowNull: false },
  }) as OrderModel;
