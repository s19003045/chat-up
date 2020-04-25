// import model
const User = require('../models/user')
const Room = require('../models/room')
const Namespace = require('../models/namespace')
const Message = require('../models/message')
// import module
const passport = require('passport')

// import packages
const bcrypt = require('bcryptjs')
// JWT
const jwt = require('jsonwebtoken')
// import other libs
const uuid = require('uuid')
const uuidv4 = uuid.v4

const userService = {
  // 使用者登入
  singIn: (req, res, callback) => {
    // 檢查 email 及 password
    if (!req.body.email || !req.body.password) {
      return callback({
        status: 'error',
        message: "required fields didn't exist"
      })
    }

    // 檢查 user 是否存在與密碼正確性
    let username = req.body.email
    let password = req.body.password

    User.findOne({ email: username })
      .exec((err, user) => {
        if (err) return callback({
          status: 'error',
          message: "no such user found"
        })
        if (!user) {
          return callback({
            status: 'error',
            message: "no such user found"
          })
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return callback({
            status: 'error',
            message: "passwords did not match"
          })
        }

        //簽發 token
        var payload = {
          id: user.id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        } //Signing a token with 1 day of expiration

        var token = jwt.sign(payload, process.env.JWT_SECRET)

        return callback({
          status: 'success',
          message: 'log in successifully',
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          }
        })
      })
  },
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
            ),
            uuid: uuidv4()
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
  },
  // 取得使用者資料
  getCurrentUser: (req, res, callback) => {
    User.findOne({ uuid: req.user.uuid }, (err, user) => {
      if (err) return console.log(err)

      return callback({
        status: 'success',
        currentUser: user
      })
    }
    )
  }
}

module.exports = userService