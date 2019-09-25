const express = require('express')
const session = require('express-session')
const route = express.Router()

const UserController = require('../controllers/UserController')

route.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

route.get('/', UserController.showOne)

route.get('/login', UserController.loginPage)

route.post('/login', UserController.login)

route.get('/register', UserController.registerPage)

route.post('/register', UserController.register)

module.exports = route