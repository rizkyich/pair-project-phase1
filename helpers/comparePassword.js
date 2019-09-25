const bcrypt = require('bcryptjs')

module.exports = (input, hash) => {
    return bcrypt.compareSync(input, hash)
}