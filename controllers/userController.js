// import model
const User = require('../models/user')
const Room = require('../models/room')
const Namespace = require('../models/namespace')
const Message = require('../models/message')
const passport = require('passport')

const userController = {
  // 登入頁面
  signInPage: (req, res) => {
    return res.render('signin')
  },
  // 使用者登入
  signIn: (req, res) => {
    return res.redirect('/')
  },

module.exports = userController