'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cities', [
      { name: 'Gaza', latitude: 31.5, longitude: 34.47, created_at: new Date(), updated_at: new Date() },
      { name: 'Rafah', latitude: 31.28, longitude: 34.25, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
