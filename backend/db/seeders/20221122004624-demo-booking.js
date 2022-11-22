'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-06-15',
        endDate: '2023-06-18'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2023-07-25',
      endDate: '2023-07-30'
  },
  {
    spotId: 3,
    userId: 1,
    startDate: '2023-11-05',
    endDate: '2023-11-07'
}
  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, options);
  }
};
