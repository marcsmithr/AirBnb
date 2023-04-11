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
        url: 'https://pbs.twimg.com/media/FNT2chYVkAAoZYi.jpg',
        preview: true
     },
     {
      spotId:2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48681314/original/712783d5-b280-47c7-b8cc-cc295e978db7.jpeg?im_w=720',
      preview: true
   },
   {
    spotId:3,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Saitama_Prefectural%2CSakado_High_School1.JPG/1200px-Saitama_Prefectural%2CSakado_High_School1.JPG',
    preview: true
 },
 {
  spotId:4,
  url: 'https://a0.muscache.com/im/pictures/5d371721-104c-4e6f-a6bb-5a43e8a03e9f.jpg?im_w=720',
  preview: true
},
{
  spotId:5,
  url: 'https://a0.muscache.com/im/pictures/623c9337-11bc-4393-afe3-12438500e407.jpg?im_w=720',
  preview: true
},
{
  spotId:6,
  url: 'https://a0.muscache.com/im/pictures/410b7b80-cac2-4fb2-808e-156468c2252c.jpg?im_w=720',
  preview: true
},
{
  spotId:7,
  url: 'https://a0.muscache.com/im/pictures/46f1f74c-377f-478e-821a-7a6b0794823b.jpg?im_w=720',
  preview: true
},
{
  spotId:8,
  url: 'https://a0.muscache.com/im/pictures/ac91d6eb-56a6-4723-9ee0-9a5e3f8efcd2.jpg?im_w=720',
  preview: true
},
{
  spotId:9,
  url: 'https://a0.muscache.com/im/pictures/751548f1-b6c6-41e3-abd8-f4a8ff1ef64a.jpg?im_w=720',
  preview: true
},
{
  spotId:10,
  url: 'https://a0.muscache.com/im/pictures/462efd2a-7d0b-48e4-bcc6-e20065bb987b.jpg?im_w=720',
  preview: true
},
{
  spotId:11,
  url: 'https://a0.muscache.com/im/pictures/d7da1a02-993f-4f6d-ae17-e1afee4d23a1.jpg?im_w=960',
  preview: true
}
  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
