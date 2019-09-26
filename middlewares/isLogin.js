function isLogin(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/user/login?err=you have to login first')
    }
}

module.exports = isLogin