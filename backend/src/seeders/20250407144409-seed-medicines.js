'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('medicines', [
      { name: 'Amoxicillin', combination: 'Amoxicillin 500mg', dosage: '500mg 3 times daily', instructions: 'After meals', side_effects: 'Nausea, rash', category_id: 1, price: 12.5, expire_date: '2026-12-31', image: 'amox.jpg', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('medicines', null, {});
  }
};
