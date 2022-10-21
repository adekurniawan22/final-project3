'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint('TransactionHistories', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'transcation_product_fk',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint('TransactionHistories', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'transcation_product_fk',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};
