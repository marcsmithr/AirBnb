'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: '1',
        address: '123 Lobsterville Lane',
        city: 'Crustatia',
        state: 'Lousiana',
        country: 'United States',
        lat: 30.0273,
        lng: -90.0680,
        name: 'Krusty Krab',
        description: 'The Krab Spot, often full of crabs',
        price: 120
      },
      {
        ownerId: '2',
        address: '47 Main Street',
        city: 'Gotham',
        state: 'New York',
        country: 'United States',
        lat: 41.3163,
        lng: -72.9223,
        name: 'Club Penguin',
        description: 'Lair of the Penguin and his penguin minions',
        price: 1000
      },
      {
        ownerId: '2',
        address: '32-1 Izunoyamacho',
        city: 'Sakado-shi',
        state: 'Saitama',
        country: 'Japan',
        lat: 35.9741,
        lng: 139.3894,
        name: 'Gaigo',
        description: 'Lair of the Gaigo students',
        price: 30
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, options);
  }
};
