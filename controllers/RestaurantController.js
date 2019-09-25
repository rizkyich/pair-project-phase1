const { Restaurant, UserRestaurant, User } = require('../models')
const sequelize = require('sequelize')
class RestaurantController {
  static listAll(req, res) {
    if (req.query.location) {
      Restaurant
        .getByLoc(req.query.location)
        .then(restaurants => {
          res.render('restaurants/main', { restaurants })
          // res.send(restaurants)
        })
        .catch(err => {
          res.send(err)
        })
    } else {
    let total = []
      Restaurant
        .findAll({
          include: [{
            model: User
          }]
        })
        .then(restaurants => {
          // res.send(restaurants)
          res.render('restaurants/main', { restaurants, total })

        })
        .catch(err => {
          res.send(err)
        })
    }
  }

  static review(req, res) {
    const { id } = req.params
    Restaurant
      .findByPk(id, {
        include: {
          model: User
        }
      })
      .then(restaurant => {
        // res.send(restaurant)
        res.render('restaurants/review', { restaurant })
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = RestaurantController