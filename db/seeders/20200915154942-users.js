'use strict';

const Crypto = require('../../tools/crypto');
const crypto = require('crypto');

const salts = [
  crypto.randomBytes(32).toString('hex'),
  crypto.randomBytes(32).toString('hex'),
  crypto.randomBytes(32).toString('hex'),
  crypto.randomBytes(32).toString('hex'),
  crypto.randomBytes(32).toString('hex'),
  crypto.randomBytes(32).toString('hex'),
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createdAt = new Date();
    await queryInterface.bulkInsert('ga_users', [
      {
        email: 'danielle.foster@example.com',
        password: Crypto.encrypt('qwe123', salts[0]),
        salt: salts[0],
        createdAt,
        updatedAt: createdAt
      }, {
        email: 'glen.roberts@example.com',
        password: Crypto.encrypt('qwe123', salts[1]),
        salt: salts[1],
        createdAt,
        updatedAt: createdAt
      }, {
        email: 'eugene.carter@example.com',
        password: Crypto.encrypt('qwe123', salts[2]),
        salt: salts[2],
        createdAt,
        updatedAt: createdAt
      }, {
        email: 'mae.cunningham@example.com',
        password: Crypto.encrypt('qwe123', salts[3]),
        salt: salts[3],
        createdAt,
        updatedAt: createdAt
      }, {
        email: 'jesus.evans@example.com',
        password: Crypto.encrypt('qwe123', salts[4]),
        salt: salts[4],
        createdAt,
        updatedAt: createdAt
      }, {
        email: 'tony.fleming@example.com',
        password: Crypto.encrypt('qwe123', salts[5]),
        salt: salts[5],
        createdAt,
        updatedAt: createdAt
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ga_users', null, {});
  }
};
