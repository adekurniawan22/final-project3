'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint('Products', {
      fields: ['CategoryId'],
      type: 'foreign key',
      name: 'product_category_fk',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint('Products', {
      fields: ['CategoryId'],
      type: 'foreign key',
      name: 'product_category_fk',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};
