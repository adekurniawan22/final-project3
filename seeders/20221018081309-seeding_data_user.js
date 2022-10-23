'use strict';

/** @type {import('sequelize-cli').Migration} */
const { hashPassword } = require('../helper/bcrypt')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      full_name: 'admin123',
      email: 'admin123@mail.com',
      password: hashPassword('admin123'),
      gender: 'male',
      role: 1,
      balance: 15000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
