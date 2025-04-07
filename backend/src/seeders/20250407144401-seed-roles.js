'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      { role_name: 'admin', created_at: new Date(), updated_at: new Date() },
      { role_name: 'customer', created_at: new Date(), updated_at: new Date() },
      { role_name: 'pharmacy', created_at: new Date(), updated_at: new Date() },
      { role_name: 'delivery', created_at: new Date(), updated_at: new Date() },
      { role_name: 'doctor', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
