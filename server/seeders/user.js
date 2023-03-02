'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('users', [{
      name: 'angesmor',
      pass: '$2a$10$bAjKUceoWU9I7xEFeB2RGOAMtV/QAFm2Zt3wqyIXyK0rpJdp83U3a',
      mail: 'angelo_smorlesi@hotmail.com',
      token: '6698-angesmor',
      role: 'student',
      image: "43543534534",
      followers: [0],
      videos: [0,1,3,4],
      imageURL: "true"
    },
    {
      name: 'Bruno',
      pass: '$2a$10$KyHoGyWTveZZyLMvSr3zm.yJMkQ/YNiuI625NckKEsEC0iLQT1GQS',
      mail: 'tertert@hotmail.com',
      token: '2921-Bruno',
      image: "43543534534",
      role: 'teacher',
      followers: [0],
      videos: [0,5,6,7,8],
      imageURL: "true"
    }
  
  
  ]);
  },

  async down (queryInterface, Sequelize) {
  }
};
