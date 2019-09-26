const express = require('express')
const route = express.Router()
const isLogin = require('../middlewares/isLogin')

const UserController = require('../controllers/UserController')
const UserRestaurantController = require('../controllers/UserRestaurantController')


route.get('/login', UserController.loginPage)

route.post('/login', UserController.login)

route.get('/register', UserController.registerPage)

route.post('/register', UserController.register)

route.get('/dashboard', isLogin, UserController.dashboard)

route.get('/logout', isLogin, UserController.logout)

route.get('/dashboard/delete/:userRestaurantId', UserRestaurantController.destroy)

// route.post('/delete', UserRestaurantController.destroy)

module.exports = route