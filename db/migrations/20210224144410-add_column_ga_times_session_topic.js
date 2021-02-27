'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
       queryInterface.addColumn(
        'ga_time_study_topics',
        'times',
        {
          type: Sequelize.DATE
        }
      ), 
       queryInterface.addColumn(
        'ga_time_study_topics',
        'status',
        {
          type: Sequelize.ENUM('start', 'end'),
          allowNull: false,
          defaultValue: 'end',
        }
      ), 
      queryInterface.addColumn(
        'ga_time_study_topics',
        'typePage',
        {
          type: Sequelize.ENUM('3D', 'text'),
          allowNull: false,
          defaultValue: '3D',
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn(
        'ga_time_study_topics',
        'typePage',
      )
    ])
  }
};
