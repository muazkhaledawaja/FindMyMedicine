'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pharmacy_medicines', [
      { pharmacy_id: 1, medicine_id: 1, stock_quantity: 100, reorder_threshold: 20, batch_number: 'B1234', last_restocked: '2025-04-07 14:44:24.876800', manufacturing_date: '2024-01-01', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pharmacy_medicines', null, {});
  }
};
