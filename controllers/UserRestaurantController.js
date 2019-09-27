const { UserRestaurant } = require('../models')

class UserRestaurantController {
  static main(req, res) {
    let loginStatus = false
    if (req.session.user) {
      loginStatus = true
    }
    const { id } = req.params

    res.render('restaurants/add', { id, loginStatus })
  }

  static edit(req, res) {
    let loginStatus = false
    if (req.session.user) {
      loginStatus = true
    }
    const { id } = req.params

    res.render('restaurants/add', { id, loginStatus })
  }

  static addReview(req, res) {

    UserRestaurant
      .create({
        UserId: req.session.user.id,
        RestaurantId: req.params.id,
        review: req.body.review,
        ratingUser: req.body.ratingUser
      })
      .then(() => {
        res.redirect(`/restaurants/${req.params.id}/reviews`)
      })
      .catch(err => {
        res.send(err)
      })
  }

  
  static destroy(req, res) {
    const { userRestaurantId } = req.params
    UserRestaurant
      .destroy({ where: { id: userRestaurantId }, individualHooks: true })
      .then(() => {
        res.redirect('/user/dashboard')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = UserRestaurantController