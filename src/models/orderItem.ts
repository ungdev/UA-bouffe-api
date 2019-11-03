export default (sequelize: any, DataTypes: any) => sequelize.define('orderItem', {
  key: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
});
