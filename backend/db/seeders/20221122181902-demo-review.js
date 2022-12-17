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
      review: 'Egestas purus viverra accumsan in nisl nisi scelerisque. Sodales neque sodales ut etiam sit amet. Mus mauris vitae ultricies leo. Risus sed vulputate odio ut enim. Augue interdum velit euismod in pellentesque massa placerat. Condimentum mattis pellentesque id nibh tortor.',
      stars: 5
    },
    {
      spotId: 2,
      userId: 3,
      review: 'Consectetur libero id faucibus nisl tincidunt. Quam vulputate dignissim suspendisse in est ante. Arcu cursus euismod quis viverra. Sodales neque sodales ut etiam sit. Augue interdum velit euismod in pellentesque massa. Rhoncus dolor purus non enim.',
      stars: 2
    },
    {
      spotId: 3,
      userId: 1,
      review: 'Augue ut lectus arcu bibendum. Congue quisque egestas diam in arcu. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Dictum at tempor commodo ullamcorper a lacus vestibulum. Posuere morbi leo urna molestie at elementum eu facilisis sed. ',
      stars: 5
    },
    {
      spotId: 4,
      userId: 1,
      review: 'Elementum facilisis leo vel fringilla est ullamcorper eget. Lobortis scelerisque fermentum dui faucibus in. Fermentum et sollicitudin ac orci phasellus egestas tellus. ',
      stars: 5
    },
    {
      spotId: 5,
      userId: 2,
      review: 'Amet tellus cras adipiscing enim eu turpis. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Id nibh tortor id aliquet lectus proin nibh nisl. Sed cras ornare arcu dui. Maecenas sed enim ut sem viverra aliquet eget sit. Eu consequat ac felis donec. ',
      stars: 2
    },
    {
      spotId: 1,
      userId: 4,
      review: 'Auctor augue mauris augue neque gravida. Felis donec et odio pellentesque diam volutpat commodo. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Proin fermentum leo vel orci porta non. Integer enim neque volutpat ac tincidunt vitae semper. Vel pretium lectus quam id. Quis vel eros donec ac odio tempor orci dapibus ultrices.',
      stars: 4
    },
    {
      spotId: 2,
      userId: 5,
      review: 'Non blandit massa enim nec dui nunc mattis enim ut. Integer vitae justo eget magna fermentum iaculis eu. Quis risus sed vulputate odio ut enim. Odio euismod lacinia at quis risus sed.',
      stars: 4
    },
    {
      spotId: 3,
      userId: 4,
      review: 'Iaculis eu non diam phasellus. In est ante in nibh mauris cursus mattis molestie. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Cursus euismod quis viverra nibh. Sapien faucibus et molestie ac feugiat sed lectus.',
      stars: 4
    },
    {
      spotId: 1,
      userId: 6,
      review: 'Augue lacus viverra vitae congue eu. Aliquam purus sit amet luctus venenatis lectus magna. Elit duis tristique sollicitudin nibh.',
      stars: 4
    },
    {
      spotId: 2,
      userId: 6,
      review: 'Proin sed libero enim sed faucibus turpis in. Nisi porta lorem mollis aliquam ut porttitor leo. ',
      stars: 4
    },
    {
      spotId: 3,
      userId: 5,
      review: 'Nunc consequat interdum varius sit amet mattis. Ut tristique et egestas quis ipsum. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Sit amet dictum sit amet. Morbi tempus iaculis urna id. Congue nisi vitae suscipit tellus mauris a. ',
      stars: 4
    }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options);
  }
};
