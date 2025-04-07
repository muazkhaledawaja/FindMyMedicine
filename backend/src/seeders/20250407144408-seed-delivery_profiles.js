'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('delivery_profiles', [
      { user_id: 4, vehicle_type: 'Bike', delivery_area: 'Gaza City, Al-Rimal', is_available: True, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('delivery_profiles', null, {});
  }
};
