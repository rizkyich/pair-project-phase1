'use strict';
const filePath = 'data/data.json'
const fs = require('fs')


module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = []
    
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    rawData.forEach(el => {
      data.push({
        name: el.name,
        address: el.details.address,
        city: el.details.city,
        latitude: Number(el.details.latitude),
        longitude: Number(el.details.longitude),
        rating: 0,
        photos_url: el.photo_url,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    return queryInterface.bulkInsert('Restaurants', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
