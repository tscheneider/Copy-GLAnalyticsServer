'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createdAt = new Date();
    await queryInterface.bulkInsert('ga_profiles', [
      {
        email: 'danielle.foster@example.com',
        name: 'danielle foster',
        profileType: 'student',
        genre: 'female',
        age: '1524',
        institution: 'UFSC',
        underGradProgram: 'Medicina',
        country: 'Brasil',
        city: 'Araranguá',
        createdAt,
        updatedAt: createdAt,
      }, {
        email: 'glen.roberts@example.com',
        name: 'glen robert',
        profileType: 'student',
        genre: 'male',
        age: '1524',
        institution: 'UFSC',
        underGradProgram: 'Medicina',
        country: 'Brasil',
        city: 'Araranguá',
        createdAt,
        updatedAt: createdAt,
      }, {
        email: 'eugene.carter@example.com',
        name: 'eugene carter',
        profileType: 'student',
        genre: 'male',
        age: '2534',
        institution: 'UFSC',
        underGradProgram: 'Medicina',
        country: 'Brasil',
        city: 'Araranguá',
        createdAt,
        updatedAt: createdAt,
      }, {
        email: 'mae.cunningham@example.com',
        name: 'mae cunningham',
        profileType: 'teacher',
        genre: 'female',
        age: '2534',
        institution: 'UFSC',
        underGradProgram: 'Medicina',
        country: 'Brasil',
        city: 'Araranguá',
        createdAt,
        updatedAt: createdAt,
      }, {
        email: 'jesus.evans@example.com',
        name: 'jesus evans',
        profileType: 'teacher',
        genre: 'male',
        age: '4554',
        institution: 'UFSC',
        underGradProgram: 'Medicina',
        country: 'Brasil',
        city: 'Araranguá',
        createdAt,
        updatedAt: createdAt,
      }, {
        email: 'tony.fleming@example.com',
        name: 'tony fleming',
        profileType: 'teacher',
        genre: 'male',
        age: '4554',
        institution: 'UFSC',
        underGradProgram: 'Medicina',
        country: 'Brasil',
        city: 'Araranguá',
        createdAt,
        updatedAt: createdAt,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ga_profiles', null, {});
  }
};
