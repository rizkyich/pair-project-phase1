const { User, UserRestaurant, Restaurant } = require('../models')
const comparePassword = require('../helpers/comparePassword')



class UserController {

    static showOne(req, res) {
        User.findByPk(req.session.id, { include: { model: Restaurant } })
            .then(user => {
                res.send(user)

            })
            .catch(err => {
                res.send(err)
            })
    }

    static loginPage(req, res) {
        res.render('users/login')
    }

    static login(req, res) {
        User.findOne({ where: { email: req.body.email }, include: [Restaurant] })
            .then(user => {
                console.log(comparePassword(req.body.password, user.password));
                if (comparePassword(req.body.password, user.password)) {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        phone: user.phone
                    }
                    res.render('users/dashboard', { user })
                } else {
                    res.redirect('/user/login?err=wrong username or password')
                }
            })

            .catch(err => {
                res.send(err)
            })
    }

    static registerPage(req, res) {
        res.render('users/register')
    }

    static register(req, res) {
        User.create(req.body)
            .then(() => {
                res.redirect('/user/login')
            })
            .catch(err => {
                res.send(err)
            })
    }


}

module.exports = UserController