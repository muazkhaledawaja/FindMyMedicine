'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pharmacy_profiles', [
      { user_id: 3, license_number: 'PH123456', verified_by: 1, opening_hours: '9 AM - 9 PM', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pharmacy_profiles', null, {});
  }
};
