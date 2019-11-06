import { DataTypes, Sequelize } from 'sequelize';
import { CategoryModel } from '../types';

export default (sequelize: Sequelize) =>
  sequelize.define('category', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    key: { type: DataTypes.STRING, allowNull: false, unique: true },
    needsPreparation: { type: DataTypes.BOOLEAN, allowNull: false },
  }) as CategoryModel;
