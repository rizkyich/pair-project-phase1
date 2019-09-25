const routes = require('express').Router()
const RestaurantController = require('../controllers/RestaurantController')

routes.get('/', RestaurantController.listAll)


module.exports = routes