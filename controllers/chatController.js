// import model
const User = require('../models/user')
const Room = require('../models/room')
const Namespace = require('../models/namespace')
const Message = require('../models/message')

const chatController = {
  // 首頁
  indexPage: (req, res) => {
    return res.render('chatroom')
  },

module.exports = chatController