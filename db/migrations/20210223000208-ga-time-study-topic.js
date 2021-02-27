'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ga_time_study_topics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startAtObject3D: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endAtObject3D: {
        type: Sequelize.DATE,
        allowNull: true
      },
      startAtText: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endAtText: {
        type: Sequelize.DATE,
        allowNull: true
      },
      topicId:{
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

     await queryInterface.addConstraint('ga_time_study_topics', {
      type: 'foreign key',
      fields: ['topicId'],
      name: 'fk_topicId_ga_time_study_topics',
      references: {
        table: 'ga_topics',
        field: 'id',
      },
    }); 
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ga_time_study_topics');
  }
};