'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

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
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = hashPassword(user.password);
        user.password = hashedPassword;
        user.role = 2;
        user.balance = 0;
      }
    }
  });
  return User;
};