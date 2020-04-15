// import model
const User = require('../models/user')
const Room = require('../models/room')
const Namespace = require('../models/namespace')
const Message = require('../models/message')
const passport = require('passport')

// import packages
const bcrypt = require('bcryptjs')

const userController = {
  // 登入頁面
  signInPage: (req, res) => {
    return res.render('signin')
  },
  // 註冊頁面
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  // 使用者註冊
  signUp: (req, res) => {
    // confirm password
    if (req.body.passwordCheck !== req.body.password) {
      req.flash("error_messages", "兩次密碼輸入不同！");
      return res.redirect("/signup");
    } else {
      // confirm unique user
      User.findOne({ where: { email: req.body.email } }).exec((err, user) => {
        if (err) return console.log(err)
        if (user) {
          req.flash("error_messages", "信箱重複！");
          return res.redirect("/signup");
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
            req.flash("success_messages", "成功註冊帳號！");
            return res.redirect("/signin");
          })
        }
      });
    }
  }
}

module.exports = userController