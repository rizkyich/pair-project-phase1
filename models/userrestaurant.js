 'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class UserRestaurant extends Model { }

  UserRestaurant.init({
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    ratingUser: DataTypes.INTEGER
  }, {sequelize});
  UserRestaurant.associate = function (models) {
    // associations can be defined here
  };
  return UserRestaurant;
};