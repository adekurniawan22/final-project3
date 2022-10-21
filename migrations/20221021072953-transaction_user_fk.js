'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint('TransactionHistories', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'transcation_user_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint('TransactionHistories', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'transcation_user_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};
