const { UserRestaurant } = require('../models')

class UserRestaurantController {
  static main(req, res) {
    res.render('restaurants/add')
  }
  
  static addReview(req, res) {
    UserRestaurant
      .create({
        UserId: req.session.user.id,
        RestaurantId : req.params.id,
        review : req.body.review,
        ratingUSer: req.body.ratingUSer
      })
      .then(() => {
        res.redirect(`/restaurants/${req.params.id}/review`)
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = UserRestaurantController