// import model
const User = require('../models/user')
const Room = require('../models/room')
const Namespace = require('../models/namespace')
const Message = require('../models/message')
// import module
const passport = require('passport')

// import packages
const bcrypt = require('bcryptjs')

const userService = {
  // 使用者註冊
  signUp: (req, res, callback) => {
    // confirm password
    if (req.body.passwordCheck !== req.body.password) {
      return callback({
        status: 'error',
        message: '兩次密碼輸入不同！'
      })
    } else {
      // confirm unique user
      User.findOne({ where: { email: req.body.email } }).exec((err, user) => {
        if (err) return console.log(err)
        if (user) {
          return callback({
            status: 'error',
            message: '信箱重複！'
          })
        } else {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10),
              null
            )
          }, function (err, user) {
            if (err) return console.log(err)
            return callback({
              status: 'success',
              message: '成功註冊帳號！'
            })
          })
        }
      });
    }
  }
}

module.exports = userService