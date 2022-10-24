'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.User, { as: 'User_TransactionHistory' });
      // this.belongsTo(models.Product, { as: 'Product_TransactionHistory' });
    }
  }
  TransactionHistory.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isNumeric: true,
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isNumeric: true,
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};