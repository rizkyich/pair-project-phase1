const { Restaurant } = require('../models')

class RestaurantController {
  static listAll(req, res) {
    if (req.query.location) {
      Restaurant
        .getByLoc(req.query.location)
        .then(restaurants => {
          res.render('restaurants/main', {restaurants})
          // res.send(restaurants)
        })
        .catch(err => {
          res.send(err)
        })
    } else {
      Restaurant
        .findAll()
        .then(restaurants => {
          // res.send(restaurants)
          res.render('restaurants/main', {restaurants})
          
        })
        .catch(err => {
          res.send(err)
        })
    }
  }

  static review(req, res) {
    
  }
}

module.exports = RestaurantController