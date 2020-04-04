// import passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// import models
const User = require('../models/user')

// import packages
const bcrypt = require('bcryptjs')

// 設定 Local passport
passport.use(
  new LocalStrategy(    // customize user field
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      // 從 mongodb 中尋找該 user
      User.findOne({
        email: email
      }, function (err, user) {
        if (err) return console.log(err)
        if (!user) {
          console.log('!user')
          return done(
            null,
            false,
            req.flash("error_messages", "帳號或密碼輸入錯誤！")
          )
        }
        // 比對 使用者輸入的 password 及 db 取出之 user.password 是否一致
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return console.log(err)
          if (isMatch) {
            console.log('isMatch')
            return done(
              null,
              user,
              req.flash("success_messages", "你已成功登入"))
          } else {
            console.log('notMatch')
            return done(
              null,
              false,
              req.flash("error_messages", "帳號或密碼輸入錯誤！")
            )
          }
        })
      })
    })
)

// 將 user.id 存進 session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// 從 session 中取出 user.id
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport