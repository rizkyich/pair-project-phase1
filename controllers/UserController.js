const { User, UserRestaurant, Restaurant } = require('../models')
const comparePassword = require('../helpers/comparePassword')
const isLogin = require('../middlewares/isLogin')



class UserController {


    static loginPage(req, res) {
        let err = []
        let success = req.query.success
        if (req.query.err) {
            err = req.query.err.split('_')
        }
        let loginStatus = false
        if (req.session.user) {
            loginStatus = true
            err.push('You already login')
        }
        res.render('users/login', { err, success, loginStatus })
    }

    static login(req, res) {
        User.findOne({ where: { email: req.body.email }, include: [Restaurant] })
            .then(user => {
                if (comparePassword(req.body.password, user.password)) {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        phone: user.phone
                    }
                    res.redirect('/user/dashboard')
                } else {
                    res.redirect('/user/login?err=wrong username or password')
                }
            })

            .catch(err => {
                let url = '/user/login?err='
                console.log(err);
                err.errors.forEach(error => {
                    url += `${error.message}_`
                })
                res.redirect(url)
            })
    }

    static registerPage(req, res) {
        let err = []
        let loginStatus = false
        if (req.session.user) {
            loginStatus = true
        }
        let success = req.query.success
        if (req.query.err) {
            err = req.query.err.split('_')
        }
        res.render('users/register', { err, success, loginStatus })
    }

    static register(req, res) {
        User.create(req.body)
            .then(() => {
                res.redirect('/user/login?success=Register successful. Please log in to continue.')
            })
            .catch(err => {

                let url = '/user/register?err='
                err.errors.forEach(error => {
                    url += `${error.message}_`
                })
                res.redirect(url)
            })
    }

    static dashboard(req, res) {
        User.findByPk(req.session.user.id, { include: [Restaurant] })
            .then(user => {
                // res.send(user)
                res.render('users/dashboard', { user, loginStatus: true })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.redirect('/user/dashboard')
            } else {
                res.redirect('/')
            }
        })
    }
}

module.exports = UserController