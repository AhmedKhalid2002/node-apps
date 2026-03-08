import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export const Product = sequelize.define('Product', {
  name: {type:DataTypes.STRING,allowNull:false},
  price:{type:DataTypes.NUMBER,allowNull:false},
});


