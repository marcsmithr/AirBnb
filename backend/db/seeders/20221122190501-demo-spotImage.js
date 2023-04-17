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
},
{
  spotId:12,
  url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52254969/original/94fc072d-a957-4812-aba7-1e6fcb0ecc5c.jpeg?im_w=720',
  preview: true
},
{
  spotId:13,
  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52614454/original/18a29ea2-3bf9-4b93-9cdc-e44fcdd7405b.jpeg?im_w=720',
  preview: true
},
{
  spotId:14,
  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47026348/original/3d42c813-ebcd-4e41-9f13-720533a8c3b7.jpeg?im_w=720',
  preview: true
},
{
  spotId:15,
  url: 'https://a0.muscache.com/im/pictures/5885b6a1-af90-435b-90dd-c14f316878bb.jpg?im_w=720',
  preview: true
},
{
  spotId:16,
  url: 'https://a0.muscache.com/im/pictures/cad15a09-8984-4e60-a273-a72ed1fe7364.jpg?im_w=720',
  preview: true
},
{
  spotId:17,
  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-633966436740723606/original/17130d81-1b83-478a-b906-9d81db6ba2f0.jpeg?im_w=960',
  preview: true
},
{
  spotId:18,
  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-697164134505062342/original/10176ee1-6876-4362-8ac4-44a716a89517.jpeg?im_w=720',
  preview: true
},
{
  spotId:19,
  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45597294/original/b090f742-92d3-4d22-ac4b-2efa1a4ff5dc.jpeg?im_w=720',
  preview: true
},
{
  spotId:20,
  url: 'https://a0.muscache.com/im/pictures/7b19aea3-0728-4c7b-8afa-a964e1f78f34.jpg?im_w=720',
  preview: true
},
{
  spotId:21,
  url: 'https://a0.muscache.com/im/pictures/6ce82813-c221-4a59-914c-f7ad8e042b1c.jpg?im_w=720',
  preview: true
},
{
  spotId:22,
  url: 'https://a0.muscache.com/im/pictures/d7da1a02-993f-4f6d-ae17-e1afee4d23a1.jpg?im_w=960',
  preview: true
},
{
  spotId:23,
  url: 'https://a0.muscache.com/im/pictures/ab120440-ae60-477e-a01c-99d53484c50e.jpg?im_w=720',
  preview: true
},
{
  spotId:24,
  url: 'https://a0.muscache.com/im/pictures/3f8b7519-660a-47a7-ac0d-65164fa8962e.jpg?im_w=720',
  preview: true
},
{
  spotId:25,
  url: 'https://a0.muscache.com/im/pictures/ae0958b1-3c5f-4a49-8079-e406ba4f1c7f.jpg?im_w=720',
  preview: true
},
{
  spotId:26,
  url: 'https://a0.muscache.com/im/pictures/006d15ad-98bb-4a01-95a6-3ad200a1eeff.jpg?im_w=720',
  preview: true
},
{
  spotId:27,
  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48435734/original/21248cef-3fb2-4012-ada8-14b17e92e98a.jpeg?im_w=720',
  preview: true
},
{
  spotId:28,
  url: 'https://a0.muscache.com/im/pictures/f7e37a93-7a9a-4cd5-b497-b2699f5a0efe.jpg?im_w=720',
  preview: true
},
{
  spotId:29,
  url: 'https://a0.muscache.com/im/pictures/3ec91b9c-1d3e-49e5-b820-c7f3d6a9feb5.jpg?im_w=720',
  preview: true
},
{
  spotId:30,
  url: 'https://a0.muscache.com/im/pictures/db2aad88-764d-4c4f-b263-1d909a98eec2.jpg?im_w=720',
  preview: true
},
{
  spotId:31,
  url: 'https://a0.muscache.com/im/pictures/9b5982c1-134f-45df-8c9c-418a72acd8fe.jpg?im_w=720',
  preview: true
},
{
  spotId:32,
  url: 'https://a0.muscache.com/im/pictures/d68684a4-7af5-4eb5-8f2f-bb45aec8c396.jpg?im_w=720',
  preview: true
},
{
  spotId:33,
  url: 'https://a0.muscache.com/im/pictures/miso/Hosting-857193540272156160/original/5cb00fcc-5825-4ccf-a7c0-b8783277d976.jpeg?im_w=720',
  preview: true
}
  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
