'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ga_profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      profileType: {
        type: Sequelize.ENUM('student', 'teacher'),
        allowNull: false,
        defaultValue: 'student',
      },
      genre: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false,
        defaultValue: 'male',
      },
      age: {
        type: Sequelize.ENUM('0014', '1524', '2534', '3544', '4554', '5500'),
        allowNull: false,
        defaultValue: '0014',
      },
      institution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      underGradProgram: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ga_profiles');
  }
};
