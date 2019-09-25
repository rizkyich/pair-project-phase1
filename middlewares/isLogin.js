function isLogin(req, res, next) {
    if (req.session.id) {
        next()
    } else {
        res.redirect('/?err=you have to login first')
    }
}

module.exports = isLogin