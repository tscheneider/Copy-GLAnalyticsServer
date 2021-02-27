'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'ga_time_study_topics',
      'deletedAt',
      Sequelize.DATE
    );

  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'ga_time_study_topics',
      'deletedAt',
    );
  }
};
