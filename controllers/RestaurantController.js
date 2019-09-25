const { Restaurant } = require('../models')

class RestaurantController {
  static listAll(req, res) {
    if (req.query.location) {
      Restaurant
        .getByLoc(req.query.location)
        .then(restaurants => {
          res.send(restaurants)
        })
        .catch(err => {
          res.send(err)
        })
    } else {
      Restaurant
        .findAll()
        .then(restaurants => {
          res.send(restaurants)
        })
        .catch(err => {
          res.send(err)
        })
    }
  }
}

module.exports = RestaurantController