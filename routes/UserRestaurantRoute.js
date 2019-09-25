const routes = require('express').Router()
const RestaurantController = require('../controllers/RestaurantController')

routes.get('/', RestaurantController.listAll)
routes.get('/:id/reviews', RestaurantController.review)


module.exports = routes