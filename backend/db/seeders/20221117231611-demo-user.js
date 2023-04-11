'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Bob',
        lastName: 'Bobson',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'demo@user.io'
      },
      {
        firstName: 'Phil',
        lastName: 'Philson',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'user1@user.io'
      },
      {
        firstName:'Carl',
        lastName: 'Carlson',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'user2@user.io'
      },
      {
        firstName:'Rick',
        lastName: 'Rickson',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        email: 'user3@user.io'
      },
      {
        firstName:'Sarah',
        lastName: 'Sarahson',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5'),
        email: 'user4@user.io'
      },
      {
        firstName:'Jill',
        lastName: 'Jillson',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password6'),
        email: 'user5@user.io'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
