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
      },
      {
        ownerId: '1',
        address: '312 Crescent Street',
        city: 'Springfield',
        state: 'Illinois',
        country: 'United States',
        lat: 41.5250,
        lng: 88.0817,
        name: 'The Burrow',
        description: 'Lovely downtown apartment',
        price: 250
      },
      {
        ownerId: '2',
        address: '6319 Drawbridge Court',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        lat: 32.7765,
        lng: 79.9311,
        name: 'The Castle',
        description: 'A imposing fortification in west Charleston',
        price: 300
      },
      {
        ownerId: '3',
        address: '850 Conifer Circle',
        city: 'Charlotte',
        state: 'North Carolina',
        country: 'United States',
        lat: 35.2271,
        lng: 80.8431,
        name: 'The Tar Heel Spot',
        description: 'The home of basketball',
        price: 275
      },
      {
        ownerId: '4',
        address: '568 Drixon Street',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        lat: 45.2271,
        lng: 50.8431,
        name: 'lectus quam id',
        description: 'Tempus imperdiet nulla malesuada pellentesque elit eget. Nunc pulvinar sapien et ligula ullamcorper malesuada. Ornare arcu dui vivamus arcu.',
        price: 175
      },
      {
        ownerId: '2',
        address: '741 Coral Circle',
        city: 'Jacksonville',
        state: 'Florida',
        country: 'United States',
        lat: 15.2271,
        lng: 67.8431,
        name: 'Purus ut faucibus',
        description: 'Sed egestas egestas fringilla phasellus faucibus scelerisque. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus.',
        price: 345
      },
      {
        ownerId: '1',
        address: '852 River Drive',
        city: 'Joilet',
        state: 'Illinois',
        country: 'United States',
        lat: 15.2271,
        lng: 50.8431,
        name: 'Sapien faucibus et molestie ac',
        description: 'At imperdiet dui accumsan sit amet nulla. Non arcu risus quis varius quam. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.',
        price: 225
      },
      {
        ownerId: '2',
        address: '753 Kracken Street',
        city: 'Chapel Hill',
        state: 'North Carolina',
        country: 'United States',
        lat: 35.22371,
        lng: 80.8341,
        name: 'Consequat ac felis donec',
        description: 'Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Amet mauris commodo quis imperdiet massa tincidunt.',
        price: 165
      },
      {
        ownerId: '3',
        address: '159 Willow Drive',
        city: 'Denton',
        state: 'Texas',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Donec adipiscing tristique',
        description: 'Blandit massa enim nec dui nunc. Scelerisque in dictum non consectetur a erat nam at lectus.',
        price: 223
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
