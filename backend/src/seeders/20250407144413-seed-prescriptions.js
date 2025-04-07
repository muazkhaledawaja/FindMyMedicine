'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('prescriptions', [
      { user_id: 2, doctor_id: 5, medicine_id: 1, valid_until: '2025-12-01', instructions: '1 pill every 8 hours', uploaded_file_url: 'prescription.pdf', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('prescriptions', null, {});
  }
};
