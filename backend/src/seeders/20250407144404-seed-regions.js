'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('regions', [
      { name: 'Gaza City', postal_code: 'GC100', city_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Al-Rimal', postal_code: 'GC101', city_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Khan Yunis', postal_code: 'KY200', city_id: 2, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('regions', null, {});
  }
};
