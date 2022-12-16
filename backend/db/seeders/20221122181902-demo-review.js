'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
      spotId: 1,
      userId: 2,
      review: 'Crabtastic',
      stars: 5
    },
    {
      spotId: 2,
      userId: 3,
      review: 'Penguin stole my wallet',
      stars: 2
    },
    {
      spotId: 3,
      userId: 1,
      review: 'Dance performance were immaculate',
      stars: 5
    },
    {
      spotId: 4,
      userId: 1,
      review: 'A wonderful experience',
      stars: 5
    },
    {
      spotId: 5,
      userId: 2,
      review: 'The place was pretty dirty',
      stars: 2
    },
    {
      spotId: 6,
      userId: 2,
      review: 'Lovely spot',
      stars: 4
    }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options);
  }
};
