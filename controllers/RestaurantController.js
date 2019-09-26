const { Restaurant, UserRestaurant, User } = require('../models')
const sequelize = require('sequelize')
class RestaurantController {

  static listAll(req, res) {
    let loginStatus = false
    if (req.session.user) {
      loginStatus = true
    }
    if (req.query.location) {
      Restaurant
        .getByLoc(req.query.location)
        .then(restaurants => {
          console.log(restaurants)
          res.render('restaurants/main', { restaurants, location: req.query.location, loginStatus })
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
          // console.log(restaurants)
          // res.send(restaurants)
          res.render('restaurants/main', { restaurants, loginStatus, location: req.query.location })

        })
        .catch(err => {
          res.send(err)
        })
    }
  }

  static topRated(req, res) {
    let loginStatus = false
    if (req.session.user) {
      loginStatus = true
    }
    Restaurant
      .findAll({
        order: [['rating', 'DESC']],
        include: [{
          model: User
        }]
      })
      .then(restaurants => {
        // res.send(restaurants)
        res.render('restaurants/main', { restaurants, location: undefined, loginStatus })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static review(req, res) {
    let loginStatus = false
    if (req.session.user) {
      loginStatus = true
    }
    console.log(loginStatus)
    const { id } = req.params
    Restaurant
      .findByPk(id, { include: [{ model: User }] })
      .then(restaurant => {
        // res.send(restaurant)
        res.render('restaurants/review', { restaurant, loginStatus})
      })
      .catch(err => {
        res.send(err)
      })

  }

}

module.exports = RestaurantController