'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

    // Optional: Add composite primary key or unique constraint
    await queryInterface.addConstraint('user_roles', {
      fields: ['user_id', 'role_id'],
      type: 'primary key',
      name: 'user_roles_pkey'
    });

    // Optional: Add foreign key constraints (if not done via Sequelize model associations)
    // await queryInterface.addConstraint('user_roles', {
    //   fields: ['user_id'],
    //   type: 'foreign key',
    //   name: 'fk_userroles_userid',
    //   references: {
    //     table: 'users',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });

    // await queryInterface.addConstraint('user_roles', {
    //   fields: ['role_id'],
    //   type: 'foreign key',
    //   name: 'fk_userroles_roleid',
    //   references: {
    //     table: 'roles',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_roles');
  }
};
