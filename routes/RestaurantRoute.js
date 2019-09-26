const routes = require('express').Router()
const RestaurantController = require('../controllers/RestaurantController')
const UserRestaurantController = require('../controllers/UserRestaurantController')

routes.get('/', RestaurantController.listAll)
routes.get('/topRate', RestaurantController.topRated)
routes.get('/:id/reviews', RestaurantController.review)
routes.get('/:id/reviews/add', UserRestaurantController.main)
routes.post('/:id/reviews/add', UserRestaurantController.addReview)

module.exports = routes