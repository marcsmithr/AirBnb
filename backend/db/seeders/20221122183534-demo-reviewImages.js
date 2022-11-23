'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: '/assets/review/krustyKrabReview.jpg',
     },
     {
      reviewId: 2,
      url: '/assets/review/penguinReview.png',
   },
   {
      reviewId: 3,
      url: '/assets/review/sakadoReview.png',
 }
  ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options);
  }
};
