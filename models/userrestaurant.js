'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class UserRestaurant extends Model { }

  UserRestaurant.init({
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    ratingUser: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      afterCreate: (userRestaurant) => {
        let sum
        let rate = 0
        UserRestaurant
          .findAll({ where: { RestaurantId: userRestaurant.RestaurantId } })
          .then(resto => {
            resto.forEach(el => {
              rate += el.ratingUser
            })
            console.log(rate);
            sum = resto.length
            return sequelize.models.Restaurant.update({ rating: Math.round(rate / sum) }, { where: { id: userRestaurant.RestaurantId } })
          })
          .then(() => {
            console.log('masuk');
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  });
  UserRestaurant.associate = function (models) {
    // associations can be defined here
  };
  return UserRestaurant;
};