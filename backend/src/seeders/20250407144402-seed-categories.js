'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Antibiotics', created_at: new Date(), updated_at: new Date() },
      { name: 'Painkillers', created_at: new Date(), updated_at: new Date() },
      { name: 'Cough & Cold', created_at: new Date(), updated_at: new Date() },
      { name: 'Allergy', created_at: new Date(), updated_at: new Date() },
      { name: 'Supplements', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
