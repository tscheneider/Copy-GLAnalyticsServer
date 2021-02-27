'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn(
        'ga_time_study_topics',
        'startAtObject3D',
      ),
      queryInterface.removeColumn(
        'ga_time_study_topics',
        'endAtObject3D',
      ),
      queryInterface.removeColumn(
        'ga_time_study_topics',
        'startAtText',
      ),
      queryInterface.removeColumn(
        'ga_time_study_topics',
        'endAtText',
      ),
    ]);

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('ga_time_study_topics')
    ]);
  }
};
