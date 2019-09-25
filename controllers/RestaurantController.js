const { Restaurant, UserRestaurant, User } = require('../models')

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
      Restaurant
        .findAll()
        .then(restaurants => {
          console.log('masuk')
          // res.send(restaurants)
          res.render('restaurants/main', { restaurants })

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