'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { email: 'admin@pharma.com', username: 'admin', password: 'hashed-password', role: 'admin', phone_number: '1111111', gender: 'not_specified', city_id: 1, region_id: 1, is_verified: True, created_at: new Date(), updated_at: new Date() },
      { email: 'customer@pharma.com', username: 'customer', password: 'hashed-password', role: 'customer', phone_number: '2222222', gender: 'male', city_id: 1, region_id: 2, created_at: new Date(), updated_at: new Date() },
      { email: 'pharmacist@pharma.com', username: 'pharma', password: 'hashed-password', role: 'pharmacy', phone_number: '3333333', gender: 'female', city_id: 1, region_id: 1, created_at: new Date(), updated_at: new Date() },
      { email: 'delivery@pharma.com', username: 'deliver', password: 'hashed-password', role: 'delivery', phone_number: '4444444', gender: 'male', city_id: 2, region_id: 3, created_at: new Date(), updated_at: new Date() },
      { email: 'doctor@pharma.com', username: 'dr', password: 'hashed-password', role: 'doctor', phone_number: '5555555', gender: 'male', city_id: 1, region_id: 1, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
