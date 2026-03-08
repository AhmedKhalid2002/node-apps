import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import { Product } from './product.model.js';

// user model
export const User = sequelize.define('user', {
  name: DataTypes.STRING,
  age: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: { type: DataTypes.STRING, unique: true },
});
User.hasMany(Product);
Product.belongsTo(User);
