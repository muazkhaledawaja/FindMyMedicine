'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pharmacies', [
      { name: 'Al-Razi Pharmacy', manager_id: 3, city_id: 1, region_id: 1, phone: '08212121', mobile: '0591234567', address: 'Rimal Street, Gaza', image: 'pharmacy.jpg', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pharmacies', null, {});
  }
};
