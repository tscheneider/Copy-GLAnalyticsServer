'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ga_topics', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
/*       timeStudyTopicId:{
        type: Sequelize.INTEGER,
        allowNull: false,
      }, */
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      babylonFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      babylonConfig: {
        type: Sequelize.JSON,
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

    await queryInterface.addConstraint('ga_topics', {
      type: 'foreign key',
      fields: ['parentId'],
      name: 'fk_parentId_ga_topics',
      references: {
        table: 'ga_topics',
        field: 'id',
      },
    });

/*     await queryInterface.addConstraint('ga_topics', {
      type: 'foreign key',
      fields: ['timeStudyTopicId'],
      name: 'fk_timeStudyTopicId_ga_topics',
      references: {
        table: 'ga_topics',
        field: 'id',
      },
    }); */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ga_topics');
  }
};
