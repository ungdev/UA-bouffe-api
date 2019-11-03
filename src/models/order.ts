export default (sequelize: any, DataTypes: any) => sequelize.define('order', {
  status: {
    type: DataTypes.ENUM('pending', 'preparing', 'ready', 'finished'),
    allowNull: false,
    defaultValue: 'pending',
  },
  removed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  method: { type: DataTypes.ENUM('cash', 'card'), allowNull: false },
});
