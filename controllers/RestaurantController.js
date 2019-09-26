const { Restaurant, UserRestaurant, User } = require('../models')
const sequelize = require('sequelize')
class RestaurantController {
  static listAll(req, res) {
    if (req.query.location) {
      Restaurant
        .getByLoc(req.query.location)
        .then(restaurants => {
          console.log(req.query.location)
          res.render('restaurants/main', { restaurants, location: req.query.location })
          // res.send(restaurants)
        })
        .catch(err => {
          res.send(err)
        })
    } else {
      Restaurant
        .findAll({
          include: [{
            model: User
          }]
        })
        .then(restaurants => {
          // res.send(restaurants)
          res.render('restaurants/main', { restaurants, location: undefined })

        })
        .catch(err => {
          res.send(err)
        })
    }
  }

  static topRated(req, res) {
    Restaurant
      .findAll({ order: [['rating', 'DESC']] , 
        include: [{
          model: User
        }]
      })
      .then(restaurants => {
        // res.send(restaurants)
        res.render('restaurants/main', { restaurants, location: undefined })

      })
      .catch(err => {
        res.send(err)
      })
  
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
      // console.log(restaurant)
      res.render('restaurants/review', { restaurant })
    })
    .catch(err => {
      res.send(err)
    })
}
}

module.exports = RestaurantController