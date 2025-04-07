'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('order_items', [
      { order_id: 1, medicine_id: 1, quantity: 2, price_at_order_time: 12.5, discount: 0, total_price: 25.0, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_items', null, {});
  }
};
