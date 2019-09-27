'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const Op = sequelize.Sequelize.Op
  const hashPassword = require('../helpers/hashPassword')

  class User extends Model { }

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [5, 15], msg: 'Username must be between 5 and 15 characters' },

        notEmpty: {
          args: true,
          msg: 'Username could not be empty'
        },

        isUnique: function (value, cb) {
          User.findOne({ where: { username: value }, id: { [Op.ne]: this.dataValues.id } })
            .then(user => {
              if (user) {
                cb('Username has been taken')
              } else {
                cb()
              }
            })
            .catch(err => {
              cb(err)
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email could not be empty'
        }, isEmail: {
          args: true,
          msg: 'Wrong email format.'
        },
        isUnique: function (value, cb) {
          User.findOne({ where: { email: value }, id: { [Op.ne]: this.dataValues.id } })
            .then(user => {
              if (user) {
                cb('This email address has been taken')
              } else {
                cb()
              }
            })
            .catch(err => {
              cb(err)
            })
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone number cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Phone must only contain number'
        },
        isUnique: function (value, cb) {
          User.findOne({ where: { phone: value }, id: { [Op.ne]: this.dataValues.id } })
            .then(user => {
              if (user) {
                cb('This phone number has been used')
              } else {
                cb()
              }
            })
            .catch(err => {
              cb(err)
            })
        }

      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {

      }
    }
  }, {
    sequelize, hooks: {
      beforeCreate: (user) => {
        let input = user.password

        user.password = hashPassword(input)
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Restaurant, { through: models.UserRestaurant })
  };
  return User;
};