const express = require('express')
const route = express.Router()
const isLogin = require('../middlewares/isLogin')

const UserController = require('../controllers/UserController')



route.get('/login', UserController.loginPage)

route.post('/login', UserController.login)

route.get('/register', UserController.registerPage)

route.post('/register', UserController.register)

route.get('/dashboard', isLogin, UserController.dashboard)

route.get('/logout', isLogin, UserController.logout)

module.exports = route