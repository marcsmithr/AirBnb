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
      },
      {
        ownerId: '1',
        address: '3456 Grimes Street',
        city: 'Charlotte',
        state: 'North Carolina',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Habitant morbi',
        description: 'commodo sed egestas egestas fringilla phasellus',
        price: 145
      },
      {
        ownerId: '2',
        address: '5234 Lightray Road',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Eget Magna',
        description: 'el fringilla est ullamcorper eget nulla',
        price: 80
      },
      {
        ownerId: '3',
        address: '58 Evergreen Lane',
        city: 'Nashville',
        state: 'Tennessee',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Praesent',
        description: 'Tristique risus nec feugiat in fermentum posuere urna nec tincidunt',
        price:128
      },
      {
        ownerId: '4',
        address: '374 Longstroll Lane',
        city: 'Athens',
        state: 'Georgia',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Convallis',
        description: 'Tincidunt arcu non sodales neque sodales ut',
        price:88
      },
      {
        ownerId: '5',
        address: '251 Scuttle Street',
        city: 'Austin',
        state: 'Texas',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Vulputate Enim',
        description: 'Interdum consectetur libero id faucibus nisl tincidunt eget nullam. ',
        price: 155
      },
      {
        ownerId: '1',
        address: '523 Baron Drive',
        city: 'Craven',
        state: 'New York',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Sem integer vitae',
        description: 'Aliquam sem et tortor consequat id. In hac habitasse platea dictumst',
        price:286
      },
      {
        ownerId: '2',
        address: '266 Pallet Street',
        city: 'Raleigh',
        state: 'North Carolina',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Euismod Elementum',
        description: 'Ornare aenean euismod elementum nisi. Sed id semper risus in .',
        price: 137
      },
      {
        ownerId: '3',
        address: '263 Nexus Drive',
        city: 'Greensville',
        state: 'Alabama',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Aliquet Sagittis',
        description: 'Bibendum ut tristique et egestas quis ipsum suspendisse ultrices ',
        price: 316
      },
      {
        ownerId: '4',
        address: '3734 CornerStone Blvd',
        city: 'Wilmington',
        state: 'North Carolina',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Consequat',
        description: 'At tempor commodo ullamcorper a lacus',
        price:365
      },
      {
        ownerId: '5',
        address: '586 Stomp Lane',
        city: 'Savannah',
        state: 'Georgia',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Viverra Ipsum',
        description: 'Sem integer vitae justo eget magna fermentum iaculis',
        price:267
      },
      {
        ownerId: '2',
        address: '217 River Street',
        city: 'Fayetteville',
        state: 'North Carolina',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Nulla',
        description: 'Vulputate enim nulla aliquet porttitor',
        price:25
      },
      {
        ownerId: '3',
        address: '326 Strawberry Street',
        city: 'Corinth',
        state: 'Wyoming ',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Justo laoreet',
        description: 'Quam quisque id diam vel quam elementum pulvinar etiam',
        price:249
      },
      {
        ownerId: '4',
        address: '284 Aqua Blvd',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Maecenas',
        description: 'Sed odio morbi quis commodo odio. Felis donec et odio',
        price: 174
      },
      {
        ownerId: '5',
        address: '902 Heap Road',
        city: 'Sacramento',
        state: 'California',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Tristique',
        description: 'celerisque purus semper eget duis',
        price: 354
      },
      {
        ownerId: '1',
        address: '274 Palm Street',
        city: 'Oakland',
        state: 'California',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Lacus',
        description: 'donec et odio pellentesque diam volutpat',
        price: 405
      },
      {
        ownerId: '2',
        address: '26 Pepsi Street',
        city: 'San Jose',
        state: 'California',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Elementum',
        description: 'Euismod elementum nisi quis eleifend quam. Sit amet facilisis',
        price:836
      },
      {
        ownerId: '3',
        address: '754 Tree Road',
        city: 'Tacoma',
        state: 'Washington',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Fringilla',
        description: 'Vel turpis nunc eget lorem dolor sed viverra ipsum',
        price:568
      },
      {
        ownerId: '4',
        address: '386 Binary Blvd',
        city: 'Spokane',
        state: 'Washington',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'commodo odio',
        description: 'habitant morbi tristique senectus et',
        price: 568
      },
      {
        ownerId: '5',
        address: '485 Node Road',
        city: 'Bellingham',
        state: 'Washington',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'ccumsan',
        description: 'Vel risus commodo viverra maecenas accumsan lacus vel facilisis.',
        price:475
      },
      {
        ownerId: '1',
        address: '385 Bog Street',
        city: 'Eugene',
        state: 'Oregon',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'tempor orci',
        description: 'Sit amet facilisis magna etiam tempor orci.',
        price:88
      },
      {
        ownerId: '2',
        address: '846 Dreams Blvd',
        city: 'Bend',
        state: 'Oregon',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Bibendum',
        description: 'Felis bibendum ut tristique et. Nulla malesuada pellentesque elit eget gravida',
        price:473
      },
      {
        ownerId: '3',
        address: "47 G'raha Tia Street",
        city: 'Olympia',
        state: 'Washington',
        country: 'United States',
        lat: 38.2271,
        lng: 80.2331,
        name: 'Gavida',
        description: 'Euismod elementum nisi quis eleifend quam',
        price:346
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
