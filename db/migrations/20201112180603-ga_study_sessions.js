'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ga_study_sessions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      startAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      classRoomId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('ga_study_sessions', {
      type: 'foreign key',
      fields: ['profileId'],
      name: 'fk_profileId_ga_profiles',
      references: {
        table: 'ga_profiles',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('ga_study_sessions', {
      type: 'foreign key',
      fields: ['classRoomId'],
      name: 'fk_classRoomId_ga_class_rooms',
      references: {
        table: 'ga_class_rooms',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ga_study_sessions');
  }
};
