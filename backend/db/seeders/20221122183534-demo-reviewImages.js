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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-648913477943796142/original/63f9b8e6-ce57-41aa-97f0-fac7a8e8e2ad.jpeg?im_w=720',
     },
     {
      reviewId: 2,
      url: 'https://a0.muscache.com/im/pictures/0bf81cd6-356b-4c9d-b4a1-f49a896df56e.jpg?im_w=720',
   },
   {
      reviewId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46419788/original/5fe96e47-bca9-4f00-a1d4-c067bc49165d.jpeg?im_w=720',
 }
  ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options);
  }
};
