import { Sequelize, DataTypes } from 'sequelize/types';
import { OrderItemModel } from '../types';

export default (sequelize: Sequelize) => sequelize.define('orderItem', {
    key: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
  }) as OrderItemModel;
