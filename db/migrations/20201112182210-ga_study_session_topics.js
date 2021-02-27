'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ga_study_session_topics', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      studySessionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      topicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      startAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endAt: {
        type: Sequelize.DATE,
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

    await queryInterface.addConstraint('ga_study_session_topics', {
      type: 'foreign key',
      fields: ['studySessionId'],
      name: 'fk_studySessionId_ga_study_sessions',
      references: {
        table: 'ga_study_sessions',
        field: 'id',
      },
    });

    /**Adiciona restrição na tabela */
    await queryInterface.addConstraint('ga_study_session_topics', {
      type: 'foreign key',//chave secundaria
      fields: ['topicId'],//topicId será uma chave secundaria
      name: 'fk_topicId_ga_topics',
      references: {
        table: 'ga_topics',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ga_study_session_topics');
  }
};
