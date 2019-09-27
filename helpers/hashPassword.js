const bcrypt = require('bcryptjs')

module.exports = (input) => {
    let salt = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(input, salt)
}