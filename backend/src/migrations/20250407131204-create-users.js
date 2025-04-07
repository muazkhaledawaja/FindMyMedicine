'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      profile_picture_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM('user', 'admin', 'pharmacy', 'delivery', 'customer', 'superadmin', 'doctor'),
        allowNull: false,
        defaultValue: 'customer',
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'not_specified'),
        allowNull: false,
        defaultValue: 'not_specified',
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      modified_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'banned'),
        allowNull: false,
        defaultValue: 'active',
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      region_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
// This migration creates a 'users' table with various fields including email, password, username, phone number, profile picture URL, role, gender, address, rating, is_active, is_verified, created_by, modified_by, status, city_id, region_id, deleted_at, created_at, and updated_at.