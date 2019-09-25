'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Restaurant extends Model {
    static getByLoc(location) {
      return Restaurant.findAll({where: {city: locations}})   
    }

  }

  Restaurant.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    photos_url: DataTypes.STRING
  }, { sequelize });
  Restaurant.associate = function (models) {
    // associations can be defined here
  };
  return Restaurant;
};