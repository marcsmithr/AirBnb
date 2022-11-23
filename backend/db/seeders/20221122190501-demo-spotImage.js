'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        url: '/assets/spot/krustyKrabSpot.jpg',
        preview: true
     },
     {
      spotId:2,
      url: '/assets/spot/penguinSpot.png',
      preview: false
   },
   {
    spotId:3,
    url: '/assets/spot/sakadoSpot.png',
    preview: true
 },
  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, options);
  }
};
