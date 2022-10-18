'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [6, 10],
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isIn: [['male', 'female']],
      }
    },
    role: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        max: 2,
        min: 1
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isNumeric: true,
        max: 100000000,
        min: 0,
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};