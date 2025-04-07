'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_reviews', [
      { reviewer_id: 2, reviewed_user_id: 3, rating: 5, comment: 'Quick service!', created_at: '2025-04-07 14:44:24.876817', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_reviews', null, {});
  }
};
