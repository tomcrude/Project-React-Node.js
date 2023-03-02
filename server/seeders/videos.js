'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('videos', [{
      title: 'Cat scares people',
      des: 'in this video a cat is going to scare a couple of people.',
      video: '543534',
      user: '1',
      likes: [0,36,37],
    },
    {
        title: 'Funny dog',
        des: 'In this video you will see a very charismatic dog. ',
        video: '54y45',
        user: '1',
        likes: [0,37],
      },
      {
        title: 'Pirates meme',
        des: 'Pirates of the Caribbean Meme.',
        video: '65756y',
        user: '1',
        likes: [0],
      },
      {
        title: 'Standing here MEME.',
        des: 'This is a meme that has recently gone viral.',
        video: 'rty56y56',
        user: '2',
        likes: [0,37],
      },
      {
        title: 'White Chicks MEME',
        des: 'This is a famous meme.',
        video: 'arty56',
        user: '2',
        likes: [0,37],
      },
      {
        title: 'Game cube MEME.',
        des: 'Just a meme.',
        video: '56y6rry',
        user: '2',
        likes: [0],
      },
      {
        title: 'Funny Penguin.',
        des: 'A disturbed penguin meme.',
        video: 'rtyrty567y',
        user: '2',
        likes: [0,37],
      }
  ]);
  },

  async down (queryInterface, Sequelize) {
  }
};